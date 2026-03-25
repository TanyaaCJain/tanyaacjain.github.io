import { geometry } from './geometry';
import { drawFog } from './fog';
import { drawHills } from './hills';
import { drawCityLights } from './cityLights';
import { drawTraffic } from './traffic';

export { formation } from './formation';
export { drawConnectors } from './connectors';

export function drawLayer(ctx, { cx, cy, W, H, alpha, time }) {
  if (alpha < 0.04) return;
  ctx.save();

  const { towerX_L, towerX_R, roadY, anchorX_L, anchorX_R } = geometry(cx, cy, W, H);

  drawFog(ctx, { W, H, alpha, time });
  drawHills(ctx, { W, H, alpha, roadY, towerX_L, towerX_R });
  drawCityLights(ctx, { W, H, alpha, time, roadY });
  drawTraffic(ctx, { alpha, time, roadY, anchorX_L, anchorX_R });

  ctx.restore();
}
