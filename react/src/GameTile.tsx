import { Tile } from "../../common/model";
import React from "react";

export type GameTileProps = {
  tile: Tile,
  flip: (x: number, y: number) => void
}

export function GameTile({ tile, flip }: GameTileProps) {

  console.log(tile)

  return (
    <div
      className={`tile tile__${tile.label} tile__${tile.flipped ? 'flipped' : 'masked'}`}
      onClick={() => flip(tile.x, tile.y)}
    >
      <span>{ tile.label }</span>
    </div>
  )
}

export const GameTileMemo = React.memo(GameTile)
