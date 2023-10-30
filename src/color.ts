import { panic } from './panic';

/** Represents a color that can be used within nengine */
export class Color {
    #r: number;
    #g: number;
    #b: number;
    #a: number;

    /** Creates a color from a hex string */
    static fromHex(hex: string): Color {
        hex = hex.toLowerCase();
        if (hex.startsWith('#')) hex = hex.slice(1);
        if (/^[a-f0-9]{3}$/.test(hex))
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + 'ff';
        else if (/^[a-f0-9]{4}$/.test(hex))
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        else if (/^[a-f0-9]{6}$/.test(hex))
            hex = hex + 'ff';
        else if (/^[a-f0-9]{8}$/.test(hex)) { }
        else
            panic('Invalid hex string');
        const int = parseInt(hex.startsWith('#') ? hex.slice(1) : hex, 16);
        const r = (int >> 24) & 255;
        const g = (int >> 16) & 255;
        const b = (int >> 8) & 255;
        const a = int & 255;
        return new Color(r, g, b, a);
    }

    constructor(r: number, g: number, b: number, a: number) {
        this.#r = r;
        this.#g = g;
        this.#b = b;
        this.#a = a;
    }

    /** Gets and/or sets the red value 0-255 */
    r(r?: number): number {
        if (r && r > 0) this.#r = r;
        return this.#r;
    }
    /** Gets and/or sets the green value 0-255 */
    g(g?: number): number {
        if (g && g > 0) this.#g = g;
        return this.#g;
    }
    /** Gets and/or sets the blue value 0-255 */
    b(b?: number): number {
        if (b && b > 0) this.#b = b;
        return this.#b;
    }
    /** Gets and/or sets the alpha value 0-255 */
    a(a?: number): number {
        if (a && a > 0) this.#a = a;
        return this.#a;
    }
    /** Gets and/or sets the red and green values 0-255 */
    rg(r?: number, g: number | undefined = r): [r: number, g: number] {
        if (r && r > 0) this.#r = r;
        if (g && g > 0) this.#g = g;
        return [this.#r, this.#g];
    }
    /** Gets and/or sets the red and blue values 0-255 */
    rb(r?: number, b: number | undefined = r): [r: number, b: number] {
        if (r && r > 0) this.#r = r;
        if (b && b > 0) this.#b = b;
        return [this.#r, this.#b];
    }
    /** Gets and/or sets the red and alpha values 0-255 */
    ra(r?: number, a: number | undefined = r): [r: number, a: number] {
        if (r && r > 0) this.#r = r;
        if (a && a > 0) this.#a = a;
        return [this.#r, this.#a];
    }
    /** Gets and/or sets the green and blue values 0-255 */
    gb(g?: number, b: number | undefined = g): [g: number, b: number] {
        if (g && g > 0) this.#g = g;
        if (b && b > 0) this.#b = b;
        return [this.#g, this.#b];
    }
    /** Gets and/or sets the green and alpha values 0-255 */
    ga(g?: number, a: number | undefined = g): [g: number, a: number] {
        if (g && g > 0) this.#g = g;
        if (a && a > 0) this.#a = a;
        return [this.#g, this.#a];
    }

    /** Gets and/or sets the blue and alpha values 0-255 */
    ba(b?: number, a: number | undefined = b): [b: number, a: number] {
        if (b && b > 0) this.#b = b;
        if (a && a > 0) this.#a = a;
        return [this.#b, this.#a];
    }
    /** Gets and/or sets the red, green, blue values 0-255 */
    rgb(r?: number, g: number | undefined = r, b: number | undefined = r): [r: number, g: number, b: number] {
        if (r && r > 0) this.#r = r;
        if (g && g > 0) this.#g = g;
        if (b && b > 0) this.#b = b;
        return [this.#r, this.#g, this.#b];
    }
    /** Gets and/or sets the red, greeen, alpha values 0-255 */
    rga(r?: number, g: number | undefined = r, a: number | undefined = r): [r: number, g: number, a: number] {
        if (r && r > 0) this.#r = r;
        if (g && g > 0) this.#g = g;
        if (a && a > 0) this.#a = a;
        return [this.#r, this.#g, this.#a];
    }
    /** Gets and/or sets the red, blue, alpha values 0-255 */
    rba(r?: number, b: number | undefined = r, a: number | undefined = r): [r: number, b: number, a: number] {
        if (r && r > 0) this.#r = r;
        if (b && b > 0) this.#b = b;
        if (a && a > 0) this.#a = a;
        return [this.#r, this.#b, this.#a];
    }
    /** Gets and/or sets the green, blue, alpha values 0-255 */
    gba(g?: number, b: number | undefined = g, a: number | undefined = g): [g: number, b: number, a: number] {
        if (g && g > 0) this.#g = g;
        if (b && b > 0) this.#b = b;
        if (a && a > 0) this.#a = a;
        return [this.#g, this.#b, this.#a];
    }
    /** Gets and/or sets the red, green, blue, alpha values 0-255 */
    rgba(r?: number, g: number | undefined = r, b: number | undefined = r, a: number | undefined = r): [r: number, g: number, b: number, a: number] {
        if (r && r > 0) this.#r = r;
        if (g && g > 0) this.#g = g;
        if (b && b > 0) this.#b = b;
        if (a && a > 0) this.#a = a;
        return [this.#r, this.#g, this.#b, this.#a];
    }
    /** Gets a hex string representing the color */
    hex(): string {
        return '#'
            + this.#r.toString(16).padStart(2, '0')
            + this.#g.toString(16).padStart(2, '0')
            + this.#b.toString(16).padStart(2, '0')
            + this.#a.toString(16).padStart(2, '0');
    }
    /** Gets the color as components from 0-1 */
    floats(): [r: number, g: number, b: number, a: number] {
        return [
            this.#r / 255,
            this.#g / 255,
            this.#b / 255,
            this.#a / 255,
        ];
    }
}