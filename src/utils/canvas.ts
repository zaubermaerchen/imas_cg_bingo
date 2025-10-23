export const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve: (value: HTMLImageElement) => void, reject: () => void) => {
    const image = new Image()
    image.src = path
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject()
    }
  })
}

export const drawImageToCanvas = async (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  path: string,
) => {
  const image = await loadImage(path)
  ctx.drawImage(image, x, y, image.width, image.height)
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
