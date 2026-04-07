// ─── SF Bay water — scattered ripple clusters ─────────────────────────────────
// Same technique as the Vietnamese boat canvas ripples: each cluster is a small
// group of 3–4 sine-arc strokes centred on a scattered point in the water area.
// Deterministic positions (golden-ratio), no Math.random.

// Shared mutable point buffer — reused each drawCluster call to avoid heap allocation.
// steps=48 → 49 points × 2 floats. 50*2 = 100 slots is sufficient.
const pointsBuffer = new Float32Array(50 * 2);

// ── Ripple cluster (mirrors drawWaterRipples from VietnameseBoatCanvas) ────────
function drawCluster(ctx, cx, cy, size, time, phase, alpha) {
  const LINE_COUNT = 4;
  for (let layerIdx = 0; layerIdx < LINE_COUNT; layerIdx++) {
    const spread           = size * (0.78 + layerIdx * 0.42);
    // Amplitude: visible gentle curve without drama
    const amplitude        = 1.8 + layerIdx * 1.0;
    // Freq: ~0.2–0.4 cycles across spread — elongated S-curve, not choppy
    const spatialFrequency = 0.052 - layerIdx * 0.007;
    const temporalSpeed    = 0.00065 + layerIdx * 0.00016;
    const yBase            = cy + layerIdx * 3.0;
    const layerAlpha       = (1 - layerIdx / LINE_COUNT) * 0.52 * alpha;

    // Smooth bezier through sampled points — write into shared buffer (no allocation)
    const STEP_COUNT = 48;
    for (let stepIdx = 0; stepIdx <= STEP_COUNT; stepIdx++) {
      const normalizedT = stepIdx / STEP_COUNT;
      const px = cx - spread + normalizedT * spread * 2;
      pointsBuffer[stepIdx * 2]     = px;
      pointsBuffer[stepIdx * 2 + 1] = yBase + amplitude * Math.sin(spatialFrequency * (px - cx) - time * temporalSpeed + phase + layerIdx * 0.88);
    }

    ctx.beginPath();
    ctx.moveTo(pointsBuffer[0], pointsBuffer[1]);
    for (let i = 0; i < STEP_COUNT; i++) {
      const i2  = i * 2;
      const midX = (pointsBuffer[i2] + pointsBuffer[i2 + 2]) * 0.5;
      const midY = (pointsBuffer[i2 + 1] + pointsBuffer[i2 + 3]) * 0.5;
      ctx.quadraticCurveTo(pointsBuffer[i2], pointsBuffer[i2 + 1], midX, midY);
    }
    ctx.lineTo(pointsBuffer[STEP_COUNT * 2], pointsBuffer[STEP_COUNT * 2 + 1]);
    ctx.strokeStyle = `rgba(105, 165, 210, ${layerAlpha})`;
    ctx.lineWidth   = 0.6 + (1 - layerIdx / LINE_COUNT) * 0.4;
    ctx.stroke();
  }
}

// ── Deterministic cluster layout ───────────────────────────────────────────────
// Golden-ratio scatter across the water area — no two clusters in the same spot.
const PHI = 0.618033;
const CLUSTERS = Array.from({ length: 11 }, (_, i) => ({
  xRatio: (i * PHI)         % 1,                    // 0–1 across canvas width
  yRatio: 0.08 + (i * PHI * 1.618) % 0.82,          // 8–80% down the water span
  size:   18 + (i % 4) * 7,                          // 18 / 25 / 32 / 39 px
  phase:  i * 2.618,
  speed:  0.0000 + (i % 3) * 0.0055,                // slow lateral drift speed
}));

export function drawWaves(ctx, { cx, W, H, alpha, time, roadY }) {
  if (alpha < 0.04) return;
  ctx.save();

  const waterTop  = roadY + H * 0.030;
  const waterSpan = (H - waterTop) * 0.80;

  ctx.lineCap = 'round';

  for (const c of CLUSTERS) {
    // Slow lateral drift — clusters gently move sideways, wrapping
    const driftX   = (c.speed * time) % W;
    const clusterX = (c.xRatio * W + driftX) % W;
    const clusterY = waterTop + c.yRatio * waterSpan;

    // Fade clusters near the top and bottom edges of the water area
    const edgeFade = Math.min(c.yRatio / 0.10, 1) * Math.min((1 - c.yRatio) / 0.12, 1);
    const clusterAlpha = alpha * 0.72 * edgeFade;
    if (clusterAlpha < 0.04) continue;

    drawCluster(ctx, clusterX, clusterY, c.size, time, c.phase, clusterAlpha);
  }

  // ── Bridge reflection — small ripple cluster centred under bridge ──────────
  const reflectionY   = waterTop + waterSpan * 0.06;
  const reflectPulse  = 0.45 + 0.55 * Math.sin(time * 0.00035);
  drawCluster(ctx, cx, reflectionY, 28, time, 0, alpha * 0.35 * reflectPulse);

  // Orange bridge-colour reflection lines just below the bridge deck
  const REFLECTION_LINE_COUNT = 3;
  for (let lineIdx = 0; lineIdx < REFLECTION_LINE_COUNT; lineIdx++) {
    const lineY       = waterTop + lineIdx * H * 0.015;
    const linePulse   = 0.5 + 0.5 * Math.sin(time * 0.00038 + lineIdx * 1.2);
    const lineAlpha   = alpha * (0.08 - lineIdx * 0.022) * linePulse;
    if (lineAlpha < 0.004) continue;

    const lineHalfWidth = 26 - lineIdx * 4;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(192, 54, 44, ${lineAlpha})`;
    ctx.lineWidth   = 0.8 - lineIdx * 0.18;
    const STEP_COUNT = 22;
    for (let stepIdx = 0; stepIdx <= STEP_COUNT; stepIdx++) {
      const normalizedT = stepIdx / STEP_COUNT;
      const px = cx - lineHalfWidth + normalizedT * lineHalfWidth * 2;
      const py = lineY + 1.4 * Math.sin(0.048 * px - time * 0.00105 + lineIdx * 0.9);
      stepIdx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  ctx.restore();
}
