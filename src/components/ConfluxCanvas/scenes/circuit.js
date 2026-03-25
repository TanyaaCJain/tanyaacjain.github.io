import { rgbStr } from '../utils';
import { AMBIENT_START } from '../constants';

// ─── Formation ────────────────────────────────────────────────────────────────

export function formation(cx, cy, W, H) {
  const positions = [];
  const cols = 9;
  const rows = 6;
  const gapX = Math.min(56, (W * 0.75) / cols);
  const gapY = Math.min(52, (H * 0.65) / rows);
  const offX = cx - (cols - 1) * gapX / 2;
  const offY = cy - (rows - 1) * gapY / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isNode = Math.random() < 0.45;
      positions.push({
        x:          offX + c * gapX,
        y:          offY + r * gapY,
        size:       isNode ? 4 : 2,
        colorIndex: isNode ? 0 : 1,
        isNode,
      });
    }
  }

  return positions;
}

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer() {}   // no background layer for this scene

// ─── Connector lines ──────────────────────────────────────────────────────────

export function drawConnectors(ctx, { alpha, particles }) {
  if (alpha < 0.04) return;
  ctx.save();

  ctx.globalAlpha = alpha * 0.30;
  ctx.lineWidth   = 1.2;

  const cols = 9;
  const rows = 6;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const idxA = r * cols + c;
      const idxB = r * cols + c + 1;
      if (idxA >= AMBIENT_START || idxB >= AMBIENT_START) continue;
      const pa = particles[idxA];
      const pb = particles[idxB];
      if (!pa.isNode || !pb.isNode) continue;
      ctx.strokeStyle = rgbStr(pa.color, 1);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
  }

  ctx.restore();
}
