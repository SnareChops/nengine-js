
// Animation represents timings for a full animation
export class Animation extends Array<AnimationFrame>{

	/** addFrame adds a new frame to an animation */
	addFrame(start: number, duration: number, index: number): Animation {
		this.push({ start, duration, frame: index });
		return this;
	}
}

// AnimationFrame represents timings for a single animation frame
export interface AnimationFrame {
	start: number;
	duration: number;
	frame: number;
}


// Animator top level struct for managing animations
// Tip: Use in combination with Bounds to create an animated sprite
export class Animator {
	#frames: CanvasImageSource[] = [];
	#animations: Map<string, Animation> = new Map();
	#active: Animation | undefined;
	#frame: number;
	#elapsed: number;
	#loop: boolean;

	constructor(frames: CanvasImageSource[]) {
		this.#frames = frames;
	}

	/** addAnimation Adds a new named animation to the Animator */
	addAnimation(name: string, animation: Animation): this {
		this.#animations.set(name, animation);
		return this;
	}
	/** 
	 * clearAnimation Clears the currently active animation
	 * and returns the image to the default image
	 */
	clearAnimation() {
		this.#active = void 0;
		this.#loop = false;
		this.#elapsed = 0;
	}
	/** startAnimation Starts an animation by it's name */
	startAnimation(name: string, loop: boolean) {
		this.#active = this.#animations.get(name);
		this.#loop = loop
		this.#elapsed = 0
	}

	/** Image Returns the current active image for the animation */
	Image(): CanvasImageSource {
		return this.#frames[this.#frame];
	}

	/** update Call this on every frame to "run" the animation */
	update(delta: number) {
		if (!this.#active) return;
		const last = this.#active[this.#active.length - 1];
		const total = last.start + last.duration;
		this.#elapsed += delta;
		if (this.#elapsed >= total && !this.#loop) {
			this.clearAnimation()
		}
		this.#elapsed %= total;
		for (const frame of this.#active) {
			if (this.#elapsed > frame.start) {
				this.#frame = frame.frame;
			}
		}
	}
}