// ─── Scene registry ───────────────────────────────────────────────────────────
// Set `enabled: false` on any entry to skip it in the rotation.

export const SCENES = [
  {
    id: 'neural', label: 'Generative AI', enabled: false,
    primaryColor:   [223, 169,  20],
    secondaryColor: [245, 240, 232],
    accentColor:    [180, 130,  10],
  },
  {
    id: 'peacock', label: 'India', enabled: true,
    primaryColor:   [  6, 182, 212],
    secondaryColor: [ 34, 197,  94],
    accentColor:    [ 99, 102, 241],
  },
  {
    id: 'circuit', label: 'Engineering', enabled: false,
    primaryColor:   [ 13, 148, 136],
    secondaryColor: [ 94, 234, 212],
    accentColor:    [ 20, 200, 180],
  },
  {
    id: 'yipeng', label: 'Thailand', enabled: false,
    primaryColor:   [245, 158,  11],
    secondaryColor: [251, 113, 133],
    accentColor:    [255, 200,  80],
  },
  {
    id: 'bay', label: 'San Francisco', enabled: false,
    primaryColor:   [ 99, 102, 241],
    secondaryColor: [226, 232, 240],
    accentColor:    [165, 180, 252],
  },
  {
    id: 'aero', label: 'Automotive', enabled: false,
    primaryColor:   [226, 232, 240],
    secondaryColor: [148, 163, 184],
    accentColor:    [223, 169,  20],
  },
];

// ─── Timing ───────────────────────────────────────────────────────────────────
export const SCENE_DURATION = 9000;   // ms each scene is held
export const TRANSITION_MS  = 2200;   // ms crossfade between scenes

// ─── Particle pool ────────────────────────────────────────────────────────────
export const PARTICLE_COUNT = 280;   // total particles
export const AMBIENT_START  = 210;   // [0..209] scene particles, [210..279] ambient

// ─── Physics ──────────────────────────────────────────────────────────────────
export const SPRING        = 0.038;
export const DAMPING       = 0.87;
export const CURSOR_RADIUS = 100;
export const CURSOR_FORCE  = 3.2;
