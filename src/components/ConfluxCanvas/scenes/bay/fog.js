export function drawFog(ctx, { W, H, alpha, time }) {
  // Each wisp lashes in and recedes on its own cycle.
  // presence = sin²(cycleSpeed·t + cyclePhase) — positive half only, squared for a punchy peak.
  const wisps = [
    { y: H * 0.07, h: H * 0.14, speed: 0.016, amp: 12, freq: 3, phase: 0.0, cycleSpeed: 0.00065, cyclePhase: 0.0 },
    { y: H * 0.17, h: H * 0.12, speed: 0.011, amp:  9, freq: 4, phase: 1.8, cycleSpeed: 0.00050, cyclePhase: 2.3 },
    { y: H * 0.26, h: H * 0.10, speed: 0.020, amp: 15, freq: 2, phase: 3.5, cycleSpeed: 0.00080, cyclePhase: 4.7 },
  ];

  for (const w of wisps) {
    const presence = Math.max(0, Math.sin(time * w.cycleSpeed + w.cyclePhase)) ** 2;
    if (presence < 0.01) continue;

    const shift = time * w.speed;
    const grad  = ctx.createLinearGradient(0, w.y - w.h * 0.3, 0, w.y + w.h);
    grad.addColorStop(0,    'rgba(175,190,230,0)');
    grad.addColorStop(0.35, 'rgba(175,190,230,0.10)');
    grad.addColorStop(1,    'rgba(175,190,230,0)');

    ctx.globalAlpha = alpha * presence;
    ctx.fillStyle   = grad;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 8) {
      const y = w.y + w.amp * Math.sin((px / W) * Math.PI * w.freq + shift + w.phase);
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.lineTo(W, w.y + w.h * 2);
    ctx.lineTo(0,  w.y + w.h * 2);
    ctx.closePath();
    ctx.fill();
  }
}
