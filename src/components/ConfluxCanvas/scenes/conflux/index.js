import { formation as _formation, timing, neuralTargets, circuitTargets, aeroTargets, MORPH_COUNT, PHASE_MS, CYCLE_MS } from './formation';
import { drawConnectors as _drawConnectors } from './connectors';

export { _formation as formation };
export { _drawConnectors as drawConnectors };

// Phase timing is imported from formation.js (derived from SCENE_DURATION - TRANSITION_MS)
// Phase 0: neural    (particles 0–MORPH_COUNT spring; rest stream)
// Phase 1: circuit   (particles 0–MORPH_COUNT spring; rest stream)
// Phase 2: full aero (ALL particles stream)

// ─── Palette ──────────────────────────────────────────────────────────────────
const NEURAL_COLOR  = [223, 169,  20];   // gold
const CIRCUIT_COLOR = [ 13, 148, 136];   // teal

// ─── Background layer — car silhouette, always visible ───────────────────────
export function drawLayer(ctx, { cx, cy, W, H, alpha }) {
  if (alpha < 0.04) return;

  ctx.save();
  const carW = W * 0.32;
  const carH = H * 0.13;
  const carX = cx - carW / 2;
  const carY = cy - carH * 0.45;

  // Speed-wash gradient
  ctx.globalAlpha = alpha * 0.05;
  const wash = ctx.createLinearGradient(carX - carW * 0.3, cy, carX + carW * 1.3, cy);
  wash.addColorStop(0,    'rgba(223,169,20,0)');
  wash.addColorStop(0.28, 'rgba(223,169,20,0.8)');
  wash.addColorStop(0.5,  'rgba(223,169,20,0)');
  wash.addColorStop(0.72, 'rgba(223,169,20,0.8)');
  wash.addColorStop(1,    'rgba(223,169,20,0)');
  ctx.fillStyle = wash;
  ctx.fillRect(carX - carW * 0.3, cy - carH, carW * 1.6, carH * 2);

  // Sedan side-profile silhouette
  ctx.globalAlpha = alpha * 0.09;
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
  ctx.beginPath();
  ctx.arc(carX + carW * 0.24, carY + carH, carH * 0.20, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(carX + carW * 0.77, carY + carH, carH * 0.20, Math.PI, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// ─── tickFormation ────────────────────────────────────────────────────────────
export function tickFormation(particles, AMBIENT_START, { time }) {
  if (timing.sceneStartTime === null) {
    timing.sceneStartTime = time;
  }

  const elapsed = time - timing.sceneStartTime;

  // Do NOT loop — one pass through all 3 phases per scene visit.
  // After 9s the last state (full aero streaming) simply holds until transition.
  if (elapsed >= CYCLE_MS) return;

  const phase = Math.floor(elapsed / PHASE_MS);   // 0, 1, or 2

  // Particles MORPH_COUNT..AMBIENT_START-1 are always streaming
  for (let i = MORPH_COUNT; i < AMBIENT_START; i++) {
    const p = particles[i];
    if (!p.isStreaming) {
      const a         = aeroTargets[i];
      p.isStreaming   = true;
      p.streamLineIdx = a.streamLineIdx;
      p.streamPhase   = a.streamPhase;
      p.phaseSpeed    = a.phaseSpeed;
      p.validLines    = a.validLines;
    }
  }

  if (phase === timing.lastPhase) return;
  timing.lastPhase = phase;

  if (phase === 0) {
    // ── Neural: stop any aero streaming on morph particles ─────────────────
    for (let i = 0; i < MORPH_COUNT; i++) {
      const p = particles[i];
      if (p.isStreaming) { p.isStreaming = false; p.vx = 0; p.vy = 0; }
      p.tx          = neuralTargets[i].x;
      p.ty          = neuralTargets[i].y;
      p.size        = neuralTargets[i].size;
      p.targetColor = NEURAL_COLOR;
      p.isNode      = false;
    }

  } else if (phase === 1) {
    // ── Circuit ─────────────────────────────────────────────────────────────
    for (let i = 0; i < MORPH_COUNT; i++) {
      const p = particles[i];
      if (p.isStreaming) { p.isStreaming = false; p.vx = 0; p.vy = 0; }
      p.tx          = circuitTargets[i].x;
      p.ty          = circuitTargets[i].y;
      p.size        = circuitTargets[i].size;
      p.targetColor = CIRCUIT_COLOR;
      p.isNode      = circuitTargets[i].isNode;
    }

  } else {
    // ── Full aero: all morph particles also stream ──────────────────────────
    for (let i = 0; i < MORPH_COUNT; i++) {
      const p = particles[i];
      if (!p.isStreaming) {
        const a         = aeroTargets[i];
        p.isStreaming   = true;
        p.streamLineIdx = a.streamLineIdx;
        p.streamPhase   = a.streamPhase;
        p.phaseSpeed    = a.phaseSpeed;
        p.validLines    = a.validLines;
        p.isNode        = false;
      }
    }
  }
}
