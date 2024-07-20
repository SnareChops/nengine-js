/**
 * @param {import('../image.js').Context} dest
 * @param {import('../types/index.js').DrawableSprite} sprite
 * @param {import('../types/index.js').Camera} camera
 */
export function drawSprite(dest, sprite, camera) {
  const image = sprite.image()
  if (!image) return
  if (camera) {
    dest.drawImage(image, ...camera.screenToWorldPos(...sprite.min()))
    return
  }
  dest.drawImage(image, ...sprite.min())
}
