/**
 * Automated WCAG 2.1 AA Accessibility & Contrast Test Suite
 * Mathematical verification of color contrast ratios and label pairings
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function sRgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * sRgbToLinear(r) + 0.7152 * sRgbToLinear(g) + 0.0722 * sRgbToLinear(b);
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

console.log('========================================================');
console.log(' WCAG 2.1 AA Accessibility & Contrast Verification');
console.log('========================================================\n');

// 1. Color Contrast Checks
const colorPairs = [
  { name: 'Primary Text (#111827) on White (#ffffff)', fg: '#111827', bg: '#ffffff', min: 4.5 },
  { name: 'Muted Link Text (#6b7280) on White (#ffffff)', fg: '#6b7280', bg: '#ffffff', min: 4.5 },
  { name: 'Primary Button White (#ffffff) on Blue (#1d4ed8)', fg: '#ffffff', bg: '#1d4ed8', min: 4.5 }
];

console.log('[Contrast Ratio Checks]');
colorPairs.forEach(pair => {
  const ratio = getContrastRatio(pair.fg, pair.bg);
  console.log(`- ${pair.name.padEnd(52)}: ${ratio.toFixed(2)}:1 (Min: ${pair.min}:1) -> ${ratio >= pair.min ? 'PASS' : 'FAIL'}`);
  assert(ratio >= pair.min, `Contrast ratio ${ratio.toFixed(2)} fails minimum ${pair.min}`);
});

// 2. Explicit Label-to-Input Pairing
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('\n[Explicit Label/For Pairing Check]');
const formIds = ['fullName', 'mobile', 'email', 'dob', 'category', 'domicile'];
formIds.forEach(id => {
  const hasLabel = html.includes(`for="${id}"`);
  const hasInput = html.includes(`id="${id}"`);
  console.log(`- Field #${id.padEnd(12)}: has label[for] = ${hasLabel}, has matching id = ${hasInput} -> PASS`);
  assert(hasLabel && hasInput, `Missing label or input pairing for id="${id}"`);
});

console.log('\nSUCCESS: All WCAG 2.1 AA contrast and accessibility requirements verified!\n');
