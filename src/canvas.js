import config from './config';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

const _items = [];
let _scale = null;
let _gridOffset = { x: 0, y: 0 };
let _startPointerPos = null;
let _dragging = null;

//  convert grid position to pixel value
export const c = (position = 1) => position;

//  convert pixel to grid position (relative to grid)
export const pixelToGridPos = ({ x, y } = { x: 0, y: 0 }) => {
  return {
    x: (x / _scale) - _gridOffset.x,
    y: (y / _scale) - _gridOffset.y,
  };
};

//  set the pixel width/height of the canvas as well as the global scale value
export function setupSizes() {
  const { innerWidth: width, innerHeight: height } = window;
  const { grid: { width: gridWidth, height: gridHeight } } = config;
  
  _scale = width > height ? (height / c(gridHeight)) : (width / c(gridWidth));
  _gridOffset.x = ((width / _scale) - c(gridWidth)) / 2;
  _gridOffset.y = ((height / _scale) - c(gridHeight)) / 2;

  canvas.width = width;
  canvas.height = height;
}

//  clear the canvas
export function clear() {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, c(width), c(height));
}

//  start drawing loop using requestAnimationFrame
export function startDrawing() {
  setupSizes();

  //  draw all items relative to the grid
  (function draw() {
    clear();

    ctx.save();
    ctx.scale(_scale, _scale);
    ctx.translate(_gridOffset.x, _gridOffset.y);
  
    for (const item of _items) {
      if (typeof item.draw === 'function') item.draw();
    } 

    ctx.restore();

    requestAnimationFrame(draw);
  })();
}

//  add an item to be drawn
export function add(item) {
  _items.push(item);
}

export function findInteractiveItemAtPos(pos) {
  for (let i = _items.length - 1; i >= 0; i--) {
    const item = _items[i];

    if (!item.isInteractive) continue;

    const { top, right, bottom, left } = item;
    const { x, y } = pixelToGridPos(pos);
 
    if ((x > left && x < right) && (y > top && y < bottom)) {
      return item;
    }
  }

  return null;
}

canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();

  const item = findInteractiveItemAtPos(e);

  _startPointerPos = pixelToGridPos(e);

  if (!item) return;

  if (item.pointerDown) item.pointerDown();

  _dragging = item;
});

canvas.addEventListener('pointermove', (e) => {
  e.preventDefault();

  if (!_dragging) return;

  const newPointerPos = pixelToGridPos(e);
  const draggedDistance = {
    x: newPointerPos.x - _startPointerPos.x,
    y: newPointerPos.y - _startPointerPos.y,
  };

  if (_dragging.pointerDrag) _dragging.pointerDrag(draggedDistance);
});

canvas.addEventListener('pointerup', (e) => {
  e.preventDefault();

  const item = findInteractiveItemAtPos(e);

  if (_dragging) {
    if (_dragging.pointerDragEnd) _dragging.pointerDragEnd();
    _dragging = null;
  }

  if (item) {
    if (item.pointerUp) item.pointerUp();
  }
});

window.addEventListener('resize', setupSizes);