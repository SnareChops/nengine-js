import { Button } from '../src/ui/button';
import { SlideAnimator } from '../src/animators/slide';
import type { Image, Context } from '../src/image';

export class AnimButton extends Button {
    #animator: SlideAnimator;
    #text: string;
    #context: Context;
    #image: Image;

    constructor(sheet: string, width: number, textOffset: number, start: number, end: number, text: string, centerText: boolean) {
        super();

        this.setSize(width,);
        this.#animator = new SlideAnimator(100, makeButtons(sheet, width, start, end));
    }
}
