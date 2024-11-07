import { useCallback, useEffect, useMemo, useState } from "react"
import { Board, Tile } from "../../common/model"
import { GameTile, GameTileMemo } from "./GameTile"

export function GameBoard() {
  const [size] = useState(12)
  const [bombs] = useState(12)
  const [tiles, setTiles] = useState<Tile[]>([])

  const board = useMemo(() => new Board(size, bombs), [])

  useEffect(
    () => setTiles(Object.values(board.tiles)),
    []
  )

  const flip = useCallback((x: number, y: number) => {
    board.flip(x, y)
    setTiles(Object.values({...board.tiles}))
  }, [board])

  return (
    <div
      id="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}>
        {
          tiles
            .map(t => <GameTile
              tile={t}
              key={t.key}
              flip={flip}/>)
        }
    </div>
  )
}
