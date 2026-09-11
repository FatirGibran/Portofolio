import { AUDIO_PRESETS } from './audioConstants';

/**
 * Singleton Web Audio Synthesizer
 * Reuses a single AudioContext instance and prevents memory leaks / context exhaustion.
 */
let sharedAudioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playSynthesizedChime(type = 'success') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const preset = AUDIO_PRESETS[type] || AUDIO_PRESETS.success;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = preset.type;
    osc.frequency.setValueAtTime(preset.startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(preset.endFreq, now + preset.rampDuration);

    gain.gain.setValueAtTime(preset.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + preset.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + preset.duration);

    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {}
    }, 350);
  } catch {}
}

    // Autoplay policy or unsupported audio
  }
}
