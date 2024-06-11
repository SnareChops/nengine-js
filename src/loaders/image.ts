import { Image } from '../image';
import { panic } from '../panic';
import { preloadImageRaw, preloadSheetRaw } from './raw';
import { Sheet, Anim } from './index';

export let flat = new Map<string, Image>();
export let sheets = new Map<string, Sheet>();
export let anims = new Map<string, Anim>();

function imageType(path: string): string {
	const p = path.toLowerCase();
	if (p.endsWith('.aseprite') || p.endsWith('.ase')) {
		return "aseprite";
	}
	if (p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg')) {
		return "raw";
	}
	panic("imageType: Unknown image type: " + path);
	return '';
}



export function preloadImage(alias: string, path: string) {
	switch (imageType(path)) {
		case "aseprite":
			panic("preloadImage: Aseprite not yet implemented");
			return;
		// return preloadImageAseprite(alias, path);
		case "raw":
			return preloadSheetRaw(alias, path);
		default:
			panic("PreloadImage: Unsupported image type" + alias);
	}
}

export function preloadSheet(alias: string, path: string) {
	switch (imageType(path)) {
		case "aseprite":
			return panic("preloadSheet: Aseprite not yet implemented");
		// return preloadSheetAseprite(alias, path);
		case "raw":
			return preloadImageRaw(alias, path);
		default:
			panic("PreloadSheet: Unsupported image type" + alias);
	}
}

export function preloadAnim(alias: string, path: string) {
	switch (imageType(path)) {
		case "aseprite":
			return panic("preloadAnim: Aseprite not yet implemented");
		// return preloadAnimAseprite(alias, path);
		case "raw":
			return panic("PreloadAnim: PNG not supported for animations. Use PreloadSheet instead.");
		default:
			panic("PreloadAnim: Unsupported image type" + alias);
	}
}

export function getImage(alias: string): Image | undefined {
	if (flat.has(alias)) return flat.get(alias);
	panic("GetImage: " + alias + " not found in cache");
}

export function getSheet(alias: string): Sheet | undefined {
	if (sheets.has(alias)) return sheets.get(alias);
	panic("GetSheet: " + alias + " not found in cache");
}

export function getSheetCell(alias: string, index: number): Image {
	const sheet = getSheet(alias)!!;
	if (index < 0 || index >= sheet.cells.length) {
		panic("GetSheetCell:" + index + ": " + alias + " out of range");
	}
	return sheet.cells[index];
}

export function getSheetRange(alias: string, start: number, end: number): Image[] {
	const sheet = getSheet(alias)!!;
	if (start < 0 || end >= sheet.cells.length) {
		panic("GetSheetRange:" + start + "-" + end + ": " + alias + " out of range");
	}
	return sheet.cells.slice(start, end);
}

export function getAnim(alias: string): Anim | undefined {
	if (anims.has(alias)) return anims.get(alias);
	panic("GetAnim: " + alias + " not found in cache");
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise(resolve => {
		const image = new Image();
		image.src = url;
		image.onerror = (event, source, lineno, colno, err) => {
			panic('Error loading image', err, `${source}:${lineno}:${colno}`, event);
			resolve(new Image());
		};
		image.addEventListener('load', event => resolve(event.target as HTMLImageElement));
	});
}