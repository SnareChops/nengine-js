import { Context } from '../image';
import { Sprite } from './sprite';

export interface RenderLayer {
    order(): number;
    draw(screen: Context): void;
}

export interface SpriteRenderLayer extends RenderLayer {
    Sprites(): Sprite[];
    AddSprite(sprite: Sprite): void;
    RemoveSprite(sprite: Sprite): void;
}