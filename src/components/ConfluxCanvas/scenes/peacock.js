import { rgbStr } from '../utils';

// ─── Formation ────────────────────────────────────────────────────────────────

export function formation(cx, cy, W, H) {
  const positions = [];
  const fanAx     = cx;
  const fanAy     = cy + H * 0.06;
  const rInner    = H * 0.06;
  const rOuter    = H * 0.28;
  const stemCount = 18;

  // Feather stems — 18 stems × 7 particles = 126
  for (let k = 0; k < stemCount; k++) {
    const angleDeg = -95 + k * (190 / (stemCount - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;  // 0° = upward
    for (let p = 0; p < 7; p++) {
      const t = p / 6;
      const r = rInner + t * (rOuter - rInner);
      positions.push({
        x:         fanAx + r * Math.cos(angleRad),
        y:         fanAy + r * Math.sin(angleRad),
        size:      2 + (1 - t) * 1.5,
        colorIndex: p < 3 ? 0 : 1,
        isPeacock: true,
      });
    }
  }

  // Eye spots at feather tips — 18 tips × 3 particles = 54
  for (let k = 0; k < stemCount; k++) {
    const angleDeg = -95 + k * (190 / (stemCount - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const tipX     = fanAx + rOuter * Math.cos(angleRad);
    const tipY     = fanAy + rOuter * Math.sin(angleRad);
    for (let e = 0; e < 3; e++) {
      const ea = (2 * Math.PI * e) / 3;
      positions.push({
        x:         tipX + 11 * Math.cos(ea),
        y:         tipY + 11 * Math.sin(ea),
        size:      2.8,
        colorIndex: 2,
        isPeacock: true,
      });
    }
  }
  // Running total: 180

  // Body — 6 particles
  for (let b = 0; b < 6; b++) {
    positions.push({
      x:         fanAx + (b % 3 - 1) * 9,
      y:         fanAy + H * 0.038 + Math.floor(b / 3) * 9,
      size:      3.5,
      colorIndex: 2,
      isPeacock: false,
    });
  }

  // Neck + crest — 5 particles
  for (let n = 0; n < 5; n++) {
    positions.push({
      x:         fanAx + (n % 2 === 0 ? 0 : 4),
      y:         fanAy - H * 0.018 - n * 11,
      size:      2.5 - n * 0.2,
      colorIndex: 0,
      isPeacock: false,
    });
  }
  // Running total: 191

  // Parijat (night jasmine) — white flowers drifting downward — 19 particles
  for (let j = 0; j < 19; j++) {
    positions.push({
      x:          Math.random() * W,
      y:          Math.random() * H,
      size:       1.5 + Math.random() * 1,
      colorIndex: 1,
      directColor: [245, 240, 232],                   // cream-white, overrides palette
      isFloating:  true,
      floatSpeed:  -(0.18 + Math.random() * 0.22),    // negative = falls downward
      swayAmp:     3 + Math.random() * 5,
      swayFreq:    0.002 + Math.random() * 0.003,
      swayPhase:   Math.random() * Math.PI * 2,
      isPeacock:   false,
    });
  }
  // Total: 210

  return positions;
}

// ─── Background layer ─────────────────────────────────────────────────────────

export function drawLayer() {}   // no background layer for this scene

// ─── Connector lines ──────────────────────────────────────────────────────────

export function drawConnectors(ctx, { cx, cy, H, alpha, scene }) {
  if (alpha < 0.04) return;
  ctx.save();

  const fanAx  = cx;
  const fanAy  = cy + H * 0.06;
  const rOuter = H * 0.28;

  ctx.globalAlpha = alpha * 0.12;
  ctx.lineWidth   = 0.5;

  for (let k = 0; k < 18; k++) {
    const angleDeg = -95 + k * (190 / 17);
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    ctx.strokeStyle = rgbStr(scene.primaryColor, 1);
    ctx.beginPath();
    ctx.moveTo(fanAx, fanAy);
    ctx.lineTo(fanAx + rOuter * Math.cos(angleRad), fanAy + rOuter * Math.sin(angleRad));
    ctx.stroke();
  }

  ctx.restore();
}
