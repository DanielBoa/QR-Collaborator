import { c, ctx } from './canvas';
import config from './config';

export function draw() {
  const { grid: { width, height } } = config;

  ctx.save();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const opacity = (((y * width) + x) % 2) ? 0.1 : 0.2;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(c(x), c(y), c(), c());
    }
  }

  ctx.restore();
}