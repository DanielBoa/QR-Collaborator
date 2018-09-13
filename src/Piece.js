import { ctx } from './canvas';

export default class Piece {
  constructor(shape = [], x = 0, y = 0) {
    this.isInteractive = true;
    this.isBeingDragged = false;
    this.shape = shape;
    this.pos = { x, y };
    this.dragPos =  { x: 0, y: 0 };
  }

  draw() {
    const { shape, pos, dragPos, isBeingDragged, width, height } = this;
    const x = pos.x + dragPos.x;
    const y = pos.y + dragPos.y;

    ctx.save();
    ctx.translate(x, y);

    if (isBeingDragged) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(0, 0, width, height);
    }

    for (let y = 0; y < height; y++) {
      let row = shape[y];

      for (let x = 0; x < width; x++) {
        const isBlack = (row[x] === 1);

        ctx.fillStyle = isBlack ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(x, y, 1, 1);
      }
    }

    ctx.restore();
  }

  pointerDown() {

  }

  pointerUp() {

  }

  pointerDragEnd() {
    const { dragPos } = this;

    this.isBeingDragged = false;
    this.x = this.x + Math.round(dragPos.x);
    this.y = this.y + Math.round(dragPos.y);
    this.dragPos.x = 0;
    this.dragPos.y = 0;
  }

  pointerDrag(dragPos) {
    this.isBeingDragged = true;
    this.dragPos.x = dragPos.x;
    this.dragPos.y = dragPos.y;
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