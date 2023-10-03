(() => {
  // ../src/engine.ts
  var Engine = class {
    constructor(context) {
      this.context = context;
    }
    prev = 0;
    game;
    runGame(game) {
      this.game = game;
      window.requestAnimationFrame(this.tick.bind(this));
    }
    tick(timestamp) {
      const delta = timestamp - this.prev;
      this.prev = timestamp;
      if (delta > 0) {
        this.game.update(delta);
      }
      this.context.reset();
      this.game.draw(this.context);
      window.requestAnimationFrame(this.tick.bind(this));
    }
  };

  // ../src/bounds.ts
  var TOP = 0;
  var CENTER = 1;
  var BOTTOM = 2;
  var LEFT = 3;
  var RIGHT = 4;
  var BaseBounds = class {
    #x = 0;
    #y = 0;
    #z = 0;
    #offsetX = 0;
    #offsetY = 0;
    #anchorX = 0;
    #anchorY = 0;
    #width = 0;
    #height = 0;
    #rotation = 0;
    #scale = 1;
    constructor(width, height) {
      this.#width = width;
      this.#height = height;
    }
    vec2() {
      return [this.#x, this.#y];
    }
    setVec2(x, y) {
      this.#x = x;
      this.#y = y;
    }
    vec3() {
      return [this.#x, this.#y, this.#z];
    }
    setVec3(x, y, z) {
      this.#x = x;
      this.#y = y;
      this.#z = z;
    }
    rawPos() {
      return [this.#x - this.#offsetX, this.#y - this.#offsetY];
    }
    setAnchor(x, y) {
      this.#anchorX = x;
      this.#anchorY = y;
      switch (x) {
        case LEFT:
          this.#offsetX = 0;
          break;
        case CENTER:
          this.#offsetX = this.#width / 2;
          break;
        case RIGHT:
          this.#offsetX = this.#width;
          break;
      }
      switch (y) {
        case TOP:
          this.#offsetY = 0;
          break;
        case CENTER:
          this.#offsetY = this.#height / 2;
          break;
        case BOTTOM:
          this.#offsetY = this.#height;
          break;
      }
    }
    vecOf(h, v) {
      let x = 0;
      let y = 0;
      switch (h) {
        case LEFT:
          x = this.#x - this.#offsetX * this.#scale;
          break;
        case CENTER:
          x = this.#x - this.#offsetX * this.#scale + this.width() / 2;
          break;
        case RIGHT:
          x = this.#x - this.#offsetX * this.#scale + this.width();
          break;
      }
      switch (v) {
        case TOP:
          y = this.#y - this.#offsetY * this.#scale;
          break;
        case CENTER:
          y = this.#y - this.#offsetY * this.#scale + this.height() / 2;
          break;
        case BOTTOM:
          y = this.#y - this.#offsetY * this.#scale + this.height();
          break;
      }
      return [x, y];
    }
    anchor() {
      return [this.#anchorX, this.#anchorY];
    }
    offset() {
      return [this.#offsetX * this.#scale, this.#offsetY * this.#scale];
    }
    size() {
      return [this.width(), this.height()];
    }
    // TODO: make sure this makes sense with a scaled object
    setSize(w, h) {
      this.#width = w;
      this.#height = h;
    }
    width() {
      return this.#width * this.#scale;
    }
    height() {
      return this.#height * this.#scale;
    }
    rotation() {
      return this.#rotation;
    }
    setRotation(theta) {
      this.#rotation = theta;
    }
    scale() {
      return this.#scale;
    }
    setScale(scale) {
      this.#scale = scale;
    }
    // TODO: What happens if you try to scale an already scaled image
    scaleTo(width, height) {
      const widthFactor = width / this.#width;
      const heightFactor = height / this.#height;
      this.#scale = Math.min(widthFactor, heightFactor);
    }
    normalVectorOf(edge) {
      switch (edge) {
        case LEFT:
          return [-1, 0];
        case TOP:
          return [0, -1];
        case RIGHT:
          return [1, 0];
        case BOTTOM:
          return [0, 1];
        default:
          throw new Error("Invalid edge");
      }
    }
    isWithin(x, y) {
      const [x1, y1] = this.rawPos();
      if (this.width() == 1 && this.height() == 1) {
        return x == x1 && y == y1;
      }
      const x2 = x1 + this.width();
      const y2 = y1 + this.height();
      return x > x1 && x < x2 && y > y1 && y < y2;
    }
    doesCollide(other) {
      const [w1, h1] = this.size();
      const [x1, y1] = this.rawPos();
      const [w2, h2] = other.size();
      const [x2, y2] = other.rawPos();
      return !(x2 + w2 < x1 || x2 > x1 + w1 || y2 + h2 < y1 || y2 > y1 + h1);
    }
    collisionEdges(other) {
      const [w1, h1] = this.size();
      const [x1, y1] = this.rawPos();
      const [w2, h2] = other.size();
      const [x2, y2] = other.rawPos();
      if (x1 + w1 >= x2 && x1 < x2) {
        return [LEFT, RIGHT];
      }
      if (x1 <= x2 + w2 && x1 + w1 > x2 + w2) {
        return [RIGHT, LEFT];
      }
      if (y1 + h1 >= y2 && y1 < y2) {
        return [TOP, BOTTOM];
      }
      if (y1 <= y2 + h2 && y1 + h1 > y2 + h2) {
        return [BOTTOM, TOP];
      }
      return [0, 0];
    }
  };
  var RawBounds = class extends BaseBounds {
    constructor(width = 0, height = 0) {
      super(width, height);
    }
  };

  // ../src/renderer.ts
  var Renderer = class {
    background = [];
    effects = [];
    screen = [];
    addToBackground(sprite) {
      if (this.background.includes(sprite))
        return;
      this.screen.push(sprite);
    }
    removeFromBackground(sprite) {
      const i = this.background.indexOf(sprite);
      if (i > -1)
        this.background.splice(i, 1);
    }
    addEffect(effect) {
      if (this.effects.includes(effect))
        return;
      this.effects.push(effect);
    }
    removeEffect(effect) {
      const i = this.effects.indexOf(effect);
      if (i > -1)
        this.effects.splice(i, 1);
    }
    addToScreen(sprite) {
      if (this.screen.includes(sprite))
        return;
      this.screen.push(sprite);
    }
    removeFromScreen(sprite) {
      const i = this.screen.indexOf(sprite);
      if (i > -1)
        this.screen.splice(i, 1);
    }
    draw(ctx2) {
      for (let effect of this.effects) {
        for (let particle of effect.particles) {
          const image = particle.Image();
          if (!!image) {
            ctx2.drawImage(image, ...particle.rawPos(), particle.width(), particle.height());
          }
        }
      }
      this.screen.sort((a, b) => {
        const [ax, ay, az] = a.vec3();
        const [bx, by, bz] = b.vec3();
        return az - bz;
      });
      for (const item of this.screen) {
        const image = item.image();
        if (!!image) {
          if (item.rotation() != 0) {
            ctx2.translate(...item.vecOf(CENTER, CENTER));
            ctx2.rotate(item.rotation());
            ctx2.drawImage(image, -item.width() / 2, -item.height() / 2);
            ctx2.resetTransform();
          } else {
            ctx2.drawImage(image, ...item.rawPos(), item.width(), item.height());
          }
          ctx2.fillStyle = "blue";
          ctx2.fillRect(...item.vecOf(CENTER, CENTER), 1, 1);
        }
      }
    }
  };

  // ../src/util.ts
  function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return [canvas, canvas.getContext("2d")];
  }

  // ts/sprite.ts
  var TestSprite = class extends RawBounds {
    #image;
    constructor() {
      super(500, 500);
      const [canvas, context] = createCanvas(500, 500);
      context.fillStyle = "red";
      context.fillRect(0, 0, 500, 500);
      this.#image = canvas;
    }
    image() {
      return this.#image;
    }
  };

  // ts/scene.ts
  var TestScene = class {
    sprite = new TestSprite();
    sprite2 = new TestSprite();
    renderer = new Renderer();
    constructor() {
      this.sprite.setVec2(300, 300);
      this.renderer.addToScreen(this.sprite);
      this.sprite2.setVec2(1e3, 300);
      this.sprite2.setRotation(Math.PI / 4);
      this.renderer.addToScreen(this.sprite2);
    }
    update(delta) {
      this.sprite2.setRotation(this.sprite2.rotation() + Math.PI / 8 * (delta / 1e3));
    }
    draw(screen) {
      this.renderer.draw(screen);
    }
  };

  // ts/index.ts
  var $body = document.querySelector("body");
  var $canvas = document.createElement("canvas");
  var ctx = $canvas.getContext("2d");
  $canvas.width = 1920;
  $canvas.height = 1080;
  $body.append($canvas);
  new Engine(ctx).runGame(new TestScene());
})();
