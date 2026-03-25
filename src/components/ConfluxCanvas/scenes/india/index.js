import { fanGeometry, STEM }                    from './geometry';
import { drawFeather, drawEye }                  from './feather';
import { drawCrest }                             from './crest';
import { drawJasmineVines, drawFallingParijat }  from './flowers';

export { formation, tickFormation } from './formation';

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer(ctx, { cx, cy, W, H, alpha, time }) {
  if (alpha < 0.04) return;
  ctx.save();

  const { fanAy } = fanGeometry(cy, H, time);

  // Pulsing iridescent halo behind the fan
  const pulse = 0.5 + 0.5 * Math.sin(time * 0.00065);
  const halo  = ctx.createRadialGradient(cx, fanAy, H * 0.04, cx, fanAy, H * 0.36);
  halo.addColorStop(0,    `rgba(6,182,212,${(0.06 + pulse * 0.04).toFixed(3)})`);
  halo.addColorStop(0.55, `rgba(34,197,94,${(0.03 + pulse * 0.02).toFixed(3)})`);
  halo.addColorStop(1,    'rgba(6,182,212,0)');
  ctx.globalAlpha = alpha;
  ctx.fillStyle   = halo;
  ctx.beginPath();
  ctx.arc(cx, fanAy, H * 0.36, 0, Math.PI * 2);
  ctx.fill();

  drawCrest(ctx, { cx, fanAy, H, alpha, time });
  drawJasmineVines(ctx, { W, H, alpha, time });
  drawFallingParijat(ctx, { W, H, alpha, time });

  ctx.restore();
}

// ─── Connector lines (feathers + eyes) ────────────────────────────────────────

export function drawConnectors(ctx, { cx, cy, H, alpha, time }) {
  if (alpha < 0.04) return;
  ctx.save();

  const { fanAy, spread, rOuter, rInner } = fanGeometry(cy, H, time);
  const EYE_T = 0.76;   // eye sits 76% along the vane; tip extends naturally past it

  for (let k = 0; k < STEM; k++) {
    const angleDeg = -95 + k * (spread / (STEM - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const shimmer  = 0.5 + 0.5 * Math.sin(time * 0.0009 + k * 0.70);

    const tipX  = cx    + rOuter * Math.cos(angleRad);
    const tipY  = fanAy + rOuter * Math.sin(angleRad);
    const baseX = cx    + rInner * Math.cos(angleRad);
    const baseY = fanAy + rInner * Math.sin(angleRad);

    drawFeather(ctx, baseX, baseY, tipX, tipY, rOuter - rInner, alpha, shimmer);

    const eyeRad = rInner + EYE_T * (rOuter - rInner);
    drawEye(
      ctx,
      cx    + eyeRad * Math.cos(angleRad),
      fanAy + eyeRad * Math.sin(angleRad),
      angleRad,
      (rOuter - rInner) * 0.13,
      alpha,
      shimmer,
    );
  }

  ctx.restore();
}
