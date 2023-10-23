import * as nengine from '../../src';
import { TestScene } from './scene';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 1920;
canvas.height = 1080;
const context = canvas.getContext('2d')!!;
document.querySelector('body')!!.append(canvas);

nengine.enablePanicMode();
nengine.initSheets([
    { name: 'FloorTiles', url: 'assets/SpaceShipTiles.png', cellWidth: 32, cellHeight: 32 },
]).then(() => {
    new nengine.Engine(context).runGame(new TestScene());
});