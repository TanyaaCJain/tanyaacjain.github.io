// ─── Lantern ambient glow ─────────────────────────────────────────────────────
// Soft warm gradient at the top — simulates sky full of Yi Peng lanterns
// complementing the floating particle lanterns.

export function drawLanternGlow(ctx, { W, H, alpha }) {
  const glow = ctx.createLinearGradient(0, 0, 0, H * 0.45);
  glow.addColorStop(0,   `rgba(245,158,11,${(alpha * 0.10).toFixed(3)})`);
  glow.addColorStop(0.5, `rgba(251,113,133,${(alpha * 0.04).toFixed(3)})`);
  glow.addColorStop(1,   'rgba(245,158,11,0)');
  ctx.globalAlpha = 1;
  ctx.fillStyle   = glow;
  ctx.fillRect(0, 0, W, H * 0.45);
}
