/** Handle to a timer stage */
export type TimerStage = number;
/** The default IDLE stage */
export const TimerStageIdle: TimerStage = 1;
/** 
 * Utility for handling timings for various things
 * Helpful for implementing player abilities, or animations
 */
export class Timer {
    #stage: TimerStage = 1;
    #timers = new Map<TimerStage, number>();
    #counters = new Map<TimerStage, number>();
    #elapsed: TimerStage = 0;
    #looping: boolean = false;

    /** Add a new stage to the timer, returns an identifier for this new stage */
    addStage(duration: number): TimerStage {
        let max = TimerStageIdle;
        for (const stage of this.#timers.keys()) {
            if (stage > max) max = stage;
        }
        let stage = TimerStageIdle << 1;
        if (max != TimerStageIdle) stage = max << 1;
        this.#timers.set(stage, duration);
        return stage;
    }
    /** Set the duration of a timer stage */
    setStage(stage: TimerStage, duration: number) {
        this.#timers.set(stage, duration);
    }
    /** Get the duration of a timer stage (undefined if an unknown stage) */
    getStage(stage: TimerStage): number | undefined {
        return this.#timers.get(stage);
    }
    /** Returns the full timing structure */
    timings(): Map<TimerStage, number> {
        return this.#timers;
    }
    /** Returns the identifier of the current stage */
    stage(): TimerStage {
        return this.#stage;
    }
    /** Starts the timer */
    start(looping: boolean = false) {
        if (this.#stage == TimerStageIdle) {
            this.#looping = looping;
            for (const [stage, time] of this.#timers.entries()) {
                this.#counters.set(stage, time);
            }
            this.#next();
        }
    }
    /** Stops the timer */
    stop() {
        this.#stage = TimerStageIdle;
    }
    /** Forces the timer to move to the next stage immediately */
    next() {
        if (this.#stage != TimerStageIdle) this.#next();
    }
    /** Update the timer */
    update(delta: number) {
        this.#counters;
        this.#update(delta);
    }
    /** Returns a number between 0 and 1 that represents the progress through the current stage */
    stagePercent(): number {
        const time = this.#timers.get(this.#stage);
        const count = this.#counters.get(this.#stage);
        if (typeof time != 'number' || typeof count != 'number') return 0;
        return (time - count) / time;
    }
    /** Checks if the provided stage elapsed this frame */
    elapsed(stage: TimerStage): boolean {
        return (this.#elapsed & this.#stage) === stage;
    }
    // TODO: Change elapsed to only contain Idle on the first activation of
    // the timer if the timer is looping

    // Moves the timer to the next state
    #next() {
        this.#elapsed |= this.#stage;
        // If there is no next step, unless looping == true
        if (this.#timers.has(this.#stage << 1)) {
            this.#stage = TimerStageIdle;
            if (this.#looping) this.start(this.#looping);
            return;
        }
        // For any other state, move to the next state
        this.#stage <<= 1;
        if (this.#timers.get(this.#stage) == 0) this.#next();
    }

    #update(delta: number) {
        if (delta <= 0 || this.#stage == TimerStageIdle) return;
        if (this.#counters.has(this.#stage)) {
            let counter = this.#counters.get(this.#stage)!!;
            counter -= delta;
            this.#counters.set(this.#stage, counter);
            if (counter <= 0) {
                const rem = counter * -1;
                this.#next();
                this.#update(rem);
            }
        }
    }
}