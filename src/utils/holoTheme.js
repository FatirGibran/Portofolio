/**
 * Holographic Foil Gradients & 3D DevPass Configurations
 */

export const FOIL_GRADIENTS = {
  prism: 'linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.6) 35%, rgba(56,189,248,0.5) 48%, rgba(236,72,153,0.5) 55%, rgba(250,204,21,0.5) 62%, transparent 85%)',
  gold: 'linear-gradient(115deg, transparent 15%, rgba(254,240,138,0.7) 35%, rgba(234,179,8,0.6) 50%, rgba(254,240,138,0.8) 65%, transparent 85%)',
  matrix: 'linear-gradient(115deg, transparent 15%, rgba(110,231,183,0.6) 35%, rgba(16,185,129,0.7) 50%, rgba(52,211,153,0.6) 65%, transparent 85%)',
  cyber: 'linear-gradient(115deg, transparent 15%, rgba(168,85,247,0.6) 35%, rgba(59,130,246,0.6) 50%, rgba(236,72,153,0.6) 65%, transparent 85%)',
};

export const DEVPASS_SPECS = {
  idNumber: 'FG-2024-TELKOM-IF',
  clearanceLevel: 'CLEARANCE: ROOT LV.5',
  shaSignature: 'SHA256: 7F4A-99B1-FATIR-GIBRAN-OK',
  barcodeWidths: [3,1,4,2,1,3,1,2,4,1,2,3,1,4,2,1,3,2,1,3,4,1,2,1],
  coreStack: ['React 19', 'Go / Golang', 'Edge AI', 'FastAPI', 'AES-128', 'WASM'],
};
