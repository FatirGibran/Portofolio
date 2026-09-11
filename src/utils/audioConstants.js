/**
 * Audio Synthesizer Frequency and Envelope Presets
 * Defines procedural oscillator frequencies and duration envelopes for procedural sound FX.
 */

export const AUDIO_PRESETS = {
  click: {
    type: 'triangle',
    startFreq: 1200,
    endFreq: 300,
    gain: 0.04,
    duration: 0.05,
    rampDuration: 0.04,
  },
  tab: {
    type: 'sine',
    startFreq: 659.25,
    endFreq: 880,
    gain: 0.05,
    duration: 0.08,
    rampDuration: 0.06,
  },
  toggle: {
    type: 'sine',
    startFreq: 440,
    endFreq: 880,
    gain: 0.05,
    duration: 0.1,
    rampDuration: 0.08,
  },
  modal: {
    type: 'sine',
    startFreq: 320,
    endFreq: 540,
    gain: 0.06,
    duration: 0.13,
    rampDuration: 0.1,
  },
  warn: {
    type: 'sawtooth',
    startFreq: 440,
    endFreq: 330,
    gain: 0.08,
    duration: 0.3,
    rampDuration: 0.28,
  },
  success: {
    type: 'sine',
    startFreq: 587.33,
    endFreq: 880,
    gain: 0.08,
    duration: 0.3,
    rampDuration: 0.22,
  },
  thock: {
    type: 'triangle',
    startFreq: 850,
    endFreq: 180,
    gain: 0.06,
    duration: 0.04,
    rampDuration: 0.035,
  },
};
