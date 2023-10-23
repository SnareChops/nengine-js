interface Stat {
	label: string;
	value: () => string;
}

/** A utility for displaying debug info to the screen */
export class Debug {
	#font: string = '';
	#stats: Stat[] = [];

	constructor(font: string) {
		this.#font = font;
	}

	/** Add a new stat for the debug utility to track and display */
	addStat(label: string, value: () => string) {
		this.#stats.push({ label, value });
	}
	/** Remove a stat from the debug utility (by label) */
	remove(label: string) {
		for (let i = 0; i < this.#stats.length; i++) {
			if (this.#stats[i].label == label) {
				this.#stats.splice(i, 1);
			}
		}
	}
	/** Draw the debug information to the provided context (usually the screen) */
	draw(screen: CanvasRenderingContext2D) {
		let s = '';
		for (const stat of this.#stats) {
			s += `${stat.label}: ${stat.value()}\n`;
		}
		screen.font = this.#font;
		screen.strokeText(s, 10, 70);
	}
}