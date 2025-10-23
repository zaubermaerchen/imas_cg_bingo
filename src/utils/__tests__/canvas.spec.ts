import { describe, it, expect } from 'vitest'

import { loadImage, canvasToImage } from '@/utils/canvas.ts'
import blankImageUrl from '@/assets/blank.jpg'

describe('loadImage', () => {
  it('指定したパスの画像が設定されたHTMLImageElementが生成されるか', async () => {
    const image = await loadImage(blankImageUrl)
    expect(image).toBeInstanceOf(HTMLImageElement)
    expect(image.src).toBe(new URL(blankImageUrl, location.href).href)
    expect(image.crossOrigin).toBe('anonymous')
  })

  it('存在しない画像のパスだった場合エラーになるか', () => {
    loadImage('invalid-url.jpg').catch((reason) => {
      expect(reason).toBeInstanceOf(Error)
      expect(reason.message).toBe('Failed to load image: invalid-url.jpg')
    })
  })
})

describe('canvasToImage', () => {
  it('canvasから画像を生成できるか', async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas context')
    }

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 100, 100)

    const imageUrl = await canvasToImage(canvas)
    expect(imageUrl.startsWith('blob:')).toBe(true)
  })
})
