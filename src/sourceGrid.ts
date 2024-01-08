import { SpriteGrid } from './grid';
import { SourceSprite } from './sprite';
import { Sprite, SpriteSource } from './types';

/** Represents a grid of sprite sources */
export class SpriteSourceGrid extends SpriteGrid {
    #sources: SpriteSource[];

    constructor(gridWidth: number, gridHeight: number, cellWidth: number, cellHeight: number) {
        super(gridWidth, gridHeight, cellWidth, cellHeight);
        this.#sources = Array(this.len());
    }
    /** Gets all sources in the grid */
    sources(): SpriteSource[] {
        return this.#sources;
    }
    /** Get source at index location */
    getSource(index: number): SpriteSource {
        return this.#sources[index];
    }
    /** Get source at position */
    getSourceAt(x: number, y: number): SpriteSource {
        return this.#sources[this.indexAt(x, y)];
    }
    /** Sets content at index */
    // @ts-expect-error
    setContent(index: number, source: SpriteSource): void {
        this.#sources[index] = source;
        if (source) {
            super.setContent(index, new SourceSprite(source));
        } else {
            super.setContent(index, void 0);
        }
    }
    /** Sets all content for the grid */
    // @ts-expect-error
    setAllContent(sources: SpriteSource[]): void {
        this.#sources = sources;
        const sprites: (Sprite | undefined)[] = [];
        for (const source of sources) {
            if (source) {
                sprites.push(new SourceSprite(source));
            } else {
                sprites.push(void 0);
            }
        }
        super.setAllContent(sprites);
    }
    /** Sets content at position */
    // @ts-expect-error
    setContentAt(x: number, y: number, source: SpriteSource): void {
        this.setContent(this.indexAt(x, y), source);
    }
}