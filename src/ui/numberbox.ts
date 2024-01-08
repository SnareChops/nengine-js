import { Raw } from '../bounds/raw';
import { Input } from '../input';
import { Key, isKeyPressed, typedThisFrame } from '../keyboard';
import { MouseButton, isMouseButtonJustPressed } from '../mouse';

export class NumberBox extends Raw {
    #input: Input;
    #content: number = 0;
    #cooldown: number = 0;
    #repeating: boolean = false;
    #focused: boolean = false;

    constructor(w: number, h: number, input: Input) {
        super(w, h);
        this.#input = input;
    }
    /** Gets the content of the NumberBox */
    content(): number {
        return this.#content;
    }
    /** Sets the content of the NumberBox */
    setContent(content: number): void {
        this.#content = content;
    }
    /** Updates the NumberBox, requires the cursor position */
    update(x: number, y: number, delta: number): void {
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
                    this.#content /= 10;
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
            // Handle keypresses
            const typed = typedThisFrame();
            for (const char of typed.split('')) {
                const value = Number(char);
                if (isNaN(value)) continue;
                this.#content = this.#content * 10 + value;
            }
        } else {
            // Detect click on box to set focus
            if (this.isWithin(x, y) && isMouseButtonJustPressed(MouseButton.MouseLeft)) {
                this.#input.capture();
                this.#focused = true;
            }
        }
    }
} 