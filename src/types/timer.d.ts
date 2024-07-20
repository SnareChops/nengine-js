export interface StagedTimer {
  addStage(duration: number): TimerStage
  setStage(stage: TimerStage, duration: number): void
  timings(): Map<TimerStage, number>
  stage(): TimerStage
  start(looping: boolean): void
  stop(): void
  next(): void
  update(delta: number): void
  elapsed(stage: TimerStage): boolean
  stagePercent(): number
}
/** Handle to a timer stage */
export type TimerStage = number