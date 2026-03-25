import { rgbStr } from '../../utils';
import { timing, NEURAL_LAYERS, MORPH_COUNT, PHASE_MS, CYCLE_MS } from './formation';

// ─── Phase timing ─────────────────────────────────────────────────────────────
// Imported from formation.js — automatically fits within the scene's visible window.
const CROSSFADE = 500;   // ms fade-in / fade-out at phase edges

// Returns 0→1→0 envelope for targetPhase within the cycle.
function phaseAlpha(time, targetPhase) {
  if (timing.sceneStartTime === null) return targetPhase === 0 ? 1 : 0;
  const elapsed  = time - timing.sceneStartTime;
  const cycleT   = elapsed % CYCLE_MS;
  const phase    = Math.floor(cycleT / PHASE_MS);
  if (phase !== targetPhase) return 0;
  const phaseAge = cycleT % PHASE_MS;
  const fadeIn   = Math.min(phaseAge / CROSSFADE, 1);
  const fadeOut  = Math.min((PHASE_MS - phaseAge) / CROSSFADE, 1);
  return Math.min(fadeIn, fadeOut);
}

// ─── Neural connector drawing (particles 0–24) ────────────────────────────────
function drawNeuralConnectors(ctx, alpha, particles) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.22;
  ctx.lineWidth   = 0.6;

  let pStart = 0;
  for (let li = 0; li < NEURAL_LAYERS.length - 1; li++) {
    const countA = NEURAL_LAYERS[li];
    const countB = NEURAL_LAYERS[li + 1];
    for (let a = 0; a < countA; a++) {
      for (let b = 0; b < countB; b++) {
        const idxA = pStart + a;
        const idxB = pStart + countA + b;
        if (idxA >= MORPH_COUNT || idxB >= MORPH_COUNT) continue;
        const pa = particles[idxA];
        const pb = particles[idxB];
        if (!pa || !pb) continue;
        ctx.strokeStyle = rgbStr(pa.color, 1);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
    }
    pStart += countA;
  }
  ctx.restore();
}

// ─── Circuit connector drawing (particles 0–53) ───────────────────────────────
function drawCircuitConnectors(ctx, alpha, particles) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.30;
  ctx.lineWidth   = 1.2;

  const cols = 9, rows = 6;
  const core = Math.min(cols * rows, MORPH_COUNT);   // cap to available morph particles

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const idxA = r * cols + c;
      const idxB = r * cols + c + 1;
      if (idxA >= core || idxB >= core) continue;
      const pa = particles[idxA];
      const pb = particles[idxB];
      if (!pa || !pb || !pa.isNode || !pb.isNode) continue;
      ctx.strokeStyle = rgbStr(pa.color, 1);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// ─── Aero body ellipse — always visible ───────────────────────────────────────
function drawAeroEllipse(ctx, alpha, { cx, cy, W, H, scene }) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.06;
  ctx.lineWidth   = 1;
  ctx.strokeStyle = rgbStr(scene.secondaryColor, 1);
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.16, H * 0.07, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// ─── Exported connector function ──────────────────────────────────────────────
export function drawConnectors(ctx, { alpha, particles, cx, cy, W, H, time, scene }) {
  if (alpha < 0.04) return;

  // Aero obstacle ellipse: always shown
  drawAeroEllipse(ctx, alpha, { cx, cy, W, H, scene });

  const aN = phaseAlpha(time, 0);
  const aC = phaseAlpha(time, 1);
  const aA = phaseAlpha(time, 2);

  if (aN > 0.01) drawNeuralConnectors(ctx, alpha * aN, particles);
  if (aC > 0.01) drawCircuitConnectors(ctx, alpha * aC, particles);
  // During aero phase the ellipse already draws heavier — boost it slightly
  if (aA > 0.01) drawAeroEllipse(ctx, alpha * aA * 1.5, { cx, cy, W, H, scene });
}
