/**
 * Shannon Screen Complexity & Tullis Metrics Test Suite
 * Mathematical verification of Information Entropy (H) and Screen Complexity (C)
 */

const assert = require('assert');

// 6 Visual Groups mapped to their exact item counts
const visualGroups = [
  { id: 1, name: 'Header & Navigation', count: 5 },
  { id: 2, name: 'Personal Details', count: 8 },
  { id: 3, name: 'Exam Details', count: 6 },
  { id: 4, name: 'Declaration Checkbox', count: 1 },
  { id: 5, name: 'Form Buttons', count: 2 },
  { id: 6, name: 'Footer Links', count: 3 }
];

console.log('========================================================');
console.log(' Shannon Screen Complexity & Tullis (1983) Verification');
console.log('========================================================\n');

const N = visualGroups.reduce((acc, g) => acc + g.count, 0);
console.log(`Total Functional Elements (N): ${N} (Expected: 25)`);
assert.strictEqual(N, 25, 'Total visible elements must equal exactly 25');

// Compute Shannon Entropy H
let H = 0;
console.log('\n[Group Probability Distribution]');
visualGroups.forEach(g => {
  const p = g.count / N;
  const bits = -p * Math.log2(p);
  H += bits;
  console.log(`- Group ${g.id} (${g.name.padEnd(22)}): n=${g.count}, p=${p.toFixed(3)}, -p*log2(p)=${bits.toFixed(4)} bits`);
});

const C = N * H;

console.log('--------------------------------------------------------');
console.log(`Shannon Entropy (H)          : ${H.toFixed(4)} bits/element`);
console.log(`Total Screen Complexity (C)  : ${C.toFixed(2)} bits`);

// Assert that H is within [2.32, 2.34] and C is within [58.0, 58.5]
assert(H >= 2.32 && H <= 2.34, `Shannon Entropy ${H} out of expected range [2.32, 2.34]`);
assert(C >= 58.0 && C <= 58.5, `Screen Complexity ${C} out of expected range [58.0, 58.5]`);

console.log('\nSUCCESS: Shannon entropy (H ~ 2.33 bits) & Screen Complexity (C ~ 58.2 bits) mathematically validated!\n');
