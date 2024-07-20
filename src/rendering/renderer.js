/**
 * Renderer is a utility for managing and automatically drawing RenderLayers
 * to the screen. This is helpful for large scenes.
 * For simple Scenes only drawing a couple of things it's recommended to
 * implement a simpler Draw() function in the Scene rather than use the Renderer
 */
export class Renderer {
  /** @type {import('../types/index.js').RenderLayer[]} */
  #layers = []

  /**
   * Adds a RenderLayer to the Renderer
   * @param {import('../types/index.js').RenderLayer} layer
   */
  addRenderLayer(layer) {
    if (this.#layers.includes(layer)) return
    this.#layers.push(layer)
    this.#layers.sort((a, b) => a.order() - b.order())
  }
  /**
   * Removes a RenderLayer from the Renderer
   * @param {import('../types/index.js').RenderLayer} layer
   */
  removeRenderLayer(layer) {
    if (!this.#layers.includes(layer)) return
    this.#layers.splice(this.#layers.indexOf(layer), 1)
  }
  /**
   * Draw the result of the Renderer to the provided context
   * (usually the screen)
   * @param {import('../image.js').Context} ctx
   */
  draw(ctx) {
    for (const layer of this.#layers) {
      layer.draw(ctx)
    }
  }
}
