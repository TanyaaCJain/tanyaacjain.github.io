import { AMBIENT_START } from '../constants';

// ─── Formation ────────────────────────────────────────────────────────────────

export function formation(cx, cy, W, H) {
  const positions = [];

  for (let i = 0; i < AMBIENT_START; i++) {
    positions.push({
      x:          Math.random() * W,
      y:          Math.random() * H,
      size:       3 + Math.random() * 3,
      colorIndex: Math.random() < 0.6 ? 0 : 1,
      isFloating: true,
      floatSpeed: 0.25 + Math.random() * 0.45,   // positive = drifts upward
      swayAmp:    8 + Math.random() * 14,
      swayFreq:   0.003 + Math.random() * 0.004,
      swayPhase:  Math.random() * Math.PI * 2,
    });
  }

  return positions;
}

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer() {}   // lanterns are pure particles; no drawn background

// ─── Connector lines ──────────────────────────────────────────────────────────

export function drawConnectors() {}   // no connector lines for this scene
