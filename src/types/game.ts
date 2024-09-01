import { Context } from './image.js'
import { Scene } from './scene.js'

/** Represents a game that can be run by the engine */
export interface Game {
  load?(): Promise<void>
  update(delta: number): void
  draw(screen: Context): void
  loadScene(scene: Scene): void
}
