// ─── Fan geometry ─────────────────────────────────────────────────────────────
// Single source of truth for the animated peacock fan dimensions.
// Called independently by drawLayer, drawConnectors, and tickFormation each frame.

export const STEM = 18;

export function fanGeometry(cy, H, time) {
  return {
    fanAy:  cy - H * 0.05 + H * 0.015 * Math.sin(time * 0.00045),
    spread: 190 + 18 * Math.sin(time * 0.00055),
    rOuter: H * (0.28 + 0.03 * Math.sin(time * 0.00070)),
    rInner: H * 0.06,
  };
}
