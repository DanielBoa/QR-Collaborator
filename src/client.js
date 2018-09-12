import * as canvas from './canvas';
import * as board from './board';
import Piece from './Piece';

const pieces = [];

pieces.push(
  new Piece([
    [1,0,1,1,0,1,1],
    [1,1,0,1,1,0,0],
    [1,0,1,0,1,1,1],
    [1,1,0,1,0,1,1],
    [0,0,0,1,0,0,0],
    [1,1,0,0,0,0,0],
    [0,1,0,0,0,0,0],
  ]),
);

canvas.startDrawing(() => {
  board.draw();

  for (let piece of pieces) {
    piece.draw();
  }
});