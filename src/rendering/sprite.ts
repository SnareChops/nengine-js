import type { DrawableSprite, Camera, Context } from '../types/index.js'

export function drawSprite(dest: Context, sprite: DrawableSprite, camera?: Camera) {
  const image = sprite.image()
  if (!image) return
  if (camera) {
    dest.drawImage(image, ...camera.screenToWorldPos(...sprite.min()))
    return
  }
  dest.drawImage(image, ...sprite.min())
}
