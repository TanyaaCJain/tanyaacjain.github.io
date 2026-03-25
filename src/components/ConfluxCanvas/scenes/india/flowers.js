// ─── Parijat (night jasmine) data ─────────────────────────────────────────────
// Deterministic — golden-ratio x spacing, no Math.random in render loop.

const PARIJAT = Array.from({ length: 13 }, (_, i) => ({
  xR:       (i * 0.618033) % 1,
  speed:    0.038 + (i % 5) * 0.010,
  phase:    (i * 0.618033) % 1,
  size:     7 + (i % 3) * 3,
  rotSpeed: 0.00020 + (i % 4) * 0.00012,
  rotPhase: i * 1.732,
  swayAmp:  16 + (i % 4) * 9,
  swayFreq: 0.00090 + (i % 3) * 0.00035,
}));

const JASMINE_Y = [0.12, 0.30, 0.49, 0.67, 0.84];

function vineX(side, yFrac, W, time) {
  return W * (side === 0 ? 0.12 : 0.88)
    + W * 0.03 * Math.sin(yFrac * Math.PI * 2.6 + time * 0.00032 + side * Math.PI);
}

function drawParijatFlower(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  // 6 narrow petals — distinctively elongated
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i / 6) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.68, size * 0.18, size * 0.40, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(253,250,240,0.88)';
    ctx.fill();
    ctx.restore();
  }
  // Vivid orange-red tubular centre
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.32);
  grd.addColorStop(0,   'rgba(245,105,15,1)');
  grd.addColorStop(0.5, 'rgba(215,65,10,1)');
  grd.addColorStop(1,   'rgba(180,35,5,0)');
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.restore();
}

function drawJasmineFlower(ctx, x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  // 5 rounded petals
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.52, size * 0.32, size * 0.50, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,252,0.90)';
    ctx.fill();
    ctx.restore();
  }
  // Yellow stamen centre
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.28);
  grd.addColorStop(0,   'rgba(255,225,30,1)');
  grd.addColorStop(0.5, 'rgba(230,190,20,0.9)');
  grd.addColorStop(1,   'rgba(200,160,10,0)');
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.restore();
}

// ─── Public draw functions ────────────────────────────────────────────────────

export function drawFallingParijat(ctx, { W, H, alpha, time }) {
  for (const f of PARIJAT) {
    const span = H + f.size * 4;
    const y    = (time * f.speed + f.phase * span) % span - f.size * 2;
    const x    = f.xR * W + f.swayAmp * Math.sin(time * f.swayFreq + f.phase * Math.PI * 2);
    ctx.globalAlpha = alpha * 0.82;
    drawParijatFlower(ctx, x, y, f.size, time * f.rotSpeed + f.rotPhase);
  }
}

export function drawJasmineVines(ctx, { W, H, alpha, time }) {
  for (let side = 0; side < 2; side++) {
    // Vine stem
    ctx.globalAlpha = alpha * 0.28;
    ctx.strokeStyle = 'rgba(55,100,48,1)';
    ctx.lineWidth   = 1.4;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const yFrac = i / 60;
      const y = H * 0.05 + yFrac * H * 0.90;
      const x = vineX(side, yFrac, W, time);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Flowers along vine
    for (let j = 0; j < JASMINE_Y.length; j++) {
      const yFrac = JASMINE_Y[j];
      const y     = H * 0.05 + yFrac * H * 0.90;
      const x     = vineX(side, yFrac, W, time);
      ctx.globalAlpha = alpha * 0.86;
      drawJasmineFlower(ctx, x, y, 9 + (j % 3) * 2, time * 0.00008 + j * 1.26 + side * 0.8);
    }
  }
}
