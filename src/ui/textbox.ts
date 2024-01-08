import { RawBounds } from '../bounds';
import { Input } from '../input';
import { Key, isKeyPressed, keysJustPressed, typedThisFrame } from '../keyboard';
import { MouseButton, isMouseButtonJustPressed } from '../mouse';

export class TextBox extends RawBounds {
    #input: Input;
    #content: string = '';
    #cooldown: number = 0;
    #repeating: boolean = false;
    #focused: boolean = false;

    constructor(w: number, h: number, input: Input) {
        super(w, h);
        this.#input = input;
    }
    /** Get content of the box */
    content(): string {
        return this.#content;
    }
    /** Sets content of the box */
    setContent(content: string): void {
        this.#content = content;
    }
    /** Updates the box, requires cursor position */
    update(x: number, y: number, delta: number) {
        if (this.#input.isCaptured()) {
            this.#focused = false;
            return;
        }
        if (this.#focused) {
            this.#input.capture();
            // Detect click outside of box to lose focus
            if (!this.isWithin(x, y) && isMouseButtonJustPressed(MouseButton.MouseLeft)) {
                this.#focused = false;
                return;
            }
            // Handle backspace
            this.#cooldown -= delta;
            if (isKeyPressed(Key.Backspace)) {
                if (this.#cooldown <= 0) {
                    this.#content = this.#content.slice(0, this.#content.length - 1);
                    if (this.#repeating) {
                        this.#cooldown = 100;
                    } else {
                        this.#cooldown = 500;
                    }
                    this.#repeating = true;
                }
                return;
            } else {
                this.#cooldown = 0;
                this.#repeating = false;
            }
            // Handle typed characters
            this.#content += typedThisFrame();
        } else {
            // Detect click on box to set focus
            if (this.isWithin(x, y) && isMouseButtonJustPressed(MouseButton.MouseLeft)) {
                this.#input.capture();
                this.#focused = true;
            }
        }
    }
}