import { c, ctx } from './canvas';

export default class Piece {
  constructor(shape) {
    this.shape = shape;
    this.pos = { x: 0, y: 0 };
  }

  draw() {
    const { shape, pos } = this;

    ctx.save();
    ctx.translate(c(pos.x), c(pos.y)); 

    for (let y = 0; y < shape.length; y++) {
      let row = shape[y];

      for (let x = 0; x < row.length; x++) {
        const isBlack = (row[x] === 1);

        ctx.fillStyle = isBlack ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(c(x), c(y), c(), c());
      }
    }

    ctx.restore();
  }
}