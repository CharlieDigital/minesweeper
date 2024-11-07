import './style.css'
import './minesweeper.css'
import { $, $id } from './utils';

// Setup the board first.
function setup(dim: number, totalMines: number) {
  const board = $id<HTMLDivElement>("board")!;

  // Create our piece set
  const pieces = []

  for (let i = 0; i < dim * dim; i++) {
    i < totalMines
      ? pieces.push(true)
      : pieces.push(false)
  }

  board.style.gridTemplateColumns = `repeat(${dim}, 1fr)`
  board.style.gridTemplateRows = `repeat(${dim}, 1fr)`

  const mines: Array<[number, number]> = []

  for (let x = 0; x < dim; x++) {
    for (let y = 0; y < dim; y++) {
      // Pick a piece at random.
      const randomIndex = Math.floor(Math.random() * pieces.length);

      const isMine = pieces.splice(randomIndex, 1)[0];

      board.insertAdjacentHTML(
        "beforeend",
        `<div
          class="tile tile__masked"
          id="t_${x}_${y}"
          onclick="window.flip(event)">
          <span>${isMine ? '💣' : '0'}</span>
        </div>`
      )

      if (isMine) {
        mines.push([x, y])
      }
    }
  }

  // Calculate the adjacency for the mines and increment.
  for (const mine of mines) {
    var { tiles } = adj(mine[0], mine[1])

    for (const tile of tiles) {
      if (tile.isMine) {
        continue
      }

      let count = parseInt(tile.content ?? '0')

      const tileElement = $id(tile.id)!

      tileElement.innerHTML = `<span>${count + 1}</span>`
      tileElement.classList.add(`tile__${count + 1}`)
    }
  }
}

// Get the adjacency list for a given (x,y) tile coordinate
function adj(x: number, y: number) {
  const tiles = [
    resolve(x - 1, y - 1),
    resolve(x - 0, y - 1),
    resolve(x + 1, y - 1),
    resolve(x - 1, y - 0),
    resolve(x + 1, y - 0),
    resolve(x - 1, y + 1),
    resolve(x - 0, y + 1),
    resolve(x + 1, y + 1)
  ].filter(x => !!x);

  const self = resolve(x, y)

  return {
    tile: self,
    tiles,
    mines: tiles.reduce((agg, t) => {
      agg += t.isMine ? 1 : 0;
      return agg;
    }, 0)
  }
}

// Resolve an object for the given tile
function resolve(x: number, y: number) {
  const tile = $id<HTMLDivElement>(`t_${x}_${y}`)

  if (!tile) {
    return undefined
  }

  let flipped = tile.classList.contains("tile__flipped");
  const content = tile.textContent;

  return {
    x,
    y,
    id: `t_${x}_${y}`,
    flipped,
    content,
    isMine: content?.trim() === "💣"
  }
}

// Flip a tile
function flip(evt: MouseEvent) {
  const target = evt.target as HTMLDivElement;
  const id = target.id
  const [, x, y] = id.split("_");
  const tile = resolve(parseInt(x), parseInt(y))

  if (!tile || tile.flipped) {
    return;
  }

  target.classList.remove("tile__masked");
  target.classList.add("tile__flipped");
}

setup(12, 12);

// @ts-ignore
window["flip"] = flip
