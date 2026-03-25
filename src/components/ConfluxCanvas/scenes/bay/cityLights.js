export function drawCityLights(ctx, { W, H, alpha, time, roadY }) {
  // Shore lights sit above the hill ridgeline (hills peak at ~roadY - H*0.09).
  // Bay reflections are in the open water zone below the bridge.
  const lights = [
    // SF shoreline — left edge, nestled above hill peaks
    [0.04, 0.44], [0.08, 0.42], [0.13, 0.39], [0.18, 0.38], [0.23, 0.42],
    // Marin / North Bay shoreline — right edge
    [0.77, 0.38], [0.82, 0.37], [0.87, 0.35], [0.92, 0.40], [0.96, 0.43],
    // Bay water reflections — open water below bridge
    [0.48, 0.82], [0.56, 0.80], [0.64, 0.76], [0.72, 0.72],
  ];

  for (let i = 0; i < lights.length; i++) {
    const [lxR, lyR] = lights[i];
    const phase  = lxR * 13.1 + lyR * 7.9 + i * 2.3;
    const speed  = 0.00070 + lxR * 0.00030;
    const breath = 0.5 + 0.5 * Math.sin(time * speed + phase);
    const flare  = Math.max(0, Math.sin(time * speed * 2.7 + phase * 1.4)) ** 5;
    const t      = Math.min(1, breath * 0.85 + flare * 0.15);

    const lx           = lxR * W;
    const ly           = lyR * H;
    const isReflection = lyR > 0.65;
    const radius       = (isReflection ? 7 : 5) + t * 4;

    // Shore glow: warm amber-white. Reflections: cooler indigo shimmer.
    const inner = isReflection ? 'rgba(140,155,230,0.95)' : 'rgba(255,230,160,0.95)';
    const outer = isReflection ? 'rgba(100,115,210,0)'    : 'rgba(255,200,100,0)';

    const grd = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius);
    grd.addColorStop(0, inner);
    grd.addColorStop(1, outer);
    ctx.globalAlpha = alpha * (0.30 + t * 0.40);
    ctx.fillStyle   = grd;
    ctx.beginPath();
    ctx.arc(lx, ly, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
