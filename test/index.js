import * as nengine from '../dist/index.js'
import { TestScene } from './scene.js'

async function main() {
  const canvas = document.createElement('canvas')
  canvas.width = 1920
  canvas.height = 1080
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to get 2d context')
  document.body.append(canvas)

  await nengine.preloadImage('TestIcon', 'assets/TestIcon.png')
  const engine = new nengine.Engine(context)
  const game = new nengine.BasicGame(canvas.width, canvas.height, nengine.Key.KeyC)
  game.loadScene(new TestScene())
  engine.runGame(game)
}

main()
