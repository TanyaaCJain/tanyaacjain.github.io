import { rgbStr } from '../utils';
import { AMBIENT_START } from '../constants';

// ─── Potential-flow streamlines ───────────────────────────────────────────────

function computeStreamlines(cx, cy, W, H) {
  const R          = W * 0.16;
  const U          = 1.0;
  const numLines   = 18;
  const ptsPerLine = 60;
  const step       = 7;

  const velAt = (x, y) => {
    const dx = x - cx;
    const dy = y - cy;
    const r2 = dx * dx + dy * dy;
    if (r2 < R * R * 1.1) return { vx: 0, vy: 0 };
    const R2 = R * R;
    return {
      vx: U * (1 - R2 * (dx * dx - dy * dy) / (r2 * r2)),
      vy: -U * 2 * R2 * dx * dy / (r2 * r2),
    };
  };

  const streamlines = [];
  for (let li = 0; li < numLines; li++) {
    const yOff = (-H * 0.30) + (li / (numLines - 1)) * H * 0.60;
    if (Math.abs(yOff) < H * 0.012) { streamlines.push([]); continue; }

    const pts = [];
    let x = cx - W * 0.44;
    let y = cy + yOff;

    for (let k = 0; k < ptsPerLine; k++) {
      pts.push({ x, y });
      const { vx, vy } = velAt(x, y);
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.01) { x += step; continue; }
      x += (vx / speed) * step;
      y += (vy / speed) * step;
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy < R * R * 1.08 || x > cx + W * 0.46) break;
    }
    streamlines.push(pts.length > 3 ? pts : []);
  }
  return streamlines;
}

// ─── Formation ────────────────────────────────────────────────────────────────

export function formation(cx, cy, W, H) {
  const streamlines = computeStreamlines(cx, cy, W, H);
  const validLines  = streamlines.filter(l => l.length > 3);
  const numLines    = validLines.length;
  const batchSize   = Math.ceil(AMBIENT_START / numLines);
  const positions   = [];

  for (let i = 0; i < AMBIENT_START; i++) {
    const lineIdx        = i % numLines;
    const line           = validLines[lineIdx];
    const phase          = (i % batchSize) / batchSize;
    const ptIdx          = Math.floor(phase * line.length);
    const pt             = line[ptIdx] || line[0];
    const distFromCenter = Math.abs(lineIdx / (numLines - 1) - 0.5) * 2;

    positions.push({
      x:             pt?.x ?? cx,
      y:             pt?.y ?? cy,
      size:          1.8 + distFromCenter * 0.5,
      colorIndex:    distFromCenter > 0.5 ? 0 : distFromCenter > 0.2 ? 2 : 1,
      isStreaming:   true,
      streamLineIdx: lineIdx,
      streamPhase:   phase,
      phaseSpeed:    0.006 + distFromCenter * 0.005,
      validLines,
    });
  }

  return positions;
}

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer(ctx, { cx, cy, W, H, alpha }) {
  if (alpha < 0.04) return;
  ctx.save();

  const carW = W * 0.32;
  const carH = H * 0.13;
  const carX = cx - carW / 2;
  const carY = cy - carH * 0.45;

  // Speed-wash gradient
  ctx.globalAlpha = alpha * 0.06;
  const wash = ctx.createLinearGradient(carX - carW * 0.3, cy, carX + carW * 1.3, cy);
  wash.addColorStop(0,    'rgba(223,169,20,0)');
  wash.addColorStop(0.28, 'rgba(223,169,20,0.8)');
  wash.addColorStop(0.5,  'rgba(223,169,20,0)');
  wash.addColorStop(0.72, 'rgba(223,169,20,0.8)');
  wash.addColorStop(1,    'rgba(223,169,20,0)');
  ctx.fillStyle = wash;
  ctx.fillRect(carX - carW * 0.3, cy - carH, carW * 1.6, carH * 2);

  // Sedan side-profile silhouette
  ctx.globalAlpha = alpha * 0.11;
  ctx.strokeStyle = 'rgba(226,232,240,1)';
  ctx.lineWidth   = 1.2;
  ctx.beginPath();
  ctx.moveTo(           carX + carW * 0.09, carY + carH);
  ctx.lineTo(           carX + carW * 0.91, carY + carH);
  ctx.quadraticCurveTo( carX + carW * 0.97, carY + carH,       carX + carW,        carY + carH * 0.68);
  ctx.lineTo(           carX + carW * 0.84, carY + carH * 0.28);
  ctx.quadraticCurveTo( carX + carW * 0.76, carY,              carX + carW * 0.64, carY + carH * 0.12);
  ctx.lineTo(           carX + carW * 0.37, carY + carH * 0.12);
  ctx.quadraticCurveTo( carX + carW * 0.24, carY,              carX + carW * 0.17, carY + carH * 0.28);
  ctx.lineTo(           carX + carW * 0.05, carY + carH * 0.64);
  ctx.quadraticCurveTo( carX,               carY + carH * 0.82, carX + carW * 0.09, carY + carH);
  ctx.stroke();

  // Wheel arches
  ctx.beginPath();
  ctx.arc(carX + carW * 0.24, carY + carH, carH * 0.20, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(carX + carW * 0.77, carY + carH, carH * 0.20, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// ─── Connector lines ──────────────────────────────────────────────────────────

export function drawConnectors(ctx, { cx, cy, W, H, alpha, scene }) {
  if (alpha < 0.04) return;
  ctx.save();
  // Faint body ellipse — the drawLayer car silhouette supersedes this visually
  ctx.globalAlpha = alpha * 0.06;
  ctx.lineWidth   = 1;
  ctx.strokeStyle = rgbStr(scene.secondaryColor, 1);
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.16, H * 0.07, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}
