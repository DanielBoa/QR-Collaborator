const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gridWidth = 29;
const gridHeight = 29;
let scale = null;
const blockSize = 1;
const pieces = [];

function updateSizes() {
  const { innerWidth: width, innerHeight: height } = window;
  
  scale = width > height ? (height / gridHeight) : (width / gridWidth);

  canvas.width = width;
  canvas.height = height;

  ctx.scale(scale, scale);
}

function drawBoard() {
  const { width, height } = canvas;
  const xOffset = ((width / scale) - gridWidth) / 2;
  const yOffset = ((height / scale) - gridHeight) / 2;

  ctx.save();
  ctx.translate(xOffset, yOffset);

  for (let y = 0; y <= gridHeight; y++) {
    for (let x = 0; x <= gridWidth; x++) {
      const opacity = (((y * gridWidth) + x) % 2) ? 0.2 : 0.5;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }

  ctx.restore();
}

function draw() {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  drawBoard();

  requestAnimationFrame(draw);
}

function setup() {
  updateSizes();

  window.addEventListener('resize', updateSizes);

  requestAnimationFrame(draw);
}

setup();