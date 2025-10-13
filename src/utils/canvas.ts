export const drawImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  path: string,
) => {
  return new Promise((resolve: (value?: unknown) => void) => {
    const image = new Image()
    image.src = path
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      ctx.drawImage(image, x, y, image.width, image.height)
      resolve()
    }
  })
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
