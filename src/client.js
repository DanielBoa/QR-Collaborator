import * as canvas from './canvas';
import * as board from './board';
import Piece from './Piece';

const pieces = [
  new Piece([
    [1,0,1,1,0,1,1],
    [1,1,0,1,1,0,0],
    [1,0,1,0,1,1,1],
    [1,1,0,1,0,1,1],
    [0,0,0,1,0,0,0],
    [1,1,0,0,0,0,0],
    [0,1,0,0,0,0,0],
  ]),
];

canvas.add(board);

for (let piece of pieces) {
  canvas.add(piece);
}

canvas.startDrawing();