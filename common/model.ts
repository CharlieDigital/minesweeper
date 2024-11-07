export class Tile {
  constructor(
    public x: number,
    public y: number,
    public label: number | '💣' = 0,
    public flipped: boolean = false
  ) {

  }

  get key() {
    return `${this.x}:${this.y}`
  }

  get isMine() {
    return this.label === '💣'
  }

  set isMine(value: boolean) {
    if (value === true) {
      this.label = '💣'
    }
  }

  increment() {
    if (this.isMine) {
      return
    }

    (this.label as number) += 1
  }

  flip() {
    this.flipped = true
    console.log(`Flipped tile: ${this.key}`)
  }
}

export class Board {
  public readonly tiles: Record<string, Tile> = {}

  constructor(
    public size: number,
    public count: number
  ) {
    const pieces = [];

    for (let i = 0; i < size * size; i++) {
      pieces.push(i < size ? true : false)
    }

    const mines: Array<[number, number]> = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = new Tile(x, y)

        const index = Math.floor(Math.random() * pieces.length)

        tile.isMine = pieces[index]

        this.tiles[`${x}:${y}`] = tile

        if (tile.isMine) {
          mines.push([x, y])
        }

        pieces.splice(index, 1)
      }
    }

    for (const [x, y] of mines) {
      const tiles = this.resolveAdjacent(x, y)

      for (const tile of tiles) {
        tile.increment()
      }
    }
  }

  flip(x: number, y: number) {
    this.tiles[`${x}:${y}`].flip()
  }

  resolveAdjacent(x: number, y: number) {
    return [
      this.tiles[`${x - 1}:${y - 1}`],
      this.tiles[`${x - 0}:${y - 1}`],
      this.tiles[`${x + 1}:${y - 1}`],
      this.tiles[`${x - 1}:${y - 0}`],
      this.tiles[`${x + 1}:${y - 0}`],
      this.tiles[`${x - 1}:${y + 1}`],
      this.tiles[`${x - 0}:${y + 1}`],
      this.tiles[`${x + 1}:${y + 1}`],
    ].filter(t => !!t)
  }
}
