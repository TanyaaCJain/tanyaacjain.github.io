import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

// ─── Thúng chai — half-sphere coconut basket boat ────────────────────────────
// Viewed from a slight overhead angle: dome hull below the rim ellipse.
// Gradient shading + woven lattice give the rounded 3-D coconut-shell feel.

function drawThungChai(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;

  const rW       = size * 0.92;   // rim half-width
  const rimY     = -size * 0.10;  // rim sits just above local origin (waterline)
  const domeD    = size * 0.72;   // dome depth below rim

  // ── Hull dome path ──────────────────────────────────────────────────────────
  function hullPath() {
    ctx.beginPath();
    ctx.moveTo(-rW, rimY);
    ctx.bezierCurveTo(-rW * 0.96, rimY + domeD * 0.45,
                      -rW * 0.38, rimY + domeD * 0.96,
                       0,         rimY + domeD);
    ctx.bezierCurveTo( rW * 0.38, rimY + domeD * 0.96,
                       rW * 0.96, rimY + domeD * 0.45,
                       rW,        rimY);
  }

  // Base fill — warm bamboo brown
  hullPath();
  const baseGrad = ctx.createLinearGradient(-rW, rimY, rW * 0.4, rimY + domeD);
  baseGrad.addColorStop(0,   'rgba(72, 45, 14, 0.90)');
  baseGrad.addColorStop(0.45,'rgba(118, 78, 28, 0.90)');
  baseGrad.addColorStop(1,   'rgba(55, 32, 8,  0.95)');
  ctx.fillStyle = baseGrad;
  ctx.fill();

  // ── Woven lattice clipped to dome ──────────────────────────────────────────
  ctx.save();
  hullPath();
  ctx.clip();
  const step = size * 0.26;
  ctx.strokeStyle = 'rgba(155, 108, 48, 0.38)';
  ctx.lineWidth = size * 0.032;
  for (let d = -rW * 2.2; d < rW * 2.2; d += step) {
    ctx.beginPath();
    ctx.moveTo(d - rW, rimY - 2);
    ctx.lineTo(d + rW, rimY + domeD + 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(d + rW, rimY - 2);
    ctx.lineTo(d - rW, rimY + domeD + 2);
    ctx.stroke();
  }
  ctx.restore();

  // ── Sphere highlight — light from upper-left ───────────────────────────────
  hullPath();
  const sphGrad = ctx.createRadialGradient(
    -rW * 0.38, rimY + domeD * 0.22, 0,
     0,          rimY + domeD * 0.5,  rW * 1.05
  );
  sphGrad.addColorStop(0,   'rgba(220, 178, 108, 0.26)');
  sphGrad.addColorStop(0.5, 'rgba(160, 118, 58,  0.08)');
  sphGrad.addColorStop(1,   'rgba(0, 0, 0,        0)');
  ctx.fillStyle = sphGrad;
  ctx.fill();

  // ── Rim opening (dark inside the bowl) ────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(0, rimY, rW, rW * 0.20, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(42, 24, 6, 0.82)';
  ctx.fill();

  // ── Rim ring highlight ─────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(0, rimY, rW, rW * 0.20, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(195, 155, 82, 0.72)';
  ctx.lineWidth = size * 0.062;
  ctx.stroke();

  ctx.restore();
}

// ─── Nón lá (Vietnamese conical hat) ─────────────────────────────────────────
// Real nón lá structure: palm leaves layered over a bamboo frame of ~16 concentric
// rings. The sides curve gently inward near the tip (not a straight triangle).
// Mesh look: concentric ring ellipses + radial ribs clipped to cone silhouette.

// rotation: positive = tilts right, negative = tilts left/back. Default 0.
function drawNonLa(ctx, x, y, size, alpha, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;

  const brimW  = size * 0.92;   // wide, prominent brim
  const height = size * 1.05;   // tall elegant cone
  const rimH   = brimW * 0.15;  // brim ellipse vertical radius (foreshortening)

  // ── Cone silhouette ────────────────────────────────────────────────────────
  // Slightly concave sides near apex — organic, not purely straight.
  function traceCone() {
    ctx.beginPath();
    ctx.moveTo(0, -height);
    ctx.bezierCurveTo(
      brimW * 0.22, -height * 0.72,   // inflects inward first
      brimW * 0.82, -rimH * 1.4,      // then sweeps out
      brimW, 0
    );
    ctx.lineTo(-brimW, 0);
    ctx.bezierCurveTo(
      -brimW * 0.82, -rimH * 1.4,
      -brimW * 0.22, -height * 0.72,
      0, -height
    );
    ctx.closePath();
  }

  // Base fill — straw gradient, brighter on light side
  traceCone();
  const fill = ctx.createLinearGradient(-brimW * 0.4, -height, brimW * 0.5, 0);
  fill.addColorStop(0,    'rgba(240, 222, 170, 0.94)');
  fill.addColorStop(0.45, 'rgba(215, 193, 138, 0.92)');
  fill.addColorStop(1,    'rgba(188, 165, 105, 0.90)');
  ctx.fillStyle = fill;
  ctx.fill();

  // ── Mesh texture clipped to cone ──────────────────────────────────────────
  ctx.save();
  traceCone();
  ctx.clip();

  // Concentric rings — the bamboo frame circles, mapped as ellipses on the cone
  const RINGS = 7;
  for (let r = 1; r <= RINGS; r++) {
    const t  = r / RINGS;                     // 0 = tip, 1 = brim
    const ry = -height * (1 - t);             // y position on cone
    const rw = brimW * t * 0.97;              // ring x-radius at this height
    const rh = Math.max(rw * rimH / brimW, size * 0.015);
    const ringAlpha = 0.28 + (1 - t) * 0.14; // rings near tip slightly stronger
    ctx.beginPath();
    ctx.ellipse(0, ry, rw, rh, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(142, 112, 52, ${ringAlpha})`;
    ctx.lineWidth = size * 0.020;
    ctx.stroke();
  }

  // Radial ribs — the bamboo spokes, curved to follow cone surface
  const RIBS = 14;
  for (let r = 0; r < RIBS; r++) {
    const a  = (r / RIBS) * Math.PI * 2;
    const bx = Math.cos(a) * brimW;
    const by = Math.sin(a) * rimH;
    ctx.beginPath();
    ctx.moveTo(0, -height * 0.94);
    ctx.quadraticCurveTo(bx * 0.52, by * 0.55 - height * 0.40, bx, by);
    ctx.strokeStyle = 'rgba(135, 105, 48, 0.18)';
    ctx.lineWidth = size * 0.016;
    ctx.stroke();
  }

  ctx.restore();

  // ── Cone outline — gives clean edge ───────────────────────────────────────
  traceCone();
  ctx.strokeStyle = 'rgba(158, 130, 72, 0.50)';
  ctx.lineWidth = size * 0.028;
  ctx.stroke();

  // ── Brim — thick ring showing hat depth ───────────────────────────────────
  // Underside of brim (gives the hat real thickness)
  ctx.beginPath();
  ctx.ellipse(0, rimH * 0.55, brimW * 0.97, rimH * 0.80, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(162, 138, 82, 0.60)';
  ctx.fill();

  // Top surface of brim ellipse
  ctx.beginPath();
  ctx.ellipse(0, 0, brimW, rimH, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(218, 198, 145, 0.78)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(185, 158, 88, 0.85)';
  ctx.lineWidth = size * 0.042;
  ctx.stroke();

  // ── Apex knot — the tied tip ──────────────────────────────────────────────
  ctx.beginPath();
  ctx.arc(0, -height * 0.97, size * 0.042, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(138, 105, 48, 0.88)';
  ctx.fill();

  ctx.restore();
}

// ─── Seated figure (rowing) ───────────────────────────────────────────────────
// rowT: -1 → finish (blade lifted), +1 → catch (blade in water).
// The right arm + paddle shaft animates through a full stroke cycle.

function drawFigure(ctx, x, y, size, alpha, rowT) {
  ctx.save();
  ctx.globalAlpha = alpha;

  const headR = size * 0.145;
  const headY = y - size * 0.22;

  // Torso — leans slightly forward at catch, back at finish
  ctx.save();
  ctx.translate(x, headY + headR * 2.1);
  ctx.rotate(rowT * 0.09);
  ctx.beginPath();
  ctx.ellipse(0, 0, headR * 0.80, headR * 1.25, 0, 0, Math.PI);
  ctx.fillStyle = 'rgba(155, 112, 70, 0.72)';
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(155, 112, 70, 0.60)';
  ctx.lineWidth = size * 0.052;
  ctx.lineCap = 'round';

  // Left arm — resting on rim, mostly still
  ctx.beginPath();
  ctx.moveTo(x - headR * 0.55, headY + headR * 1.7);
  ctx.quadraticCurveTo(x - headR * 2.0, headY + headR * 2.6, x - size * 0.50, headY + headR * 2.8);
  ctx.stroke();

  // Side-stroke paddle — blade stays on the right side of the boat.
  // Primary motion is vertical (dip in / lift out); tiny horizontal shift for realism.
  //   catch  (rowT=+1): blade deep in water, right side, oar angled forward-down
  //   finish (rowT=-1): blade lifted clear, oar angled back-up
  //
  // Grip (hand near middle of oar shaft, held at torso height)
  const gripX = x + size * (0.28 + 0.06 * rowT);   // 0.22 → 0.34, barely moves
  const gripY = y + size * (-0.06 + 0.04 * rowT);   // stays near waterline
  // Blade (tip of oar — mostly up/down, small forward-back arc)
  const bladeX = x + size * (0.64 + 0.10 * rowT);   // 0.54 → 0.74, slight sweep
  const bladeY = y + size * (0.10 + 0.46 * rowT);   // -0.36 (lifted) → +0.56 (in water)

  // shoulder → grip
  ctx.beginPath();
  ctx.moveTo(x + headR * 0.45, headY + headR * 2.3);
  ctx.quadraticCurveTo(
    (x + headR * 0.45 + gripX) * 0.5, headY + headR * 1.6,
    gripX, gripY
  );
  ctx.stroke();

  // paddle shaft: grip → blade
  ctx.beginPath();
  ctx.moveTo(gripX, gripY);
  ctx.lineTo(bladeX, bladeY);
  ctx.stroke();

  // paddle blade — rotates to align with shaft direction
  const shaftAngle = Math.atan2(bladeY - gripY, bladeX - gripX) + Math.PI / 2;
  ctx.save();
  ctx.translate(bladeX, bladeY);
  ctx.rotate(shaftAngle);
  ctx.beginPath();
  ctx.ellipse(0, 0, headR * 0.50, headR * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(130, 92, 44, 0.70)';
  ctx.fill();
  ctx.restore();

  // Head — drawn before hat so brim overlaps top of head naturally
  ctx.beginPath();
  ctx.arc(x, headY, headR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(188, 145, 98, 0.88)';
  ctx.fill();
  // Subtle neck / face shading
  ctx.beginPath();
  ctx.arc(x, headY, headR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(158, 118, 72, 0.35)';
  ctx.lineWidth = size * 0.028;
  ctx.stroke();

  // Hat — tilted back as worn, brim seated on upper head so face shows below
  // Slight backward lean (-0.20 rad ≈ 11°) + small reactive wobble with rowing
  const hatTilt = -0.20 + rowT * 0.06;
  drawNonLa(ctx, x, headY - headR * 0.12, size * 0.53, alpha, hatTilt);

  ctx.restore();
}

// ─── Water ripples ────────────────────────────────────────────────────────────
// Two overlapping sine-wave bands radiating from waterline — ebb and flow.

function drawWaterRipples(ctx, cx, waterY, boatW, time, phase, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.52;

  for (let l = 0; l < 4; l++) {
    const spread    = boatW * (3.2 + l * 0.9);   // wide surface, extending well past boat
    const amp       = 4.5 + l * 1.8;              // much taller waves
    const spatFreq  = 0.012 + l * 0.003;
    const tempSpeed = 0.00082 + l * 0.00024;
    const yBase     = waterY + l * 4.5;
    const lAlpha    = (1 - l / 4) * 0.58;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(130, 185, 218, ${lAlpha})`;
    ctx.lineWidth = 0.75;

    for (let s = 0; s <= 64; s++) {
      const t  = s / 64;
      const px = cx - spread + t * spread * 2;
      const py = yBase + amp * Math.sin(spatFreq * (px - cx) + time * tempSpeed + phase + l * 0.85);
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  ctx.restore();
}

// ─── Wave path helpers ────────────────────────────────────────────────────────
// Boats ride two superimposed waves → non-linear, irregular up/down journey.

function getWaveY(baseY, x, time, b) {
  const w1 = b.w1Amp * Math.sin(b.w1Freq * x + time * b.w1Speed + b.phase * Math.PI * 2);
  const w2 = b.w2Amp * Math.sin(b.w2Freq * x + time * b.w2Speed + b.phase * Math.PI * 1.618);
  return baseY + w1 + w2;
}

// Tilt = arctan of wave slope at x so the boat leans with the wave
function getWaveTilt(x, time, b) {
  const d1 = b.w1Amp * b.w1Freq * Math.cos(b.w1Freq * x + time * b.w1Speed + b.phase * Math.PI * 2);
  const d2 = b.w2Amp * b.w2Freq * Math.cos(b.w2Freq * x + time * b.w2Speed + b.phase * Math.PI * 1.618);
  return Math.atan((d1 + d2) * 0.38);
}

// ─── Boat data ────────────────────────────────────────────────────────────────
// Positioned near the top of the page (yR 9–16%), drifting right → left.

const BOATS = Array.from({ length: 3 }, (_, i) => ({
  yR:       0.09 + i * 0.035,    // 9%, 12.5%, 16% — near the header
  speed:    0.020 + i * 0.007,   // px/ms horizontal drift
  phase:    (i * 0.618033) % 1,
  size:     24 + i * 6,           // 24 / 30 / 36 px
  // Primary wave — large slow swell (bigger up/down)
  w1Amp:    20 + i * 5,
  w1Freq:   0.0048 + i * 0.0010,
  w1Speed:  0.00052 + i * 0.00014,
  // Secondary wave — shorter chop for non-linearity
  w2Amp:    9 + i * 3,
  w2Freq:   0.0085 + i * 0.0016,
  w2Speed:  0.00090 + i * 0.00024,
  alpha:    0.62 + i * 0.05,
  // Rowing cycle
  rowSpeed: 0.00085 + i * 0.00010,
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function VietnameseBoatCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, rafId;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time) {
      ctx.clearRect(0, 0, W, H);

      for (const b of BOATS) {
        const span = W + b.size * 4;
        const x    = W + b.size * 2 - (time * b.speed + b.phase * span) % span;
        const baseY = b.yR * H;
        const y     = getWaveY(baseY, x, time, b);
        const tilt  = getWaveTilt(x, time, b);

        const rowT = Math.sin(time * b.rowSpeed + b.phase * Math.PI * 2);

        // Water ripples — wide surface around boat
        drawWaterRipples(ctx, x, y + b.size * 0.35, b.size * 1.05, time, b.phase * Math.PI * 2, b.alpha);

        // Boat + figure, tilted with wave slope
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tilt);
        drawThungChai(ctx, 0, 0, b.size, b.alpha);
        drawFigure(ctx, 0, 0, b.size, b.alpha * 0.95, rowT);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const initTimer = setTimeout(() => {
      resize();
      rafId = requestAnimationFrame(draw);
    }, 0);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
