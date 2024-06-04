import { RenderLayer } from './renderLayer';
import { Sprite } from './sprite';

export interface Input extends RenderLayer {
    capture(): void;
    isCaptured(): boolean;
    content(): Sprite;
    setContent(content: Sprite): void;
    cursorDelta(): [number, number];
    update(): void;
}