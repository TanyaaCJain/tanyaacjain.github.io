import { POLY, SVG_CX, SVG_CY, getScale } from './polygons';

// ─── Lazy-loaded SVG layers ───────────────────────────────────────────────────
const SVG_W = 1359;
const SVG_H = 1376;

function _loadImg(src) {
  const img = new window.Image();
  img.ready = false;
  img.onload = () => { img.ready = true; };
  img.onerror = () => { console.warn(src, 'failed to load'); };
  img.src = src;
  return img;
}

let _imgBodyStatic = null;
let _imgBodyFront  = null;
let _imgTail       = null;
let _imgMane       = null;
let _imgMane2      = null;

function _imgs() {
  if (!_imgBodyStatic) {
    _imgBodyStatic = _loadImg('/img/thai-singha-body-static.svg');
    _imgBodyFront  = _loadImg('/img/thai-singha-body-front.svg');
    _imgTail       = _loadImg('/img/thai-singha-tail.svg');
    _imgMane       = _loadImg('/img/thai-singha-mane.svg');
    _imgMane2      = _loadImg('/img/thai-singha-mane2.svg');
  }
  return { bodyStatic: _imgBodyStatic, bodyFront: _imgBodyFront,
           tail: _imgTail, mane: _imgMane, mane2: _imgMane2 };
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const AMBER  = '245,158,11';
const BRIGHT = '255,218,80';

// ─── Main entry point ─────────────────────────────────────────────────────────

export function drawLion(ctx, { cx, cy, H, alpha, time }) {
  if (alpha < 0.04) return;

  const { bodyStatic, bodyFront, tail, mane, mane2 } = _imgs();
  const scl = getScale(H) * 0.75;       // scale down
  const lcy = cy - H * 0.08;            // move up

  // helper: draw one SVG layer at the standard lion position (no breathing)
  function _draw(img, dx = 0, dy = 0) {
    if (!img.ready) return;
    const dw = SVG_W * scl;
    const dh = SVG_H * scl;
    const ox = cx - SVG_CX * scl + dx;
    const oy = lcy - SVG_CY * scl + dy;
    ctx.drawImage(img, ox, oy, dw, dh);
  }

  ctx.save();
  ctx.lineCap  = 'round';
  ctx.lineJoin = 'round';

  // ── Body aura glow ────────────────────────────────────────────────────────
  const bodyCx = cx  + (661 - SVG_CX) * scl;
  const bodyCy = lcy + (793 - SVG_CY) * scl;
  const auraR  = scl * 440;
  const aura   = ctx.createRadialGradient(bodyCx, bodyCy, 0, bodyCx, bodyCy, auraR);
  aura.addColorStop(0,    `rgba(${AMBER},${(alpha * 0.22).toFixed(3)})`);
  aura.addColorStop(0.45, `rgba(${AMBER},${(alpha * 0.08).toFixed(3)})`);
  aura.addColorStop(1,    `rgba(${AMBER},0)`);
  ctx.globalAlpha = 1;
  ctx.fillStyle   = aura;
  ctx.beginPath();
  ctx.arc(bodyCx, bodyCy, auraR, 0, Math.PI * 2);
  ctx.fill();

  // ── Static body (legs, head, neck, spine, back leg) ──────────────────────
  ctx.globalAlpha = alpha;
  _draw(bodyStatic);

  // ── Front body with breathing scale ──────────────────────────────────────
  if (bodyFront.ready) {
    const breathScale = 1 + 0.045 * Math.sin(time * 0.0006);
    // body-part-1 centroid in SVG space: (661, 793)
    const bcx = cx  + (661 - SVG_CX) * scl;
    const bcy = lcy + (793 - SVG_CY) * scl;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(bcx, bcy);
    ctx.scale(breathScale, breathScale);
    ctx.translate(-bcx, -bcy);
    _draw(bodyFront);
    ctx.restore();
  }

  // ── Animated tail — small rotation around pivot ───────────────────────────
  if (tail.ready) {
    const [pvx, pvy] = POLY.tailPivot;
    const pivotX = cx  + (pvx - SVG_CX) * scl + 100;
    const pivotY = lcy + (pvy - SVG_CY) * scl + 100;
    const angle  = 0.1 * Math.sin(time * 0.0009);   // ±~3.4°, subtle

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(pivotX, pivotY);
    ctx.rotate(angle);
    ctx.translate(-pivotX, -pivotY);
    _draw(tail);
    ctx.restore();
  }

  // ── Animated chin mane 1 — horizontal sway ───────────────────────────────
  if (mane.ready) {
    const swayPx = scl * 12 * Math.sin(time * 0.0007);
    ctx.save();
    ctx.globalAlpha = alpha;
    _draw(mane, swayPx, 0);
    ctx.restore();
  }

  // ── Animated chin mane 2 — horizontal sway (offset phase) ────────────────
  if (mane2.ready) {
    const swayPx = scl * 10 * Math.sin(time * 0.0007 + 0.6);
    ctx.save();
    ctx.globalAlpha = alpha;
    _draw(mane2, swayPx, 0);
    ctx.restore();
  }

  // ── Golden sparks ─────────────────────────────────────────────────────────
  _drawSparks(ctx, cx, lcy, scl, alpha, time);

  // ── Eye glow pulse ────────────────────────────────────────────────────────
  _drawEye(ctx, cx, lcy, scl, alpha, time);

  ctx.restore();
}

// ── Golden sparks — deterministic from time + index, no state needed ──────────

// Spawn origins in SVG space: mane root, mane2 root, tail tip
const _SPARK_ORIGINS = [
  [260, 620],   // chin mane 1
  [600, 450],   // mane 2 / neck area
  [835, 126],   // tail tip
  [340, 200],   // head / crown
];
const _PHI = 1.6180339887;   // golden ratio — spreads phases evenly

function _drawSparks(ctx, cx, cy, scl, a, time) {
  const TOTAL = 28;
  ctx.save();
  for (let i = 0; i < TOTAL; i++) {
    // Which origin this spark belongs to
    const origin = _SPARK_ORIGINS[i % _SPARK_ORIGINS.length];
    const ox = cx + (origin[0] - SVG_CX) * scl;
    const oy = cy + (origin[1] - SVG_CY) * scl;

    // phase ∈ [0,1) — where in its life cycle the spark is this frame
    const speed = 0.00022 + (i % 5) * 0.00004;
    const phase = ((time * speed + i * _PHI) % 1);

    // Drift: upward + slight horizontal wobble
    const drift  = scl * (60 + (i % 7) * 18);
    const wobble = scl * (i % 3 === 0 ? 12 : -8) * Math.sin(time * 0.0008 + i);
    const sx = ox + wobble * phase;
    const sy = oy - drift * phase;

    // Fade in quickly, linger, fade out at end
    const fadeIn  = Math.min(phase / 0.15, 1);
    const fadeOut = 1 - Math.max((phase - 0.65) / 0.35, 0);
    const sparkA  = a * fadeIn * fadeOut * 0.85;
    if (sparkA < 0.01) continue;

    // Size: larger near birth, shrinks slightly as it rises
    const r = scl * (1.2 + (i % 4) * 0.5) * (1 - phase * 0.4);

    // Colour: bright yellow-white core, occasional amber
    const warm = i % 5 === 0;
    ctx.globalAlpha = sparkA;
    ctx.fillStyle   = warm ? `rgba(255,200,60,1)` : `rgba(255,245,160,1)`;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ── Eye glow pulse ─────────────────────────────────────────────────────────────

function _drawEye(ctx, cx, cy, scl, a, time) {
  const [ex, ey] = POLY.eyePos;
  const ecx      = cx + (ex - SVG_CX) * scl;
  const ecy      = cy + (ey - SVG_CY) * scl;
  const pulse    = 0.5 + 0.5 * Math.sin(time * 0.0014);
  const eyeR     = scl * 10;
  const haloR    = scl * (38 + 14 * pulse);

  const halo = ctx.createRadialGradient(ecx, ecy, eyeR * 0.5, ecx, ecy, haloR);
  halo.addColorStop(0,   `rgba(255,240,100,${(a * (0.55 + pulse * 0.30)).toFixed(3)})`);
  halo.addColorStop(0.5, `rgba(${BRIGHT},${(a * 0.18 * pulse).toFixed(3)})`);
  halo.addColorStop(1,   'rgba(245,158,11,0)');
  ctx.globalAlpha = 1;
  ctx.fillStyle   = halo;
  ctx.beginPath();
  ctx.arc(ecx, ecy, haloR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `rgba(255,252,200,${(a * (0.80 + pulse * 0.20)).toFixed(3)})`;
  ctx.beginPath();
  ctx.arc(ecx, ecy, eyeR, 0, Math.PI * 2);
  ctx.fill();
}
