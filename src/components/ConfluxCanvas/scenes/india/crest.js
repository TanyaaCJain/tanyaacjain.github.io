import { tearPath } from './feather';

// ─── Crest pegs ───────────────────────────────────────────────────────────────
// 5 animated stems with miniature teardrop tips, swaying with the feather fan.

export function drawCrest(ctx, { cx, fanAy, H, alpha, time }) {
  ctx.save();

  const rootX      = cx;
  const rootY      = fanAy + H * 0.04;
  const crestCount = 5;
  const baseSway   = 0.10 * Math.sin(time * 0.00055);   // matches feather spread frequency

  for (let c = 0; c < crestCount; c++) {
    const shimmer = 0.5 + 0.5 * Math.sin(time * 0.0009 + c * 0.70);
    const sway    = baseSway + 0.03 * Math.sin(time * 0.0009 + c * 0.70);
    const cA      = -Math.PI / 2 + (c - (crestCount - 1) / 2) * 0.28 + sway;
    const cLen    = H * (0.050 + Math.abs(c - 2) * 0.004);
    const ex      = rootX + Math.cos(cA) * cLen;
    const ey      = rootY + Math.sin(cA) * cLen;

    // Stem
    ctx.globalAlpha = alpha * (0.40 + shimmer * 0.25);
    ctx.strokeStyle = 'rgba(6,145,108,1)';
    ctx.lineWidth   = 0.6;
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Tip — miniature teardrop oriented along stem
    ctx.save();
    ctx.translate(ex, ey);
    ctx.rotate(cA);
    const tr = H * 0.009;
    ctx.globalAlpha = alpha * (0.65 + shimmer * 0.22);
    ctx.fillStyle   = 'rgba(22,130,80,1)';
    tearPath(ctx, tr, tr * 0.72);
    ctx.fill();
    ctx.globalAlpha = alpha * (0.80 + shimmer * 0.18);
    ctx.fillStyle   = 'rgba(6,182,212,1)';
    tearPath(ctx, tr * 0.52, tr * 0.38);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.92;
    ctx.fillStyle   = 'rgba(4,6,18,1)';
    tearPath(ctx, tr * 0.24, tr * 0.18);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}
