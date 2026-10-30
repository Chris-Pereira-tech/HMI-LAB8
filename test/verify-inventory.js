/**
 * Verification Test Suite for MHT CET UI Redesign
 * Asserts Shannon Screen Complexity Constraints & Element Inventory (N = 25)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const htmlLines = html.split(/\r?\n/).length;
const cssLines = css.split(/\r?\n/).length;

console.log('========================================================');
console.log(' MHT CET Redesign - Screen Complexity & Constraint Tests');
console.log('========================================================');

// Test 1: File Line Constraints
console.log(`\n[Line Constraints]`);
console.log(`- index.html line count: ${htmlLines} (Max allowed: ~150) -> ${htmlLines <= 150 ? 'PASS' : 'FAIL'}`);
console.log(`- styles.css line count: ${cssLines} (Max allowed: ~80)   -> ${cssLines <= 80 ? 'PASS' : 'FAIL'}`);

if (htmlLines > 150 || cssLines > 80) {
  console.error('\nFAIL: Line constraint exceeded.');
  process.exit(1);
}

// Test 2: Element Inventory Checks
const logoMatches = (html.match(/<span class="logo">.*?<\/span>/g) || []).length;
const navLinkMatches = (html.match(/<nav class="nav">[\s\S]*?<\/nav>/)[0].match(/<a\b/g) || []).length;
const labelForMatches = (html.match(/<label for="[^"]+">.*?<\/label>/g) || []).length;
const textInputMatches = (html.match(/<input\s+type="(text|tel|email)"/g) || []).length;
const selectMatches = (html.match(/<select\b/g) || []).length;
const radioMatches = (html.match(/<input\s+type="radio"/g) || []).length;
const checkboxMatches = (html.match(/<input\s+type="checkbox"/g) || []).length;
const buttonMatches = (html.match(/<button\b/g) || []).length;
const footerLinkMatches = (html.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0].match(/<a\b/g) || []).length;

const inventory = [
  { group: '1. Header Logo', count: logoMatches, expected: 1 },
  { group: '2. Navigation Links', count: navLinkMatches, expected: 4 },
  { group: '3. Field Labels', count: labelForMatches, expected: 6 },
  { group: '4. Text Inputs', count: textInputMatches, expected: 4 },
  { group: '5. Dropdowns', count: selectMatches, expected: 2 },
  { group: '6. Radio Buttons', count: radioMatches, expected: 2 },
  { group: '7. Checkbox', count: checkboxMatches, expected: 1 },
  { group: '8. Buttons', count: buttonMatches, expected: 2 },
  { group: '9. Footer Links', count: footerLinkMatches, expected: 3 },
];

console.log('\n[Element Inventory Verification]');
let totalElements = 0;
let allPass = true;

inventory.forEach((item) => {
  totalElements += item.count;
  const ok = item.count === item.expected;
  if (!ok) allPass = false;
  console.log(`- ${item.group.padEnd(25)}: ${item.count} / ${item.expected} [${ok ? 'OK' : 'MISMATCH'}]`);
});

console.log('--------------------------------------------------------');
console.log(`Total Visible Elements: ${totalElements} (Expected: 25) -> ${totalElements === 25 ? 'PASS' : 'FAIL'}`);

if (!allPass || totalElements !== 25) {
  console.error('\nFAIL: Exact element inventory N = 25 was not satisfied.');
  process.exit(1);
}

console.log('\nSUCCESS: All constraints and element inventory (N = 25) verified!\n');
