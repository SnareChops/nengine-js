import { debugStat } from './debug';

/** Debug utility to measure time spent */
export class DebugTimer {
	protected _name: string;
	protected _buffer: number[] = new Array(10);
	protected _pointer: number = 0;
	protected _start: number = 0;
	protected _peak: number = 0;

	constructor(name: string) {
		this._name = name;
		debugStat(name, () => `avg: ${this.average()}, peak: ${this._peak}`);
	}

	/** Start measuring time */
	start() {
		this._start = new Date().getTime();
	}

	/** End the current measurement */
	end() {
		const delta = new Date().getTime() - this._start;
		this._buffer[this._pointer] = delta;
		this._pointer = (this._pointer + 1) % this._buffer.length;
		if (delta > this._peak) this._peak = delta;
	}

	/** Returns the average time in ms */
	average(): number {
		let total: number = 0;
		for (const delta of this._buffer) {
			total += delta;
		}
		return (total / this._buffer.length);
	}

	/** Returns the peak time in ms */
	peak(): number {
		return this._peak;
	}
}