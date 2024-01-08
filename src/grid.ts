import { Reloadable } from '.';
import { LEFT, RawBounds, TOP } from './bounds';
import { Color } from './color';
import { Context, Image } from './image';
import { Line, drawLine } from './line';
import { SimpleSprite } from './sprite';
import { Sprite } from './types/sprite';
import { createCanvas } from './util';

/** Represents a grid of sprites */
export class SpriteGrid extends RawBounds {
    #cw: number = 0;
    #ch: number = 0;
    #contents: (Sprite | undefined)[];
    #lines: Line[] = [];
    #lineColor: Color | undefined;
    #lineWidth: number = 0;
    #image: Image;
    #context: Context;
    #selected: number = -1;
    #selectedWidth: number = 0;
    #selectedColor: Color | undefined;

    /** 
     * IMPORTANT: The final size of the grid will always be a multiple of the cell sizes
     * Provided gridWidth and gridHeight will be used as a maximum and the actual width 
     * will be calculated and set as the bounds size. Use `.size()` after constructing
     * to get the actual size of the grid.
     */
    constructor(gridWidth: number, gridHeight: number, cellWidth: number, cellHeight: number) {
        super(
            Math.floor(gridWidth / cellWidth) * cellWidth,
            Math.floor(gridHeight / cellHeight) * cellHeight,
        );
        this.#cw = cellWidth;
        this.#ch = cellHeight;
        this.#contents = Array((this.dx() / cellWidth) * (this.dy() / cellHeight));
        for (let x = 0; x < this.dx(); x += cellWidth) {
            this.#lines.push(new Line(x, 0, x, this.dy()));
        }
        for (let y = 0; y < this.dy(); y += cellHeight) {
            this.#lines.push(new Line(0, y, this.dx(), y));
        }
        [this.#image, this.#context] = createCanvas(...this.size());
    }
    /** Gets the length of the grid contents */
    len(): number {
        return this.contents.length;
    }
    /**
     * Resizes the grid to fit the specified size 
     * Note: Aspect ratio is maintained, so the final size
     * may be different than the size you requested.
     */
    resize(w: number, h: number): void {
        const wf = w / this.dx();
        const hf = h / this.dy();
        const scale = Math.min(wf, hf);
        this.#cw = Math.floor(this.#cw * scale);
        this.#ch = Math.floor(this.#ch * scale);
        super.resize(w, h);
        for (const content of this.#contents) {
            if (content) content.scaleTo(this.#cw, this.#ch);
        }
        [this.#image, this.#context] = createCanvas(...this.size());
        this.#render();
    }
    /** Gets the cell size of the grid */
    cellSize(): [w: number, h: number] {
        return [this.#cw, this.#ch];
    }
    /** Gets the full list of sprites in the grid */
    contents(): (Sprite | undefined)[] {
        return this.#contents;
    }
    /** Gets the sprite at the provided index in the grid (left-to-right top-to-bottom) */
    getContent(index: number): Sprite | undefined {
        if (index >= this.#contents.length) return void 0;
        return this.#contents[index];
    }
    /**
     * Sets the sprite at the provided index in the grid (left-to-right top-to-bottom) 
     * To remove a sprite from the grid, set to undefined
     */
    setContent(index: number, content: Sprite | undefined) {
        if (index >= this.#contents.length) return;
        this.#contents[index] = content;
        if (!!content) {
            const [x, y] = this.indexPos(index);
            content.setAnchor(LEFT, TOP);
            content.setPos2(x, y);
            content.scaleTo(this.#cw, this.#ch);
        }
        this.#render();
    }
    /** Sets all content for the grid */
    setAllContent(contents: (Sprite | undefined)[]) {
        if (contents.length !== this.#contents.length) {
            console.error('Attempted to set grid content with array of different size than the grid expected');
            return;
        }
        this.#contents = contents;
        for (const [i, content] of this.#contents.entries()) {
            if (content) {
                const [x, y] = this.indexPos(i);
                content.setAnchor(LEFT, TOP);
                content.setPos2(x, y);
                content.scaleTo(this.#cw, this.#ch);
            }
        }
        this.#render();
    }
    /** Sets the image as a sprite to the provided index in the grid */
    setRawContent(index: number, image: Image) {
        this.setContent(index, new SimpleSprite(image));
    }
    /** Get the index that maps to the provided x,y coordinate */
    indexAt(x: number, y: number): number {
        return Math.floor(y / this.#ch) * Math.floor(this.dx() / this.#cw) + Math.floor(x / this.#cw);
    }
    /** 
     * Gets the x, y coordinate of the top left corner of the grid cell
     * at the specified index
     */
    indexPos(index: number): [x: number, y: number] {
        const x = Math.floor(index * this.#cw % this.dx());
        const y = Math.floor(index * this.#cw / this.dx());
        return [x, y];
    }
    /** Get the sprite at the given x,y coordinate */
    getContentAt(x: number, y: number): Sprite | undefined {
        return this.getContent(this.indexAt(x, y));
    }
    /**
     * Set the sprite at the given x,y coordinate
     * To remove a sprite from the grid, set to undefined
     */
    setContentAt(x: number, y: number, content: Sprite | undefined) {
        this.#contents[this.indexAt(x, y)] = content;
        if (!!content) {
            content.xy(x, y);
        }
        this.#render();
    }
    /** Sets the image as a sprite to the provided position in the grid */
    setRawContentAt(x: number, y: number, image: Image) {
        this.setContent(this.indexAt(x, y), new SimpleSprite(image));
    }
    /** Visually higlights the cell at the specified index */
    select(index: number, width: number, color: Color): void {
        this.#selected = index;
        this.#selectedWidth = width;
        this.#selectedColor = color;
        this.#render();
    }
    /** Visually highlights the cell at the specified position */
    selectAt(x: number, y: number, width: number, color: Color): void {
        this.select(this.indexAt(x, y), width, color);
    }
    /** Reloads the sprites in the grid (if they are reloadable) */
    reload(): void {
        for (const sprite of this.#contents) {
            if (typeof (sprite as unknown as Reloadable).reload === 'function') {
                (sprite as unknown as Reloadable).reload();
            }
        }
        this.#render();
    }
    /** Return the gridlines */
    lines(): Line[] {
        return this.#lines;
    }
    /** Show the gridlines using the provided stroke width and color */
    showLines(width: number, color: Color) {
        this.#lineColor = color;
        this.#lineWidth = width;
        this.#render();
    }
    /** Hide the gridlines */
    hideLines() {
        this.#lineColor = void 0;
        this.#render();
    }
    /** Toggles the gridlines */
    toggleLines(width: number, color: Color): void {
        if (this.#lineColor) {
            this.hideLines();
        } else {
            this.showLines(width, color);
        }
    }
    /** Return the grid image including all of it's content sprites */
    image(): Image {
        return this.#image;
    }

    #render() {
        this.#context.reset();
        for (const content of this.#contents) {
            if (!!content && !!content.image()) this.#context.drawImage(content.image() as Image, ...content.rawPos());
        }
        if (!!this.#lineColor) {
            for (const line of this.#lines) {
                drawLine(this.#context, line, this.#lineWidth, this.#lineColor);
            }
        }
        if (this.#selected >= 0) {
            const [x, y] = this.indexPos(this.#selected);
            this.#context.lineWidth = this.#selectedWidth;
            this.#context.strokeStyle = this.#selectedColor?.hex() || '';
            this.#context.strokeRect(x, y, this.#cw, this.#ch);
        }
    }
}