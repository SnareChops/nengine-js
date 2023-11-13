import * as nengine from '../../src';
import { TestGame } from './game';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 1920;
canvas.height = 1080;
const context = canvas.getContext('2d')!!;
document.querySelector('body')!!.append(canvas);

nengine.enablePanicMode();
new nengine.Engine(context).runGame(new TestGame());