import { fanGeometry, STEM } from './geometry';

// ─── Static formation ─────────────────────────────────────────────────────────
// Returns initial particle positions (no time — uses resting fanAy).
// Particle index layout:
//   0–125   feather stems  (STEM × 7)
//   126–179 eye spots      (STEM × 3)
//   180–185 body           (6)
//   186–190 neck + crest   (5)
//   191–209 parijat        (19)

export function formation(cx, cy, W, H) {
  const positions = [];
  const fanAx     = cx;
  const fanAy     = cy - H * 0.05;   // resting base, no sine
  const rInner    = H * 0.06;
  const rOuter    = H * 0.28;

  // Feather stems — STEM × 7 = 126
  for (let k = 0; k < STEM; k++) {
    const angleDeg = -95 + k * (190 / (STEM - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    for (let p = 0; p < 7; p++) {
      const t = p / 6;
      const r = rInner + t * (rOuter - rInner);
      positions.push({
        x:          fanAx + r * Math.cos(angleRad),
        y:          fanAy + r * Math.sin(angleRad),
        size:       2 + (1 - t) * 1.5,
        colorIndex: p < 3 ? 0 : 1,
        isPeacock:  true,
      });
    }
  }

  // Eye spots — STEM × 3 = 54
  for (let k = 0; k < STEM; k++) {
    const angleDeg = -95 + k * (190 / (STEM - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const tipX     = fanAx + rOuter * Math.cos(angleRad);
    const tipY     = fanAy + rOuter * Math.sin(angleRad);
    for (let e = 0; e < 3; e++) {
      const ea = (2 * Math.PI * e) / 3;
      positions.push({
        x:          tipX + 11 * Math.cos(ea),
        y:          tipY + 11 * Math.sin(ea),
        size:       2.8,
        colorIndex: 2,
        isPeacock:  true,
      });
    }
  }

  // Body — 6
  for (let b = 0; b < 6; b++) {
    positions.push({
      x:          fanAx + (b % 3 - 1) * 9,
      y:          fanAy + H * 0.038 + Math.floor(b / 3) * 9,
      size:       3.5,
      colorIndex: 2,
      isPeacock:  false,
    });
  }

  // Neck + crest — 5
  for (let n = 0; n < 5; n++) {
    positions.push({
      x:          fanAx + (n % 2 === 0 ? 0 : 4),
      y:          fanAy - H * 0.018 - n * 11,
      size:       2.5 - n * 0.2,
      colorIndex: 0,
      isPeacock:  false,
    });
  }

  // Parijat — 19 floating
  for (let j = 0; j < 19; j++) {
    positions.push({
      x:           Math.random() * W,
      y:           Math.random() * H,
      size:        1.5 + Math.random() * 1,
      colorIndex:  1,
      directColor: [245, 240, 232],
      isFloating:  true,
      floatSpeed:  -(0.18 + Math.random() * 0.22),
      swayAmp:     3 + Math.random() * 5,
      swayFreq:    0.002 + Math.random() * 0.003,
      swayPhase:   Math.random() * Math.PI * 2,
      isPeacock:   false,
    });
  }

  return positions;   // total: 210
}

// ─── Live tick — syncs particle targets to animated geometry each frame ────────

export function tickFormation(particles, AMBIENT_START, { cx, cy, H, time }) {
  const { fanAy, spread, rOuter, rInner } = fanGeometry(cy, H, time);

  // Feather stems — 0–125
  for (let k = 0; k < STEM; k++) {
    const angleDeg = -95 + k * (spread / (STEM - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    for (let pt = 0; pt < 7; pt++) {
      const r   = rInner + (pt / 6) * (rOuter - rInner);
      const idx = k * 7 + pt;
      particles[idx].tx = cx    + r * Math.cos(angleRad);
      particles[idx].ty = fanAy + r * Math.sin(angleRad);
    }
  }

  // Eye spots — 126–179
  for (let k = 0; k < STEM; k++) {
    const angleDeg = -95 + k * (spread / (STEM - 1));
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const tipX     = cx    + rOuter * Math.cos(angleRad);
    const tipY     = fanAy + rOuter * Math.sin(angleRad);
    for (let e = 0; e < 3; e++) {
      const ea  = (2 * Math.PI * e) / 3;
      particles[126 + k * 3 + e].tx = tipX + 11 * Math.cos(ea);
      particles[126 + k * 3 + e].ty = tipY + 11 * Math.sin(ea);
    }
  }

  // Body — 180–185
  for (let b = 0; b < 6; b++) {
    particles[180 + b].tx = cx + (b % 3 - 1) * 9;
    particles[180 + b].ty = fanAy + H * 0.072 + Math.floor(b / 3) * 9;
  }

  // Neck + crest — 186–190
  for (let n = 0; n < 5; n++) {
    particles[186 + n].tx = cx + (n % 2 === 0 ? 0 : 4);
    particles[186 + n].ty = fanAy - H * 0.018 - n * 11;
  }
  // 191–209 are isFloating — handled by main loop
}
