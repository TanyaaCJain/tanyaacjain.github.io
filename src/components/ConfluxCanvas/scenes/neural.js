import { rgbStr } from '../utils';

// ─── Formation ────────────────────────────────────────────────────────────────

export function formation(cx, cy, W, H) {
  const positions = [];
  const layers    = [8, 6, 6, 4];
  const xSpread   = Math.min(W * 0.55, 440);
  const ySpread   = Math.min(H * 0.55, 320);

  layers.forEach((count, li) => {
    const x = cx + (li / (layers.length - 1) - 0.5) * xSpread;
    for (let ni = 0; ni < count; ni++) {
      const y = cy + (ni / (count - 1) - 0.5) * ySpread;
      positions.push({ x, y, size: 3.5, colorIndex: li % 2 === 0 ? 0 : 1 });
    }
  });

  // Prominent input node
  positions.push({ x: cx - xSpread / 2, y: cy, size: 5, colorIndex: 2 });

  return positions;
}

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer() {}   // no background layer for this scene

// ─── Connector lines ──────────────────────────────────────────────────────────

export function drawConnectors(ctx, { alpha, particles }) {
  if (alpha < 0.04) return;
  ctx.save();

  ctx.globalAlpha = alpha * 0.22;
  const layers    = [8, 6, 6, 4];
  let   pStart    = 0;

  for (let li = 0; li < layers.length - 1; li++) {
    const countA = layers[li];
    const countB = layers[li + 1];

    for (let a = 0; a < countA; a++) {
      for (let b = 0; b < countB; b++) {
        const pa = particles[pStart + a];
        const pb = particles[pStart + countA + b];
        if (!pa || !pb) continue;
        ctx.strokeStyle = rgbStr(pa.color, 1);
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
    }
    pStart += countA;
  }

  ctx.restore();
}
