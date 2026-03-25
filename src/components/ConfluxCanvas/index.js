import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import {
  SCENES,
  SCENE_DURATION, TRANSITION_MS,
  PARTICLE_COUNT, AMBIENT_START,
  SPRING, DAMPING, CURSOR_RADIUS, CURSOR_FORCE,
} from './constants';
import { lerpColor, rgbStr, clamp } from './utils';
import * as peacockScene from './scenes/india';
import * as yipengScene  from './scenes/thailand';
import * as bayScene     from './scenes/bay';

// Pair each scene config with its module.
// To disable a scene, set `enabled: false` in constants.js — no changes needed here.
const ALL_SCENES = [
  { ...SCENES[1], module: peacockScene },
  { ...SCENES[3], module: yipengScene  },
  { ...SCENES[4], module: bayScene     },
].filter(s => s.enabled);

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConfluxCanvas() {
  const canvasRef = useRef(null);
  const labelRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, cx, cy;
    let rafId;
    let sceneIndex      = 0;
    let sceneStartTime  = performance.now();
    let transitioning   = false;
    let transitionStart = 0;
    let nextSceneIndex  = 1;
    let mouseX = -999;
    let mouseY = -999;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      cx = W / 2;
      cy = H / 2;
    }

    // ── Particle pool ─────────────────────────────────────────────────────────
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * 800, y: Math.random() * 600,
      vx: 0, vy: 0, tx: 0, ty: 0,
      color:         [223, 169, 20],
      targetColor:   [223, 169, 20],
      alpha:         i >= AMBIENT_START ? 0.07 : 0.88,
      size:          i >= AMBIENT_START ? 1.2  : 2.5,
      isFloating:    false, floatSpeed: 0, swayAmp: 0, swayFreq: 0, swayPhase: 0,
      isStreaming:   false, streamLineIdx: 0, streamPhase: 0, phaseSpeed: 0, validLines: null,
      angularVel:    0, orbitR: 0, baseAngle: 0, orbitCx: 0, orbitCy: 0,
      isNode:        false, isPeacock: false,
    }));

    // ── Assign scene ──────────────────────────────────────────────────────────
    function assignScene(sIdx) {
      resize();
      const scene     = ALL_SCENES[sIdx];
      const palette   = [scene.primaryColor, scene.secondaryColor, scene.accentColor];
      const positions = scene.module.formation(cx, cy, W, H);

      for (let i = 0; i < AMBIENT_START; i++) {
        const p   = particles[i];
        const pos = positions[i] ?? {
          x: cx + (Math.random() - 0.5) * W * 0.8,
          y: cy + (Math.random() - 0.5) * H * 0.8,
          size: 2, colorIndex: 0,
        };

        // Reset mode flags before applying new scene
        p.isFloating  = false;
        p.isStreaming = false;
        p.angularVel  = 0;
        p.isPeacock   = false;

        if (pos.isFloating) {
          p.isFloating = true;
          p.floatSpeed = pos.floatSpeed;
          p.swayAmp    = pos.swayAmp;
          p.swayFreq   = pos.swayFreq;
          p.swayPhase  = pos.swayPhase;
          p.x = pos.x; p.y = pos.y; p.vx = 0; p.vy = 0;
        } else if (pos.isStreaming) {
          p.isStreaming   = true;
          p.streamLineIdx = pos.streamLineIdx;
          p.streamPhase   = pos.streamPhase;
          p.phaseSpeed    = pos.phaseSpeed;
          p.validLines    = pos.validLines;
          p.tx = pos.x; p.ty = pos.y;
        } else {
          p.tx = pos.x; p.ty = pos.y;
        }

        p.targetColor = pos.directColor ?? palette[pos.colorIndex ?? 0];
        p.size        = pos.size ?? 2.5;
        p.alpha       = 0.88;
        if (pos.isPeacock)            p.isPeacock = true;
        if (pos.isNode !== undefined) p.isNode    = pos.isNode;
      }

      for (let i = AMBIENT_START; i < PARTICLE_COUNT; i++) {
        particles[i].tx          = Math.random() * W;
        particles[i].ty          = Math.random() * H;
        particles[i].targetColor = palette[Math.floor(Math.random() * 3)];
        particles[i].isFloating  = false;
        particles[i].isStreaming = false;
        particles[i].angularVel  = 0;
      }
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    let time = 0;

    function loop(now) {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min(now - (loop.last ?? now), 50);
      loop.last = now;
      time += dt;

      // Scene transition timing
      const elapsed = now - sceneStartTime;
      if (!transitioning && elapsed > SCENE_DURATION - TRANSITION_MS) {
        transitioning   = true;
        transitionStart = now;
        nextSceneIndex  = (sceneIndex + 1) % ALL_SCENES.length;
        assignScene(nextSceneIndex);
      }
      if (transitioning) {
        const t = Math.min((now - transitionStart) / TRANSITION_MS, 1);
        if (t >= 1) {
          transitioning  = false;
          sceneIndex     = nextSceneIndex;
          sceneStartTime = now;
        }
        if (labelRef.current) {
          labelRef.current.style.opacity = t < 0.5
            ? String(1 - t * 2)
            : String((t - 0.5) * 2);
          if (t >= 0.5) labelRef.current.textContent = ALL_SCENES[nextSceneIndex].label;
        }
      } else if (labelRef.current) {
        labelRef.current.textContent   = ALL_SCENES[sceneIndex].label;
        labelRef.current.style.opacity = '1';
      }

      ctx.clearRect(0, 0, W, H);

      // Alpha of the outgoing scene (1 → 0) and incoming scene (0 → 1)
      const outAlpha = transitioning
        ? Math.max(0, 1 - (now - transitionStart) / TRANSITION_MS)
        : 1;
      const inAlpha = 1 - outAlpha;

      const sharedCtx = { cx, cy, W, H, time };
      const curScene  = ALL_SCENES[sceneIndex];
      const nxtScene  = ALL_SCENES[nextSceneIndex];

      // Background layers
      curScene.module.drawLayer(ctx, { ...sharedCtx, alpha: outAlpha, scene: curScene });
      if (transitioning) {
        nxtScene.module.drawLayer(ctx, { ...sharedCtx, alpha: inAlpha, scene: nxtScene });
      }

      // Structural connector lines
      curScene.module.drawConnectors(ctx, { ...sharedCtx, alpha: outAlpha, particles, AMBIENT_START, scene: curScene });
      if (transitioning) {
        nxtScene.module.drawConnectors(ctx, { ...sharedCtx, alpha: inAlpha, particles, AMBIENT_START, scene: nxtScene });
      }

      // Tick animated formation targets (optional — only peacock exports this)
      if (curScene.module.tickFormation) {
        curScene.module.tickFormation(particles, AMBIENT_START, { cx, cy, H, time });
      }

      // Particle update + draw
      const activeScene = ALL_SCENES[sceneIndex];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.color = lerpColor(p.color, p.targetColor, 0.025);

        if (p.isFloating) {
          // Yi Peng lanterns drift up (positive floatSpeed);
          // Parijat flowers fall down (negative floatSpeed).
          p.y -= p.floatSpeed;
          p.x += p.swayAmp * Math.sin(p.swayFreq * time + p.swayPhase) * 0.016;
          if (p.floatSpeed > 0 && p.y < -20)    { p.y = H + 10; p.x = Math.random() * W; }
          if (p.floatSpeed < 0 && p.y > H + 20) { p.y = -10;    p.x = Math.random() * W; }

        } else if (p.isStreaming && p.validLines) {
          p.streamPhase = (p.streamPhase + p.phaseSpeed) % 1;
          const line = p.validLines[p.streamLineIdx];
          if (line && line.length > 1) {
            const ptIdx  = Math.floor(p.streamPhase * line.length);
            const pt     = line[ptIdx] ?? line[line.length - 1];
            p.tx = pt.x; p.ty = pt.y;
            const r      = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
            const R      = W * 0.16;
            const speedT = clamp((R / (r + 0.001)) * 1.6 - 0.5, 0, 1);
            p.targetColor = lerpColor(activeScene.secondaryColor, activeScene.accentColor, speedT);
            p.size        = 1.5 + speedT * 1.8;
          }
          p.vx = (p.vx + (p.tx - p.x) * SPRING * 1.4) * DAMPING;
          p.vy = (p.vy + (p.ty - p.y) * SPRING * 1.4) * DAMPING;
          p.x += p.vx; p.y += p.vy;

        } else {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx = (p.vx + dx * SPRING) * DAMPING;
          p.vy = (p.vy + dy * SPRING) * DAMPING;

          // Cursor repulsion
          const cdx  = p.x - mouseX;
          const cdy  = p.y - mouseY;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (dist < CURSOR_RADIUS && dist > 0.1) {
            const force = (CURSOR_FORCE * (CURSOR_RADIUS - dist)) / CURSOR_RADIUS;
            p.vx += (cdx / dist) * force;
            p.vy += (cdy / dist) * force;
          }
          p.x += p.vx; p.y += p.vy;
        }

        const a = i >= AMBIENT_START ? 0.07 : p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgbStr(p.color, a);
        ctx.fill();

        // Soft glow halo on floating particles and large scene particles
        if (p.isFloating || (p.size > 3.5 && i < AMBIENT_START)) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = rgbStr(p.color, a * 0.11);
          ctx.fill();
        }
      }
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    resize();
    assignScene(sceneIndex);
    for (let i = AMBIENT_START; i < PARTICLE_COUNT; i++) {
      particles[i].tx = Math.random() * W; particles[i].ty = Math.random() * H;
      particles[i].x  = Math.random() * W; particles[i].y  = Math.random() * H;
    }
    rafId = requestAnimationFrame(loop);

    // ── Event listeners ───────────────────────────────────────────────────────
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -999; mouseY = -999; };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => { resize(); assignScene(sceneIndex); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={labelRef} className={styles.label} aria-hidden="true" />
    </div>
  );
}
