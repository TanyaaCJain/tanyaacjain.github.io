export function drawTraffic(ctx, { alpha, time, roadY, anchorX_L, anchorX_R }) {
  const span    = anchorX_R - anchorX_L;
  const laneOff = 3;   // px offset from road centre per lane

  // 9 vehicles per direction, evenly spaced, staggered by index
  const count = 9;
  for (let i = 0; i < count; i++) {
    // Eastbound (left→right) — headlights warm white, offset above road centre
    const xE = anchorX_L + ((time * 0.035 + i * (span / count)) % span);
    const yE  = roadY - laneOff;
    const gE  = ctx.createRadialGradient(xE, yE, 0, xE, yE, 5);
    gE.addColorStop(0, 'rgba(255,248,220,0.9)');
    gE.addColorStop(1, 'rgba(255,248,220,0)');
    ctx.globalAlpha = alpha * 0.55;
    ctx.fillStyle   = gE;
    ctx.beginPath(); ctx.arc(xE, yE, 5, 0, Math.PI * 2); ctx.fill();

    // Westbound (right→left) — taillights red, offset below road centre
    const xW = anchorX_R - ((time * 0.028 + i * (span / count)) % span);
    const yW  = roadY + laneOff;
    const gW  = ctx.createRadialGradient(xW, yW, 0, xW, yW, 4);
    gW.addColorStop(0, 'rgba(220,80,60,0.85)');
    gW.addColorStop(1, 'rgba(220,80,60,0)');
    ctx.globalAlpha = alpha * 0.45;
    ctx.fillStyle   = gW;
    ctx.beginPath(); ctx.arc(xW, yW, 4, 0, Math.PI * 2); ctx.fill();
  }
}
