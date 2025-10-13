import { type CardSize } from '@/models/card.ts'
export const getCardImageSize = (size: CardSize) => {
  switch (size) {
    case 's':
      return { width: 130, height: 163 }
    case 'm':
      return { width: 220, height: 275 }
    case 'm2':
      return { width: 375, height: 469 }
    case 'l':
    case 'l_noframe':
      return { width: 640, height: 800 }
    case 'ls':
      return { width: 120, height: 375 }
    case 'xs':
      return { width: 100, height: 100 }
  }
}
