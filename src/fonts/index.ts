import { Raw } from '../bounds/raw';
import { Color } from '../color';
import { CONTEXT, Engine } from '../engine';
import { Context } from '../image';

/** Text represents a drawable text block */
export class Text extends Raw {
    // @ts-expect-error ts(2564)
    ascent: number;
    // @ts-expect-error ts(2564)
    descent: number;
    font: string;
    kerning: number;
    lines: string[] = [];
    color: Color;

    constructor(value: string, kerning: number, font: string, color: Color) {
        super();
        this.color = color;
        this.kerning = kerning;
        this.font = font;
        this.lines = value.split('\n');
        this.#resize();
    }

    /** Wrap all lines of text to fit within the provided constraint */
    wrap(width: number) {
        let curr: string = '';
        const wrapped: string[] = [];
        const context = Engine[CONTEXT];
        context.font = this.font;
        for (const line of this.lines) {
            let words = line.split(' ');
            for (let i = 0; i < words.length; i++) {
                if (i == 0) curr = words[i];
                else curr += ' ' + words[i];
                if (context.measureText(curr).width > width) {
                    wrapped.push(words.slice(0, i).join(' '));
                    words = words.slice(0, i);
                    curr = '';
                    i = -1;
                }
            }
            wrapped.push(words.join(' '));
        }
        this.lines = wrapped;
        this.#resize();
    }

    #resize() {
        let w = 0, h = -this.kerning;
        const context = Engine[CONTEXT];
        for (const line of this.lines) {
            context.font = this.font;
            const metrics = context.measureText(line);
            this.ascent = metrics.actualBoundingBoxAscent;
            this.descent = metrics.actualBoundingBoxDescent;
            h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + this.kerning;
            if (w < metrics.width) w = metrics.width;
        }
        this.resize(w, h);
    }
}

/** Draws text to the canvas */
export function drawText(context: Context, text: Text) {
    for (const [i, line] of text.lines.entries()) {
        const height = text.ascent + text.descent;
        context.font = text.font;
        context.fillStyle = text.color.hex();
        context.fillText(line, text.x(), text.y() + i * height + text.ascent);
    }
}