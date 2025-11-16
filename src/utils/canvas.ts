/**
 * 画像読み込み
 *
 * @param {string} path 画像のパス
 *
 * @returns {Promise<HTMLImageElement>} 読み込んだ画像のPromise
 */
export const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise(
    (resolve: (value: HTMLImageElement) => void, reject: (reason: Error) => void) => {
      const image = new Image()
      image.src = path
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        resolve(image)
      }
      image.onerror = () => {
        reject(new Error(`Failed to load image: ${path}`))
      }
    },
  )
}

/**
 * Canvasの内容を画像に変換
 *
 * @param {HTMLCanvasElement} canvas 描画元のcanvas要素
 *
 * @returns {Promise<string>} 生成された画像のURL
 */
export const canvasToImage = (canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise<string>((resolve: (value: string) => void, reject: () => void) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject()
        return
      }
      resolve(URL.createObjectURL(blob))
    })
  })
}
