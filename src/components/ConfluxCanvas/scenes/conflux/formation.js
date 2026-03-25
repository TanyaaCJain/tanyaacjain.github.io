import { AMBIENT_START, SCENE_DURATION, TRANSITION_MS } from '../../constants';

// ─── Timing shared with connectors + tickFormation ────────────────────────────
// Fit all 3 phases inside the scene's visible window (before the crossfade out).
const _effective    = SCENE_DURATION - TRANSITION_MS;      // ~6800ms
export const PHASE_MS = Math.floor(_effective / 3);         // ~2266ms per phase
export const CYCLE_MS = PHASE_MS * 3;                       // ~6798ms total

// ─── Particle layout ──────────────────────────────────────────────────────────
// Change MORPH_COUNT to tune the split. STREAM_START is derived automatically.
// Particles 0–(MORPH_COUNT-1)   → morph between neural and circuit formations
// Particles MORPH_COUNT–209     → always streaming (aero flow, persistent)
export const MORPH_COUNT  = 70;
export const STREAM_START = MORPH_COUNT;   // always in sync, do not edit separately

// ─── Shared timing state (mutable, read by connectors + tickFormation) ────────
export const timing = { sceneStartTime: null, lastPhase: -1 };

// ─── Precomputed target arrays ────────────────────────────────────────────────
export let neuralTargets  = [];   // length MORPH_COUNT
export let circuitTargets = [];   // length MORPH_COUNT
export let aeroTargets    = [];   // length (AMBIENT_START - STREAM_START) = 70

// ─── Neural layout constants (used by connectors) ─────────────────────────────
export const NEURAL_LAYERS = [8, 6, 6, 4];

// ─── Deterministic scatter ────────────────────────────────────────────────────
function seeded(n) {
  const x = Math.sin(n + 1) * 43758.5453;
  return x - Math.floor(x);
}

// ─── Streamlines (from aero.js) ───────────────────────────────────────────────
function computeStreamlines(cx, cy, W, H) {
  const R          = W * 0.16;
  const U          = 1.0;
  const numLines   = 18;
  const ptsPerLine = 60;
  const step       = 7;

  const velAt = (x, y) => {
    const dx = x - cx, dy = y - cy;
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
    let x = cx - W * 0.44, y = cy + yOff;

    for (let k = 0; k < ptsPerLine; k++) {
      pts.push({ x, y });
      const { vx, vy } = velAt(x, y);
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.01) { x += step; continue; }
      x += (vx / speed) * step;
      y += (vy / speed) * step;
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy < R * R * 1.08 || x > cx + W * 0.46) break;
    }
    streamlines.push(pts.length > 3 ? pts : []);
  }
  return streamlines;
}

// ─── Formation ────────────────────────────────────────────────────────────────
export function formation(cx, cy, W, H) {
  timing.sceneStartTime = null;
  timing.lastPhase      = -1;

  // ── Neural targets (particles 0–139) ───────────────────────────────────────
  const xSpread    = Math.min(W * 0.55, 440);
  const ySpread    = Math.min(H * 0.55, 320);
  const neuralCore = [];

  NEURAL_LAYERS.forEach((count, li) => {
    const x = cx + (li / (NEURAL_LAYERS.length - 1) - 0.5) * xSpread;
    for (let ni = 0; ni < count; ni++) {
      const y = cy + (ni / (count - 1) - 0.5) * ySpread;
      neuralCore.push({ x, y, size: 3.5, colorIndex: li % 2 === 0 ? 0 : 1 });
    }
  });
  neuralCore.push({ x: cx - xSpread / 2, y: cy, size: 5, colorIndex: 2 });

  neuralTargets = Array.from({ length: MORPH_COUNT }, (_, i) => {
    if (i < neuralCore.length) return neuralCore[i];
    const base = neuralCore[i % neuralCore.length];
    return {
      x:          base.x + (seeded(i * 3)     - 0.5) * xSpread * 0.35,
      y:          base.y + (seeded(i * 3 + 1) - 0.5) * ySpread * 0.35,
      size:       1.4 + seeded(i * 3 + 2) * 0.8,
      colorIndex: base.colorIndex,
      isNode:     false,
    };
  });

  // ── Circuit targets (particles 0–139) ──────────────────────────────────────
  const cols  = 9, rows = 6;
  const gapX  = Math.min(56, (W * 0.75) / cols);
  const gapY  = Math.min(52, (H * 0.65) / rows);
  const offX  = cx - (cols - 1) * gapX / 2;
  const offY  = cy - (rows - 1) * gapY / 2;
  const circuitCore = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      circuitCore.push({
        x: offX + c * gapX, y: offY + r * gapY,
        size: 3.5, colorIndex: 2, isNode: true,
      });
    }
  }
  circuitTargets = Array.from({ length: MORPH_COUNT }, (_, i) => {
    if (i < circuitCore.length) return circuitCore[i];
    const base = circuitCore[i % circuitCore.length];
    return {
      x:          base.x + (seeded(i * 7)     - 0.5) * gapX * 2,
      y:          base.y + (seeded(i * 7 + 1) - 0.5) * gapY * 2,
      size:       1.5,
      colorIndex: 1,
      isNode:     false,
    };
  });

  // ── Aero targets (all AMBIENT_START particles) ────────────────────────────
  // Used by ALL particles during aero phase; also by STREAM_START..209 always.
  const streamlines = computeStreamlines(cx, cy, W, H);
  const validLines  = streamlines.filter(l => l.length > 3);
  const numLines    = validLines.length;
  const batchSize   = Math.ceil(AMBIENT_START / numLines);

  aeroTargets = Array.from({ length: AMBIENT_START }, (_, i) => {
    const lineIdx        = i % numLines;
    const line           = validLines[lineIdx];
    const phase          = (i % batchSize) / batchSize;
    const ptIdx          = Math.floor(phase * line.length);
    const pt             = line[ptIdx] || line[0];
    const distFromCenter = Math.abs(lineIdx / (numLines - 1) - 0.5) * 2;
    return {
      x:             pt?.x ?? cx,
      y:             pt?.y ?? cy,
      size:          1.8 + distFromCenter * 0.5,
      colorIndex:    distFromCenter > 0.5 ? 0 : distFromCenter > 0.2 ? 2 : 1,
      isStreaming:   true,
      streamLineIdx: lineIdx,
      streamPhase:   phase,
      phaseSpeed:    0.006 + distFromCenter * 0.005,
      validLines,
    };
  });

  // Return full 210-position array: neural morph particles first, then streaming
  return [
    ...neuralTargets,
    ...aeroTargets.slice(MORPH_COUNT),
  ];
}
