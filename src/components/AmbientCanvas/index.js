import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

// ─── Goldenberry (Physalis peruviana) — papery 5-lobed husk, not a flower ────
// Each lobe is a bezier lanceolate shape with a central rib and lateral veins.
// Light fill (18% opacity) gives the papery, cage-like transparency.

function drawGoldenberry(ctx, x, y, size, rotation, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;

  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2 + Math.PI / 10);

    const tipY  = -size;
    const baseW = size * 0.34;
    const midW  = size * 0.26;

    // Lobe silhouette: pointed tip, widest at mid, tapers back to centre base
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo( baseW * 0.85, -size * 0.18,  midW, -size * 0.62, 0, tipY);
    ctx.bezierCurveTo(-midW,         -size * 0.62, -baseW * 0.85, -size * 0.18, 0, 0);
    ctx.fillStyle   = 'rgba(218, 155, 22, 0.18)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(200, 138, 16, 0.60)';
    ctx.lineWidth   = size * 0.045;
    ctx.stroke();

    // Central rib
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.08);
    ctx.lineTo(0, tipY * 0.88);
    ctx.strokeStyle = 'rgba(162, 112, 10, 0.48)';
    ctx.lineWidth   = size * 0.034;
    ctx.stroke();

    // 2 pairs of lateral veins
    for (let v = 1; v <= 2; v++) {
      const vy = -size * (0.26 + v * 0.24);
      const vx = midW * (1 - v * 0.28) * 0.75;
      ctx.strokeStyle = 'rgba(162, 112, 10, 0.26)';
      ctx.lineWidth   = size * 0.024;
      ctx.beginPath();
      ctx.moveTo(0, vy);
      ctx.quadraticCurveTo( vx * 0.55, vy - size * 0.07,  vx, vy - size * 0.03);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, vy);
      ctx.quadraticCurveTo(-vx * 0.55, vy - size * 0.07, -vx, vy - size * 0.03);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Amber berry at centre (inside the cage)
  const g = ctx.createRadialGradient(0, -size * 0.04, 0, 0, 0, size * 0.19);
  g.addColorStop(0,   'rgba(255, 165, 25, 1)');
  g.addColorStop(0.6, 'rgba(218, 118, 12, 0.9)');
  g.addColorStop(1,   'rgba(170, 78, 5, 0)');
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.19, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.restore();
}

// ─── Agarwood blossom (Aquilaria) — 5 narrow lanceolate petals + stamen burst ─
// Petals drawn with bezier curves (pointed tips, not round ellipses).
// 12 stamen filaments with anther dots — the dominant visual feature.

function drawAgarwoodBlossom(ctx, x, y, size, rotation, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;

  // 5 narrow lanceolate petals
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);

    const tipY  = -size * 0.92;
    const baseW = size * 0.19;

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.10);
    ctx.bezierCurveTo( baseW,        -size * 0.28,  baseW * 0.65, -size * 0.70, 0, tipY);
    ctx.bezierCurveTo(-baseW * 0.65, -size * 0.70, -baseW,        -size * 0.28, 0, -size * 0.10);
    ctx.fillStyle   = 'rgba(242, 238, 208, 0.86)';
    ctx.fill();
    // faint midrib
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.12);
    ctx.lineTo(0, tipY * 0.90);
    ctx.strokeStyle = 'rgba(205, 196, 158, 0.40)';
    ctx.lineWidth   = size * 0.028;
    ctx.stroke();

    ctx.restore();
  }

  // Stamen filaments with anther dots
  for (let i = 0; i < 12; i++) {
    const a  = (i / 12) * Math.PI * 2;
    const r1 = size * 0.11;
    const r2 = size * 0.30;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
    ctx.strokeStyle = 'rgba(220, 168, 18, 0.88)';
    ctx.lineWidth   = size * 0.038;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r2, Math.sin(a) * r2, size * 0.042, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(198, 148, 14, 0.95)';
    ctx.fill();
  }

  // Centre disk
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.09, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(175, 135, 18, 0.92)';
  ctx.fill();

  ctx.restore();
}

// ─── Deterministic element data (golden-ratio spacing, no Math.random) ──────
// Even goldenberry indices fall left band, odd fall right band.
// All agarwood kept in side bands — nothing in the centre text column.

const GOLDENBERRY = Array.from({ length: 10 }, (_, i) => ({
  xRatio:        i % 2 === 0
                   ? (i * 0.618033) % 0.20          // left  0–20%
                   : 0.80 + (i * 0.618033) % 0.18,  // right 80–98%
  verticalSpeed: 0.024 + (i % 5) * 0.008,           // px per ms, downward
  phaseOffset:   (i * 0.618033) % 1,
  size:          10 + (i % 4) * 3,                  // 10–19px — large enough to read
  rotationSpeed: 0.00014 + (i % 3) * 0.00009,
  rotationPhase: i * 1.618,
  swayAmplitude: 20 + (i % 4) * 9,                  // horizontal sway range (px)
  swayFrequency: 0.00065 + (i % 3) * 0.00028,
}));

const AGARWOOD = Array.from({ length: 12 }, (_, i) => {
  const slot = i % 3;
  return {
    xRatio:        slot === 0 ? (i * 0.618033) % 0.22          // left  0–22%
                 : slot === 1 ? 0.76 + (i * 0.618033) % 0.22  // right 76–98%
                 :              0.80 + (i * 0.618033) % 0.18,  // also right (different offset)
    verticalSpeed: 0.016 + (i % 5) * 0.007,
    phaseOffset:   (i * 0.7071) % 1,
    size:          8 + (i % 4) * 2,                            // 8–14px
    rotationSpeed: 0.00009 + (i % 4) * 0.00007,
    rotationPhase: i * 2.236,
    swayAmplitude: 25 + (i % 3) * 12,
    swayFrequency: 0.00055 + (i % 4) * 0.00022,
  };
});

// ─── Component ───────────────────────────────────────────────────────────────

export default function AmbientCanvas() {
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

      for (const f of GOLDENBERRY) {
        const scrollSpan = H + f.size * 4;
        const y = (time * f.verticalSpeed + f.phaseOffset * scrollSpan) % scrollSpan - f.size * 2;
        if (y > H + f.size) continue; // element fully below canvas (briefly, during wrap)
        const x = f.xRatio * W + f.swayAmplitude * Math.sin(time * f.swayFrequency + f.phaseOffset * Math.PI * 2);
        drawGoldenberry(ctx, x, y, f.size, time * f.rotationSpeed + f.rotationPhase, 0.72);
      }

      for (const f of AGARWOOD) {
        const scrollSpan = H + f.size * 4;
        const y = (time * f.verticalSpeed + f.phaseOffset * scrollSpan) % scrollSpan - f.size * 2;
        if (y > H + f.size) continue;
        const x = f.xRatio * W + f.swayAmplitude * Math.sin(time * f.swayFrequency + f.phaseOffset * Math.PI * 2);
        drawAgarwoodBlossom(ctx, x, y, f.size, time * f.rotationSpeed + f.rotationPhase, 0.68);
      }

      rafId = requestAnimationFrame(draw);
    }

    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    ro.observe(canvas.parentElement);

    const initTimer = setTimeout(() => {
      resize();
      rafId = requestAnimationFrame(draw);
    }, 0);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
