import * as nengine from '../../src';
import { TestScene } from './scene';

const [canvas, context] = nengine.createCanvas(1920, 1080);
document.querySelector('body')!!.append(canvas);

nengine.enablePanicMode();
nengine.initSheets([
    { name: 'FloorTiles', url: 'assets/SpaceShipTiles.png', cellWidth: 32, cellHeight: 32 },
]).then(() => {
    new nengine.Engine(context).runGame(new TestScene());
});