// FrameAnimation represents timings for a single animation frame
export interface AnimationFrame {
	start: number;
	duration: number;
	frame: CanvasImageSource;
}

interface Frame {
	start: number;
	duration: number;
	frame: number;
}

/**
 * A Frame-by-frame animator that can run specified frame-by-frame animations
 * Tip: Use in combination with Bounds to create an animated sprite
 */
export class FrameByFrameAnimator {
	#frames: CanvasImageSource[] = [];
	#animations: Map<string, { start: number, duration: number, frame: number; }[]> = new Map();
	#active: Frame[] | undefined;
	#frame: number = 0;
	#elapsed: number = 0;
	#loop: boolean = false;

	/** addAnimation Adds a new named animation to the Animator */
	addAnimation(name: string, animation: AnimationFrame[]): this {
		const _animation: Frame[] = [];
		for (const frame of animation) {
			if (!this.#frames.includes(frame.frame)) this.#frames.push(frame.frame);
			_animation.push({ start: frame.start, duration: frame.duration, frame: this.#frames.indexOf(frame.frame) });
		}
		this.#animations.set(name, _animation);
		return this;
	}
	/** 
	 * clearAnimation Clears the currently active animation
	 * and returns the image to the default image
	 */
	clearAnimation() {
		this.#active = void 0;
		this.#loop = false;
		this.#elapsed = 0;
	}
	/** startAnimation Starts an animation by it's name */
	startAnimation(name: string, loop: boolean) {
		this.#active = this.#animations.get(name);
		this.#loop = loop;
		this.#elapsed = 0;
	}

	/** image Returns the current active image for the animation */
	image(): CanvasImageSource {
		return this.#frames[this.#frame];
	}

	/** update Call this on every frame to "run" the animation */
	update(delta: number) {
		if (!this.#active) return;
		const last = this.#active[this.#active.length - 1];
		const total = last.start + last.duration;
		this.#elapsed += delta;
		if (this.#elapsed >= total && !this.#loop) {
			this.clearAnimation();
		}
		this.#elapsed %= total;
		for (const frame of this.#active) {
			if (this.#elapsed > frame.start) {
				this.#frame = frame.frame;
			}
		}
	}
}