// ─── Feather gradient ─────────────────────────────────────────────────────────
// t ∈ [0,1]  (0 = quill base, 1 = tip)

export const GRAD_STOPS = [
  [0.00, [145,  90,  28]],   // warm metallic bronze
  [0.20, [110, 125,  32]],   // gold-green
  [0.45, [ 18,  85,  46]],   // deep forest green
  [0.72, [  6, 145, 108]],   // green-teal transition
  [1.00, [  6, 182, 212]],   // full iridescent teal
];

export function gradColor(t) {
  for (let i = 0; i < GRAD_STOPS.length - 1; i++) {
    const [t0, c0] = GRAD_STOPS[i];
    const [t1, c1] = GRAD_STOPS[i + 1];
    if (t <= t1) {
      const s = (t - t0) / (t1 - t0);
      return c0.map((v, j) => Math.round(v + s * (c1[j] - v)));
    }
  }
  return GRAD_STOPS[GRAD_STOPS.length - 1][1];
}

// ─── Teardrop path ────────────────────────────────────────────────────────────
// Pointed end at -rx (toward body), rounded bulge at +rx*0.70 (toward tip).
// Operates in caller's local transform space.

export function tearPath(ctx, rx, ry) {
  ctx.beginPath();
  ctx.moveTo(-rx, 0);
  ctx.bezierCurveTo(-rx * 0.35, -ry * 1.05,  rx * 0.55, -ry,  rx * 0.70,  0);
  ctx.bezierCurveTo( rx * 0.55,  ry * 1.05, -rx * 0.35,  ry * 1.05, -rx,  0);
  ctx.closePath();
}

// ─── Feather vane ─────────────────────────────────────────────────────────────
// Draws one feather: gradient ellipse vane + rachis + barbs.
// Local space: translate(mid) + rotate(angle) so +X points toward tip.

export function drawFeather(ctx, baseX, baseY, tipX, tipY, len, alpha, shimmer) {
  const angle = Math.atan2(tipY - baseY, tipX - baseX);
  const H2    = len / 2;

  ctx.save();
  ctx.translate((baseX + tipX) / 2, (baseY + tipY) / 2);
  ctx.rotate(angle);

  // Gradient vane ellipse — nudged toward tip so eye zone falls inside
  const vW    = H2 * 0.76;
  const vH    = len * 0.22;
  const vOffX = H2 * 0.12;
  const vg    = ctx.createLinearGradient(-vW + vOffX, 0, vW + vOffX, 0);
  vg.addColorStop(0.00, `rgba(145, 90, 28,${(alpha * 0.42).toFixed(3)})`);
  vg.addColorStop(0.20, `rgba(110,125, 32,${(alpha * 0.55).toFixed(3)})`);
  vg.addColorStop(0.45, `rgba( 18, 85, 46,${(alpha * (0.60 + shimmer * 0.18)).toFixed(3)})`);
  vg.addColorStop(0.72, `rgba(  6,145,108,${(alpha * (0.55 + shimmer * 0.20)).toFixed(3)})`);
  vg.addColorStop(1.00, `rgba(  6,182,212,${(alpha * 0.44).toFixed(3)})`);
  ctx.globalAlpha = 1;
  ctx.fillStyle   = vg;
  ctx.beginPath();
  ctx.ellipse(vOffX, 0, vW, vH, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rachis
  ctx.globalAlpha = alpha * 0.40;
  ctx.strokeStyle = 'rgba(70,115,36,1)';
  ctx.lineWidth   = 0.8;
  ctx.beginPath();
  ctx.moveTo(-H2, 0);
  ctx.lineTo( H2, 0);
  ctx.stroke();

  // Barbs — perpendicular strokes coloured by gradient position
  const BARBS  = 22;
  const maxBW  = len * 0.26;
  for (let b = 0; b < BARBS; b++) {
    const t  = b / (BARBS - 1);
    const lx = -H2 + t * len;
    const w  = maxBW * Math.exp(-8.5 * (t - 0.48) ** 2);
    if (w < 0.7) continue;
    const [r, g, bv] = gradColor(t);
    ctx.globalAlpha = alpha * (0.22 + shimmer * 0.20) * Math.sin(t * Math.PI);
    ctx.strokeStyle = `rgb(${r},${g},${bv})`;
    ctx.lineWidth   = 0.85;
    ctx.beginPath();
    ctx.moveTo(lx, -w);
    ctx.lineTo(lx,  w);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── Eye (ocellus) ────────────────────────────────────────────────────────────
// Layered filled teardrops (large → small) at the given world position.
// angle = direction along feather (+X toward tip); r = base radius.

export function drawEye(ctx, x, y, angle, r, alpha, shimmer) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const rx = r * 1.15;
  const ry = r * 0.84;

  // Backdrop glow
  ctx.globalAlpha = alpha * (0.20 + shimmer * 0.14);
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.4);
  glow.addColorStop(0,   'rgba(6,182,212,0.50)');
  glow.addColorStop(0.6, 'rgba(22,130,80,0.14)');
  glow.addColorStop(1,   'rgba(6,182,212,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 2.4, r * 2.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Layer 1 — deep teal-green
  ctx.globalAlpha = alpha * (0.55 + shimmer * 0.24);
  ctx.fillStyle   = 'rgba(22,130,80,1)';
  tearPath(ctx, rx, ry);
  ctx.fill();

  // Layer 2 — warm bronze
  ctx.globalAlpha = alpha * (0.72 + shimmer * 0.20);
  ctx.fillStyle   = 'rgba(162,108,10,1)';
  tearPath(ctx, rx * 0.76, ry * 0.76);
  ctx.fill();

  // Layer 3 — bright teal
  ctx.globalAlpha = alpha * (0.85 + shimmer * 0.14);
  ctx.fillStyle   = 'rgba(6,182,212,1)';
  tearPath(ctx, rx * 0.52, ry * 0.52);
  ctx.fill();

  // Layer 4 — dark navy centre
  ctx.globalAlpha = alpha * 0.96;
  ctx.fillStyle   = 'rgba(4,6,18,1)';
  tearPath(ctx, rx * 0.28, ry * 0.28);
  ctx.fill();

  // Specular highlight
  ctx.globalAlpha = alpha * (0.32 + shimmer * 0.42);
  ctx.fillStyle   = 'rgba(215,242,255,1)';
  ctx.beginPath();
  ctx.arc(rx * 0.06, -ry * 0.16, r * 0.09, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
