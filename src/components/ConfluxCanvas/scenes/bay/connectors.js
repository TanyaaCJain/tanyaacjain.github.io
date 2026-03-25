import { rgbStr } from '../../utils';
import { geometry, INTL_ORANGE, ORANGE_DIM } from './geometry';

export function drawConnectors(ctx, { cx, cy, W, H, alpha, scene }) {
  if (alpha < 0.04) return;
  ctx.save();

  const {
    towerX_L, towerX_R, roadY, towerTopY, sagDepth,
    anchorX_L, anchorX_R, SO, mainCable,
    innerL, innerR, outerL, outerR,
    outerCableL, outerCableR,
  } = geometry(cx, cy, W, H);

  // Three separate cable segments per cable.
  // cable 0 (thick) attaches to the right shaft of each tower (+SO),
  // cable 1 (thin)  attaches to the left  shaft of each tower (−SO).
  ctx.globalAlpha = alpha * 0.55;
  for (let cable = 0; cable < 2; cable++) {
    const yOff = cable * 5;
    const cOff = cable === 0 ? SO : -SO;
    ctx.strokeStyle = rgbStr(cable === 0 ? INTL_ORANGE : ORANGE_DIM, 1);
    ctx.lineWidth   = cable === 0 ? 1.8 : 1.2;

    // Left outer span: anchor → tower left shaft + cOff
    ctx.beginPath();
    ctx.moveTo(anchorX_L, roadY + yOff);
    ctx.quadraticCurveTo((anchorX_L + towerX_L + cOff) / 2, roadY + yOff,
                          towerX_L + cOff, towerTopY + yOff);
    ctx.stroke();

    // Main span: left tower + cOff → right tower + cOff
    ctx.beginPath();
    ctx.moveTo(towerX_L + cOff, towerTopY + yOff);
    ctx.quadraticCurveTo(cx + cOff, towerTopY + 2 * sagDepth + yOff,
                          towerX_R + cOff, towerTopY + yOff);
    ctx.stroke();

    // Right outer span: right tower + cOff → anchor
    ctx.beginPath();
    ctx.moveTo(towerX_R + cOff, towerTopY + yOff);
    ctx.quadraticCurveTo((towerX_R + cOff + anchorX_R) / 2, roadY + yOff,
                          anchorX_R, roadY + yOff);
    ctx.stroke();
  }

  // Hangers — equispaced verticals from cable down to road deck
  ctx.globalAlpha = alpha * 0.42;
  ctx.lineWidth   = 1.0;
  ctx.strokeStyle = rgbStr(ORANGE_DIM, 1);

  // Main span — 20 hangers
  for (let i = 0; i < 20; i++) {
    const t = i / 19;
    const x = innerL + t * (innerR - innerL);
    ctx.beginPath(); ctx.moveTo(x, mainCable(x)); ctx.lineTo(x, roadY); ctx.stroke();
  }
  // Left outer span — 10 hangers (anchor to outer corner)
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    const x = anchorX_L + t * (outerL - anchorX_L);
    ctx.beginPath(); ctx.moveTo(x, outerCableL(x)); ctx.lineTo(x, roadY); ctx.stroke();
  }
  // Right outer span — 10 hangers (outer corner to anchor)
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    const x = outerR + t * (anchorX_R - outerR);
    ctx.beginPath(); ctx.moveTo(x, outerCableR(x)); ctx.lineTo(x, roadY); ctx.stroke();
  }

  // Portal-frame towers — twin vertical shafts + horizontal struts
  ctx.globalAlpha = alpha * 0.48;
  ctx.lineWidth   = 1.6;
  ctx.strokeStyle = rgbStr(INTL_ORANGE, 1);
  const shaftBottomY = roadY + H * 0.06;   // extends below road into the water
  for (const tx of [towerX_L, towerX_R]) {
    for (const shaft of [-SO, SO]) {
      ctx.beginPath();
      ctx.moveTo(tx + shaft, towerTopY);
      ctx.lineTo(tx + shaft, shaftBottomY);
      ctx.stroke();
    }
    ctx.lineWidth = 1.2;
    for (const strutYOff of [0, H * 0.07, H * 0.14, H * 0.21, sagDepth + H * 0.03]) {
      ctx.beginPath();
      ctx.moveTo(tx - SO, towerTopY + strutYOff);
      ctx.lineTo(tx + SO, towerTopY + strutYOff);
      ctx.stroke();
    }
  }

  // Bridge deck
  ctx.globalAlpha = alpha * 0.22;
  ctx.lineWidth   = 1;
  ctx.strokeStyle = rgbStr(scene.secondaryColor, 1);
  ctx.beginPath();
  ctx.moveTo(anchorX_L, roadY);
  ctx.lineTo(anchorX_R, roadY);
  ctx.stroke();

  ctx.restore();
}
