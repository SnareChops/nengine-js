import * as nengine from '../../src';
import { TestScene } from './scene';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 1920;
canvas.height = 1080;
const context = canvas.getContext('2d')!!;
document.querySelector('body')!!.append(canvas);

nengine.enablePanicMode();
const game = new nengine.BasicGame(canvas.width, canvas.height)
game.loadScene(new TestScene())
new nengine.Engine(context).runGame(game);