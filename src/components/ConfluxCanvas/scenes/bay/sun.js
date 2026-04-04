// ─── Diffused sunlight behind the Golden Gate ────────────────────────────────
// Sun sits low — just behind the bridge deck, not high above it.
// Render is deliberately soft/atmospheric: wide gradient bloom, no hard disc,
// faint broad rays, and a golden shimmer column on the water below.

import { geometry } from './geometry';

export function drawSun(ctx, { cx, cy, W, H, alpha, time }) {
  if (alpha < 0.04) return;
  ctx.save();

  const { roadY } = geometry(cx, cy, W, H);

  // Sun centre — low and to the right, partially behind the right tower
  const sunX = cx + W * 0.23;
  const sunY = roadY - H * 0.06;

  // ── 1. Wide diffused bloom — primary light source ──────────────────────────
  // Very large, very soft. Feels like sun breaking through SF haze.
  const bloom = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.72);
  bloom.addColorStop(0,    `rgba(255, 220, 110, ${alpha * 0.28})`);
  bloom.addColorStop(0.08, `rgba(245, 185,  65, ${alpha * 0.14})`);
  bloom.addColorStop(0.22, `rgba(220, 140,  35, ${alpha * 0.07})`);
  bloom.addColorStop(0.45, `rgba(185,  95,  18, ${alpha * 0.03})`);
  bloom.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Soft broad rays — barely visible, just a suggestion ────────────────
  // Wide, low-alpha wedges. No sharp edges — diffused like light through fog.
  const RAY_ANGLES = [-1.2, -0.75, -0.38, 0, 0.38, 0.75, 1.2];
  const RAY_LEN    = H * 1.1;

  for (let r = 0; r < RAY_ANGLES.length; r++) {
    const base  = RAY_ANGLES[r] + Math.PI / 2;
    const halfW = 0.055 + (r % 2) * 0.030;
    const pulse = 0.45 + 0.55 * Math.sin(time * 0.00018 + r * 1.4);
    const rAlpha = alpha * (0.028 - Math.abs(RAY_ANGLES[r]) * 0.008) * pulse;
    if (rAlpha < 0.003) continue;

    const x1 = sunX + Math.cos(base - halfW) * RAY_LEN;
    const y1 = sunY + Math.sin(base - halfW) * RAY_LEN;
    const x2 = sunX + Math.cos(base + halfW) * RAY_LEN;
    const y2 = sunY + Math.sin(base + halfW) * RAY_LEN;
    const mx  = sunX + Math.cos(base) * RAY_LEN;
    const my  = sunY + Math.sin(base) * RAY_LEN;

    const g = ctx.createLinearGradient(sunX, sunY, mx, my);
    g.addColorStop(0,   `rgba(255, 215, 95, ${rAlpha})`);
    g.addColorStop(0.25,`rgba(240, 175, 50, ${rAlpha * 0.45})`);
    g.addColorStop(1,   'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
  }

  ctx.restore();
}
