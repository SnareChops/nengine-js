import { Context, cursorPosition } from '.';
import { Sprite } from './types/sprite';

export class Input {
    #captured: boolean = false;
    #cursorDeltaX: number = 0;
    #cursorDeltaY: number = 0;
    #cursorPrevX: number = 0;
    #cursorPrevY: number = 0;
    #cursorContent: Sprite | undefined;
    #order: number = 0;

    /** Sets the Input rendering order */
    setOrder(order: number): void {
        this.#order = order;
    }
    /** Input rendering order */
    order(): number {
        return this.#order;
    }
    /**
     * "Capture" the input.
     * This is useful for preventing multiple different parts
     * of your code from all handling input events when your
     * intention is to only handle it in one place.
     * For example: Multiple sprites are layered on top of eachother.
     * You might want to only handle the click by the sprite that is
     * on top of the others. The top sprite can "capture" the event
     * then the other sprites can check if the input has already been
     * captured and ignore the click event.
     * Note: The `update()` function must be called before any code that
     * may use this feature, for example at the beginning of your scene's
     * `update()` function.
     */
    capture(): void {
        this.#captured = true;
    }
    /** Checks if the input has already been captured */
    isCaptured(): boolean {
        return this.#captured;
    }
    /** Gets the cursor content */
    cursorContent(): Sprite | undefined {
        return this.#cursorContent;
    }
    /**
     * Sets the cursor content 
     * set to undefined to remove the cursor content
     */
    setCursorContent(content: Sprite | undefined): void {
        this.#cursorContent = content;
    }
    /**
     * Returns the difference in cursor position from the previous
     * frame.
     * Note: `update()` must be called for this to function correctly
     */
    cursorDelta(): [x: number, y: number] {
        return [this.#cursorDeltaX, this.#cursorDeltaY];
    }
    /** Update the input state */
    update(): void {
        this.#captured = false;
        const [x, y] = cursorPosition();
        this.#cursorDeltaX = x - this.#cursorPrevX;
        this.#cursorDeltaY = y - this.#cursorPrevY;
        this.#cursorPrevX = x;
        this.#cursorPrevY = y;
        if (!!this.#cursorContent) {
            this.#cursorContent.setPos2(x, y);
        }
    }
    /** Draws the cursor content */
    draw(ctx: Context): void {
        if (this.#cursorContent) {
            const image = this.#cursorContent.image();
            if (image) {
                ctx.drawImage(image, ...this.#cursorContent.rawPos());
            }
        }
    }
}