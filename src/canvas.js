import config from './config';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

let _scale = null;

// convert position to pixel value
export const c = (position = 1) => position * config.grid.blockSize;

export function setupSizes() {
  const { innerWidth: width, innerHeight: height } = window;
  const { grid: { width: gridWidth, height: gridHeight } } = config;

  _scale = width > height ? (height / c(gridHeight)) : (width / c(gridWidth));

  canvas.width = width;
  canvas.height = height;

  ctx.scale(_scale, _scale);
}

export function clear() {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, c(width), c(height));
}

export function startDrawing(drawFunc) {
  setupSizes();

  (function render() {
    const { width, height } = canvas;
    const { grid: { width: gridWidth, height: gridHeight } } = config;
    const xOffset = ((width / _scale) - c(gridWidth)) / 2;
    const yOffset = ((height / _scale) - c(gridHeight)) / 2;

    clear();

    ctx.save();
    ctx.translate(xOffset, yOffset);
    drawFunc();
    ctx.restore();

    requestAnimationFrame(render);
  })();
}

window.addEventListener('resize', setupSizes);