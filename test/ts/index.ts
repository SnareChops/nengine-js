import { Engine } from '../../src/engine';
import { TestScene } from './scene';

const $body = document.querySelector<HTMLBodyElement>('body') as HTMLBodyElement;
const $canvas = document.createElement('canvas') as HTMLCanvasElement;
const ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;

$canvas.width = 1920;
$canvas.height = 1080;

$body.append($canvas);

new Engine(ctx).runGame(new TestScene());