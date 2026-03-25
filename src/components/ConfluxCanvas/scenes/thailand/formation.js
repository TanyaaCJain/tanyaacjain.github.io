// ─── Yi Peng lantern formation ────────────────────────────────────────────────
//
// Particle layout  (total 210 = AMBIENT_START):
//   0–84    left rising stream   (85)
//   85–169  right rising stream  (85)
//   170–209 scattered ambient    (40)
//
// All particles use isFloating so they drift upward autonomously.
// Left/right streams are seeded at the matching side of the canvas so the
// columns stay dense at scene start; after individual resets they spread
// somewhat but density in each stream column remains higher than average.

// Warm lantern colours — amber core, occasional rose-gold accent
const AMBER      = [245, 158,  11];
const BRIGHT     = [255, 210,  70];
const ROSE_GOLD  = [251, 140,  60];

function _lanternColor(i) {
  const r = (i * 2654435761) >>> 0;            // fast cheap hash
  const t = (r & 0xff) / 255;
  if (t < 0.55) return AMBER;
  if (t < 0.80) return BRIGHT;
  return ROSE_GOLD;
}

export function formation(cx, cy, W, H) {
  const positions = [];

  // ── Stream factory ─────────────────────────────────────────────────────────
  // Produces `n` floating particles forming a vertical column.
  // xCenter: horizontal center of the column
  // xSpread: ±spread around center
  // swayDir: +1 or -1 to bias the sway direction slightly
  function _stream(n, xCenter, xSpread, swayDir) {
    for (let i = 0; i < n; i++) {
      // Pseudo-random but deterministic spread within the column
      const hash  = (i * 1664525 + 1013904223) >>> 0;
      const rand  = (hash & 0xffff) / 0xffff;     // 0..1

      // Stagger y over 2× canvas height so the stream looks continuous
      // from bottom off-screen up through the top
      const y = H + 20 - (i / n) * (H + 40) * 2;

      const x = xCenter + (rand - 0.5) * 2 * xSpread;

      // Size varies for depth — some big lanterns, many small
      const size = 2.2 + (rand < 0.25 ? 1.8 : rand < 0.60 ? 0.8 : 0);

      // Sway: gentle oscillation, biased toward the outside of the stream
      const swayAmp  = 6 + rand * 10;
      const swayFreq = 0.0018 + rand * 0.0012;
      const swayPhase = rand * Math.PI * 2;

      positions.push({
        x, y,
        size,
        isFloating:  true,
        floatSpeed:  0.18 + rand * 0.22,
        swayAmp:     swayAmp * swayDir,
        swayFreq,
        swayPhase,
        directColor: _lanternColor(i),
      });
    }
  }

  // Left stream — rises from lower-left, column at ~18% of canvas width
  _stream(85, W * 0.18, W * 0.07, -1);

  // Right stream — rises from lower-right, column at ~82% of canvas width
  _stream(85, W * 0.82, W * 0.07, +1);

  // ── Scattered ambient lanterns ─────────────────────────────────────────────
  for (let i = 0; i < 40; i++) {
    const hash  = (i * 22695477 + 1) >>> 0;
    const rand  = (hash & 0xffff) / 0xffff;
    const rand2 = ((hash >> 8) & 0xffff) / 0xffff;

    // Keep ambient lanterns away from the lion (center band) — left or right half
    const side = i < 20 ? 0 : 1;
    const xMin = side === 0 ? W * 0.02 : W * 0.60;
    const xMax = side === 0 ? W * 0.40 : W * 0.98;

    positions.push({
      x:          xMin + rand * (xMax - xMin),
      y:          rand2 * (H + 40) - 20,
      size:       1.5 + rand * 2.0,
      isFloating:  true,
      floatSpeed:  0.10 + rand * 0.18,
      swayAmp:     4 + rand * 14,
      swayFreq:    0.0014 + rand * 0.0016,
      swayPhase:   rand * Math.PI * 2,
      directColor: _lanternColor(i + 100),
    });
  }

  return positions;   // 210 total
}
