import { geometry } from './geometry';

export function formation(cx, cy, W, H) {
  const positions = [];
  const {
    towerSpanX, towerX_L, towerX_R, roadY, towerTopY, sagDepth,
    anchorX_L, anchorX_R, SO, mainCable,
    outerCableL, outerCableR,
  } = geometry(cx, cy, W, H);

  // Main + outer cables — each cable follows its own shifted curve
  for (let cable = 0; cable < 2; cable++) {
    const yOff = cable * 5;
    const cOff = cable === 0 ? SO : -SO;
    const cCenter   = cx + cOff;
    const cHalfSpan = towerSpanX / 2;
    const cMainFn   = (x) => towerTopY + sagDepth * (1 - ((x - cCenter) / cHalfSpan) ** 2);

    const cTowerL   = towerX_L + cOff;
    const cTowerR   = towerX_R + cOff;
    const cOuterFnL = (x) => { const t = (x - anchorX_L) / (cTowerL - anchorX_L); return roadY - t * t * sagDepth; };
    const cOuterFnR = (x) => { const t = (x - cTowerR) / (anchorX_R - cTowerR);   return roadY - (1-t)*(1-t)*sagDepth; };

    // Main span — 43 pts
    for (let i = 0; i <= 43; i++) {
      const x = cTowerL + (i / 43) * (cTowerR - cTowerL);
      positions.push({ x, y: cMainFn(x) + yOff, size: 1.8, colorIndex: cable === 0 ? 0 : 2 });
    }
    // Left outer span — 6 pts
    for (let i = 0; i <= 5; i++) {
      const x = anchorX_L + (i / 5) * (cTowerL - anchorX_L);
      positions.push({ x, y: cOuterFnL(x) + yOff, size: 1.8, colorIndex: 2 });
    }
    // Right outer span — 6 pts
    for (let i = 0; i <= 5; i++) {
      const x = cTowerR + (i / 5) * (anchorX_R - cTowerR);
      positions.push({ x, y: cOuterFnR(x) + yOff, size: 1.8, colorIndex: 2 });
    }
  }
  // 112 pts

  // Portal-frame towers — 2 towers × (2 shafts × 10 pts + 4 struts × 3 pts) = 68 pts
  for (let side = 0; side < 2; side++) {
    const tx           = side === 0 ? towerX_L : towerX_R;
    const shaftBottomY = roadY + H * 0.06;
    const towerPts     = 9;
    for (let shaft = -1; shaft <= 1; shaft += 2) {
      for (let k = 0; k <= towerPts; k++) {
        positions.push({
          x:          tx + shaft * SO,
          y:          towerTopY + k * (shaftBottomY - towerTopY) / towerPts,
          size:       1.2,
          colorIndex: 0,
        });
      }
    }
    for (const strutYOff of [0, H * 0.07, H * 0.14, H * 0.21]) {
      for (let b = -1; b <= 1; b++) {
        positions.push({ x: tx + b * SO * 0.6, y: towerTopY + strutYOff, size: 1.8, colorIndex: 1 });
      }
    }
  }
  // 180 pts

  // Vertical hangers — 12 hangers × 2 pts = 24 pts
  for (let i = 0; i < 12; i++) {
    const t      = i / 11;
    const x      = towerX_L + t * (towerX_R - towerX_L);
    const cableY = mainCable(x);
    for (let s = 0; s <= 1; s++) {
      positions.push({ x, y: cableY + s * (roadY - cableY), size: 1.5, colorIndex: s === 0 ? 2 : 1 });
    }
  }
  // 204 pts

  // Bridge deck — 6 pts, full span anchor to anchor
  for (let i = 0; i <= 5; i++) {
    positions.push({ x: anchorX_L + (i / 5) * (anchorX_R - anchorX_L), y: roadY, size: 1.2, colorIndex: 1 });
  }
  // Total: 210

  return positions;
}
