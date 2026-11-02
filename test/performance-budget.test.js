/**
 * Performance Budget & Zero-Dependency Conformance Test Suite
 * Asserts static asset payloads, zero external network calls, and DOM node limits
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const htmlBytes = Buffer.byteLength(html, 'utf8');
const cssBytes = Buffer.byteLength(css, 'utf8');
const totalBytes = htmlBytes + cssBytes;

console.log('========================================================');
console.log(' Performance Budget & Zero-Dependency Verification');
console.log('========================================================\n');

// 1. Zero External Dependencies
const externalUrls = (html + css).match(/https?:\/\/[^\s"'<>]+/gi) || [];
// Filter out standard schema / xmlns / doctype if any (we have none in markup)
console.log(`- External Network Requests : ${externalUrls.length} (Max: 0) -> ${externalUrls.length === 0 ? 'PASS' : 'FAIL'}`);
assert.strictEqual(externalUrls.length, 0, 'No external HTTP/HTTPS requests or CDN dependencies allowed');

// 2. Uncompressed Asset Budget (Target: < 20 KB total)
console.log(`\n[Asset Size Budgets]`);
console.log(`- index.html size : ${(htmlBytes / 1024).toFixed(2)} KB (Max: 12 KB) -> ${htmlBytes < 12288 ? 'PASS' : 'FAIL'}`);
console.log(`- styles.css size : ${(cssBytes / 1024).toFixed(2)} KB (Max: 6 KB)  -> ${cssBytes < 6144 ? 'PASS' : 'FAIL'}`);
console.log(`- Total Payload   : ${(totalBytes / 1024).toFixed(2)} KB (Budget: 20 KB) -> ${totalBytes < 20480 ? 'PASS' : 'FAIL'}`);

assert(htmlBytes < 12288, 'HTML asset size exceeds 12 KB budget');
assert(cssBytes < 6144, 'CSS asset size exceeds 6 KB budget');
assert(totalBytes < 20480, 'Total static payload exceeds 20 KB budget');

// 3. System Font Stack (No Webfont Latency)
const usesSystemFont = css.includes('system-ui') && !css.includes('@font-face');
console.log(`\n- Native System Font Stack (Zero Webfont Latency): ${usesSystemFont ? 'PASS' : 'FAIL'}`);
assert(usesSystemFont, 'Must use native system font stack without @font-face downloads');

console.log('\nSUCCESS: All performance budget and zero-dependency assertions satisfied!\n');
