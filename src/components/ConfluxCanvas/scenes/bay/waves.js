// ─── SF Bay water — scattered ripple clusters ─────────────────────────────────
// Same technique as the Vietnamese boat canvas ripples: each cluster is a small
// group of 3–4 sine-arc strokes centred on a scattered point in the water area.
// Deterministic positions (golden-ratio), no Math.random.

// ── Ripple cluster (mirrors drawWaterRipples from VietnameseBoatCanvas) ────────
function drawCluster(ctx, cx, cy, size, time, phase, alpha) {
  const LINES = 4;
  for (let l = 0; l < LINES; l++) {
    const spread    = size * (0.78 + l * 0.42);
    // Amplitude: visible gentle curve without drama
    const amp       = 1.8 + l * 1.0;
    // Freq: ~0.2–0.4 cycles across spread — elongated S-curve, not choppy
    const spatFreq  = 0.052 - l * 0.007;
    const tempSpeed = 0.00065 + l * 0.00016;
    const yBase     = cy + l * 3.0;
    const lAlpha    = (1 - l / LINES) * 0.52 * alpha;

    // Smooth bezier through sampled points
    const steps = 48;
    const pts   = [];
    for (let s = 0; s <= steps; s++) {
      const u  = s / steps;
      const px = cx - spread + u * spread * 2;
      const py = yBase + amp * Math.sin(spatFreq * (px - cx) - time * tempSpeed + phase + l * 0.88);
      pts.push([px, py]);
    }

    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 0; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
      const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
    ctx.strokeStyle = `rgba(105, 165, 210, ${lAlpha})`;
    ctx.lineWidth   = 0.6 + (1 - l / LINES) * 0.4;
    ctx.stroke();
  }
}

// ── Deterministic cluster layout ───────────────────────────────────────────────
// Golden-ratio scatter across the water area — no two clusters in the same spot.
const PHI = 0.618033;
const CLUSTERS = Array.from({ length: 11 }, (_, i) => ({
  xR:    (i * PHI)         % 1,                    // 0–1 across canvas width
  yR:    0.08 + (i * PHI * 1.618) % 0.82,          // 8–80% down the water span
  size:  18 + (i % 4) * 7,                          // 18 / 25 / 32 / 39 px
  phase: i * 2.618,
  speed: 0.0000 + (i % 3) * 0.0055,                // slow lateral drift speed
}));

export function drawWaves(ctx, { cx, W, H, alpha, time, roadY }) {
  if (alpha < 0.04) return;
  ctx.save();

  const waterTop  = roadY + H * 0.030;
  const waterSpan = (H - waterTop) * 0.80;

  ctx.lineCap = 'round';

  for (const c of CLUSTERS) {
    // Slow lateral drift — clusters gently move sideways, wrapping
    const driftX = (c.speed * time) % W;
    const rawX   = (c.xR * W + driftX) % W;

    const clusterX = rawX;
    const clusterY = waterTop + c.yR * waterSpan;

    // Fade clusters near the top and bottom edges of the water area
    const normY  = c.yR;
    const fade   = Math.min(normY / 0.10, 1) * Math.min((1 - normY) / 0.12, 1);
    const cAlpha = alpha * 0.72 * fade;
    if (cAlpha < 0.04) continue;

    drawCluster(ctx, clusterX, clusterY, c.size, time, c.phase, cAlpha);
  }

  // ── Bridge reflection — small ripple cluster centred under bridge ──────────
  const refClusterY = waterTop + waterSpan * 0.06;
  const pulse = 0.45 + 0.55 * Math.sin(time * 0.00035);
  drawCluster(ctx, cx, refClusterY, 28, time, 0, alpha * 0.35 * pulse);

  // Tint the reflection orange
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  // (The above won't work cross-element — instead just draw a second tinted pass)
  ctx.restore();

  const refLines = 3;
  for (let r = 0; r < refLines; r++) {
    const ry    = waterTop + r * H * 0.015;
    const rPulse= 0.5 + 0.5 * Math.sin(time * 0.00038 + r * 1.2);
    const rA    = alpha * (0.08 - r * 0.022) * rPulse;
    if (rA < 0.004) continue;
    const refW  = 26 - r * 4;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(192, 54, 44, ${rA})`;
    ctx.lineWidth   = 0.8 - r * 0.18;
    const steps = 22;
    for (let s = 0; s <= steps; s++) {
      const u  = s / steps;
      const px = cx - refW + u * refW * 2;
      const py = ry + 1.4 * Math.sin(0.048 * px - time * 0.00105 + r * 0.9);
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  ctx.restore();
}
