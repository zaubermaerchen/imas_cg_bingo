export default class Card {
  id: number
  name: string
  type: number
  rarity: number
  hash: string

  constructor(id: number, name: string, type: number, rarity: number, hash: string) {
    this.id = id
    this.name = name
    this.type = type
    this.rarity = rarity
    this.hash = hash
  }

  imageUrl = (size: 's' | 'm' | 'm2' | 'l' | 'l_noframe' | 'xs' | 'ls' = 'm'): string => {
    if (this.rarity < 4 && size === 'l_noframe') {
      size = 'l'
    }
    return `${import.meta.env.VITE_IMAGE_SERVER_URL}/card/${size}/${this.hash}.jpg`
  }
}
