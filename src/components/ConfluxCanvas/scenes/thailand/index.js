import { drawLanternGlow } from './lanterns';
import { drawLion }        from './lion';

export { formation } from './formation';

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer(ctx, { W, H, alpha }) {
  if (alpha < 0.04) return;
  ctx.save();
  drawLanternGlow(ctx, { W, H, alpha });
  ctx.restore();
}

// ─── Connector lines — Thai Singha lion ───────────────────────────────────────

export function drawConnectors(ctx, { cx, cy, H, alpha, time }) {
  if (alpha < 0.04) return;
  drawLion(ctx, { cx, cy, H, alpha, time });
}
