export const INTL_ORANGE = [192,  54,  44];   // Golden Gate "International Orange"
export const ORANGE_DIM  = [160,  44,  36];

export function geometry(cx, cy, W, H) {
  const towerSpanX = W * 0.45;
  const towerX_L   = cx - towerSpanX / 2;
  const towerX_R   = cx + towerSpanX / 2;
  const roadY      = cy + H * 0.01;
  const towerTopY  = roadY - H * 0.30;
  // sagDepth = full vertical distance from tower top to road deck,
  // so the cable bottom lands exactly on the bridge horizontal.
  const sagDepth   = roadY - towerTopY;
  const anchorX_L  = cx - W * 0.42;
  const anchorX_R  = cx + W * 0.42;
  const anchorY    = roadY + H * 0.025;
  const SO         = 12;                // portal-frame shaft half-width (px)

  // Tower corners — cables attach to inner corners (main span) / outer corners (outer spans)
  const innerL = towerX_L + SO;
  const innerR = towerX_R - SO;
  const outerL = towerX_L - SO;
  const outerR = towerX_R + SO;

  // Main span cable: inner corner → inner corner, sags to roadY at centre
  const halfSpan  = (innerR - innerL) / 2;
  const mainCable = (x) =>
    towerTopY + sagDepth * (1 - ((x - cx) / halfSpan) ** 2);

  // Outer span cables: outer corner → anchor, parabola same character as main span
  const outerMidX_L = (anchorX_L + outerL) / 2;
  const outerMidX_R = (outerR + anchorX_R) / 2;
  // Left: P0=(anchorX_L,roadY) P1=(outerMidX_L,roadY) P2=(outerL,towerTopY)
  const outerCableL = (x) => {
    const t = (x - anchorX_L) / (outerL - anchorX_L);
    return roadY - t * t * sagDepth;
  };
  // Right: P0=(outerR,towerTopY) P1=(outerMidX_R,roadY) P2=(anchorX_R,roadY)
  const outerCableR = (x) => {
    const t = (x - outerR) / (anchorX_R - outerR);
    return roadY - (1 - t) * (1 - t) * sagDepth;
  };

  return { towerSpanX, towerX_L, towerX_R, roadY, towerTopY, sagDepth,
           anchorX_L, anchorX_R, anchorY, SO, mainCable,
           innerL, innerR, outerL, outerR,
           outerMidX_L, outerMidX_R, outerCableL, outerCableR };
}
