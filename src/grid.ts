import { RawBounds } from './bounds';
import { Color } from './color';
import { Context, Image } from './image';
import { Line, drawLine } from './line';
import { Sprite } from './sprite';
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

    /** 
     * IMPORTANT: The final size of the grid will always be a multiple of the cell sizes
     * Provided gridWidth and gridHeight will be used as a maximum and the actual width 
     * will be calculated and set as the bounds size. Use `.size()` after constructing
     * to get the actual size of the grid.
     */
    constructor(gridWidth: number, gridHeight: number, cellWidth: number, cellHeight: number) {
        super();
        const width = Math.floor(gridWidth / cellWidth) * cellWidth;
        const height = Math.floor(gridHeight / cellHeight) * cellHeight;
        this.#cw = cellWidth;
        this.#ch = cellHeight;
        this.#contents = Array((width / cellWidth) * (height / cellHeight));
        for (let x = 0; x < width; x += cellWidth) {
            this.#lines.push(new Line(x, 0, x, height));
        }
        for (let y = 0; y < height; y += cellHeight) {
            this.#lines.push(new Line(0, y, width, y));
        }
        [this.#image, this.#context] = createCanvas(...this.size());
    }

    /** Gets the full list of sprites in the grid */
    contents(): (Sprite | undefined)[] {
        return this.#contents;
    }

    /** Gets the sprite at the provided index in the grid (left-to-right top-to-bottom) */
    getContent(index: number): Sprite | undefined {
        return this.#contents[index];
    }

    /**
     * Sets the sprite at the provided index in the grid (left-to-right top-to-bottom) 
     * To remove a sprite from the grid, set to undefined
     */
    setContent(index: number, content: Sprite | undefined) {
        this.#contents[index] = content;
        if (!!content) {
            const x = index * this.#cw % this.dx();
            const y = index * (this.#cw / this.dx());
            content.xy(x, y * this.#cw);
        }
        this.#render();
    }

    /** Get the index that maps to the provided x,y coordinate */
    indexAt(x: number, y: number): number {
        return Math.floor(y / this.#ch) * Math.floor(this.dx() / this.#cw) + Math.floor(x / this.#cw);
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

    /** Return the grid image including all of it's content sprites */
    image(): Image {
        return this.#image;
    }

    #render() {
        this.#context.reset();
        for (const content of this.#contents) {
            if (!!content) this.#context.drawImage(content.image(), ...content.rawPos());
        }
        if (!!this.#lineColor) {
            for (const line of this.#lines) {
                drawLine(this.#context, line, this.#lineWidth, this.#lineColor);
            }
        }
    }
}