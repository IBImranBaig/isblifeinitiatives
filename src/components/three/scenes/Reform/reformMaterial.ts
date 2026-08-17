import * as THREE from "three";

/**
 * The reform point shader — the Invitation bookend.
 *
 * Each particle begins scattered in the void (`position`) as drifting dust, then
 * on a staggered schedule eases toward its word target (`aEnd`), bowing along a
 * gentle arc, and settles into the formed word with a faint breathing twinkle.
 * The pre-form drift fades out as the word assembles. Ember-blue, additive, a
 * whisper — it must never out-shout the headline that sits over it.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uMorph;   // 0 = scattered dust, 1 = formed word
  attribute vec3 aEnd;
  attribute float aSeed;
  attribute float aScale;
  attribute float aDelay;  // 0..1 morph stagger
  varying float vTwinkle;

  float easeInOut(float t){
    return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) * 0.5;
  }

  void main() {
    // Staggered per-particle progress — the dust coalesces, it doesn't snap.
    float D = 0.5;
    float lt = clamp((uMorph - aDelay * D) / (1.0 - D), 0.0, 1.0);
    float e = easeInOut(lt);

    vec3 pos = mix(position, aEnd, e);

    // Gentle flight arc toward camera — calm convergence, never a collapse.
    float arc = sin(e * 3.14159265);
    pos.z += arc * (0.5 + aSeed * 0.9);

    // Pre-form drift: the scattered field breathes, then stills as it forms.
    float pre = 1.0 - e;
    pos.x += pre * sin(uTime * 0.24 + aSeed * 6.2831) * 0.20;
    pos.y += pre * cos(uTime * 0.20 + aSeed * 6.2831) * 0.20;

    // Settled micro-drift once the word has assembled — alive, not frozen.
    float settled = smoothstep(0.85, 1.0, lt);
    pos.x += settled * sin(uTime * 0.5 + aSeed * 6.2831) * 0.018;
    pos.y += settled * cos(uTime * 0.42 + aSeed * 6.2831) * 0.018;

    vTwinkle = 0.6 + 0.4 * sin(uTime * 1.2 + aSeed * 28.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (6.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorBright;
  uniform float uReveal;  // overall fade-in once the field wakes
  uniform float uBreath;  // slow breathing luminosity
  varying float vTwinkle;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 1.7);
    vec3 col = mix(uColorDeep, uColorBright, vTwinkle * 0.7);
    float alpha = core * uReveal * uBreath * (0.15 + 0.22 * vTwinkle);
    gl_FragColor = vec4(col, alpha);
  }
`;

export function createReformMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 16 },
      uMorph: { value: 0 },
      uReveal: { value: 0 },
      uBreath: { value: 1 },
      uColorDeep: { value: new THREE.Color("#2a4ea0") },
      uColorBright: { value: new THREE.Color("#a9c2ff") },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
