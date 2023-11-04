import { Context } from '../image';

export interface Animator {
    start(name: string): void;
    update(delta: number): void;
    image(): Context;
}
