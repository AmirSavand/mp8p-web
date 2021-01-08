/**
 * Block inside a board inside a match.
 */
export interface Block {
  // Where its supposed to be. Unique ID inside the board.
  index: number;
  // Where it is now.
  position: number;
  // Is it an empty block/space?
  is_space: boolean;
}
