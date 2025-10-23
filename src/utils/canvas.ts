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

export const canvasToImage = (canvas: HTMLCanvasElement) => {
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
