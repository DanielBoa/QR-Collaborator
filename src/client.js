const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gridWidth = 29;
const gridHeight = 29;
let scale = null;
const blockSize = 10000;
const pieces = [];

class Piece {
  constructor(shape) {
    this.shape = shape;
    this.pos = { x: 0, y: 0 };
  }

  draw() {
    const { shape, pos } = this;

    ctx.save();
    ctx.translate(c(pos.x), c(pos.y)); 

    for (let y = 0; y < shape.length; y++) {
      row = shape[y];

      for (let x = 0; x < row.length; x++) {
        ctx.fillStyle = `rgba(${(row[x] === 1) ? '0,0,0' : '255,255,255'}, 0.9)`;
        ctx.fillRect(c(x), c(y), c(), c());
      }
    }

    ctx.restore();
  }
}

// convert position to pixel value
const c = (position = 1) => position * blockSize;

function resizeHandler() {
  const { innerWidth: width, innerHeight: height } = window;
  
  scale = width > height ? (height / c(gridHeight)) : (width / c(gridWidth));

  canvas.width = width;
  canvas.height = height;

  ctx.scale(scale, scale);
}

function clearCanvas() {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, c(width), c(height));
}

function drawBoard() {
  ctx.save();

  for (let y = 0; y <= gridHeight; y++) {
    for (let x = 0; x <= gridWidth; x++) {
      const opacity = (((y * gridWidth) + x) % 2) ? 0.1 : 0.2;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(c(x), c(y), c(), c());
    }
  }

  ctx.restore();
}

function draw() {
  clearCanvas();

  const { width, height } = canvas;
  const xOffset = ((width / scale) - c(gridWidth)) / 2;
  const yOffset = ((height / scale) - c(gridHeight)) / 2;

  ctx.save();
  ctx.translate(xOffset, yOffset);

  drawBoard();

  for (let piece of pieces) {
    piece.draw();
  }

  ctx.restore();

  requestAnimationFrame(draw); 
}

function setup() {
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

  resizeHandler();

  window.addEventListener('resize', resizeHandler);

  requestAnimationFrame(draw);
}

setup();