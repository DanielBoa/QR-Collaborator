import { c, ctx } from './canvas';

export default class Piece {
  constructor(shape = [], x = 0, y = 0) {
    this.isInteractive = true;
    this.shape = shape;
    this.pos = { x, y };
  }

  draw() {
    const { shape, pos } = this;

    ctx.save();
    ctx.translate(c(pos.x), c(pos.y)); 

    for (let y = 0; y < this.height; y++) {
      let row = shape[y];

      for (let x = 0; x < this.width; x++) {
        const isBlack = (row[x] === 1);

        ctx.fillStyle = isBlack ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(c(x), c(y), c(), c());
      }
    }

    ctx.restore();
  }

  set x(x) {
    this.pos.x = x;
  }

  set y(y) {
    this.pos.y = y;
  }

  get x() {
    return this.pos.x;
  }

  get y() {
    return this.pos.y;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  get left() {
    return this.x;
  }

  get height() {
    return this.shape.length;
  }

  get width() {
    return !this.shape.length ? 0 : this.shape[0].length;
  }
}