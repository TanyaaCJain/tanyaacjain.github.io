export function drawHills(ctx, { W, H, alpha, roadY, towerX_L, towerX_R }) {
  // Smooth sine-arc ridge — rises from zero at the outer edge, peaks ~halfway, returns near roadY at tower
  const leftRidgeY  = (x) => roadY - H * 0.09 * Math.sin((x / towerX_L) * Math.PI * 0.88);
  const rightRidgeY = (x) => roadY - H * 0.11 * Math.sin(((W - x) / (W - towerX_R)) * Math.PI * 0.88);

  const SPIKE_WIDTH  = 10;           // treeline spike width (px)
  const SPIKE_HEIGHT = H * 0.018;    // treeline spike height

  // ── Hill body — gradient fades to transparent below road so slant blends ───
  ctx.globalAlpha = alpha * 0.65;
  const hillGrad = ctx.createLinearGradient(0, roadY, 0, H);
  hillGrad.addColorStop(0,    'rgba(10, 16, 13, 1)');
  hillGrad.addColorStop(0.15, 'rgba(10, 16, 13, 0.6)');
  hillGrad.addColorStop(1,    'rgba(10, 16, 13, 0)');
  ctx.fillStyle = hillGrad;

  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= towerX_L; x += 4) ctx.lineTo(x, leftRidgeY(x));
  ctx.lineTo(towerX_L, roadY); ctx.lineTo(0, H); ctx.fill();

  ctx.beginPath();
  ctx.moveTo(W, H);
  for (let x = W; x >= towerX_R; x -= 4) ctx.lineTo(x, rightRidgeY(x));
  ctx.lineTo(towerX_R, roadY); ctx.lineTo(W, H); ctx.fill();

  // ── Treeline crown — serrated silhouette layered on top of the body ────────
  ctx.globalAlpha = alpha * 0.50;
  ctx.fillStyle   = 'rgba(16, 26, 20, 1)';

  // Left treeline
  ctx.beginPath();
  ctx.moveTo(0, leftRidgeY(0));
  for (let x = 0; x < towerX_L - SPIKE_WIDTH; x += SPIKE_WIDTH) {
    const spikeHeight = SPIKE_HEIGHT * (0.55 + 0.45 * Math.abs(Math.sin(x * 0.14)));
    ctx.lineTo(x + SPIKE_WIDTH * 0.42, leftRidgeY(x + SPIKE_WIDTH * 0.42) - spikeHeight);
    ctx.lineTo(x + SPIKE_WIDTH,        leftRidgeY(x + SPIKE_WIDTH));
  }
  ctx.lineTo(towerX_L, roadY); ctx.lineTo(0, roadY); ctx.fill();

  // Right treeline
  ctx.beginPath();
  ctx.moveTo(W, rightRidgeY(W));
  for (let x = W; x > towerX_R + SPIKE_WIDTH; x -= SPIKE_WIDTH) {
    const spikeHeight = SPIKE_HEIGHT * (0.55 + 0.45 * Math.abs(Math.sin(x * 0.14)));
    ctx.lineTo(x - SPIKE_WIDTH * 0.42, rightRidgeY(x - SPIKE_WIDTH * 0.42) - spikeHeight);
    ctx.lineTo(x - SPIKE_WIDTH,        rightRidgeY(x - SPIKE_WIDTH));
  }
  ctx.lineTo(towerX_R, roadY); ctx.lineTo(W, roadY); ctx.fill();
}
