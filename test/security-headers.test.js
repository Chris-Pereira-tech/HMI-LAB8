/**
 * Security Headers & Client-Side Sanitization Test Suite
 * Asserts CSP directives, Referrer-Policy, nosniff metadata, and XSS sanitization
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('========================================================');
console.log(' Security Headers & Policy Conformance Verification');
console.log('========================================================\n');

// 1. Content Security Policy Directives
const cspMatch = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i);
console.log(`- Content-Security-Policy Meta Present : ${Boolean(cspMatch) ? 'PASS' : 'FAIL'}`);
assert(cspMatch, 'Document must declare Content-Security-Policy meta tag');

const cspContent = cspMatch[1];
const requiredCspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'"
];

console.log('\n[CSP Directives Check]');
requiredCspDirectives.forEach(directive => {
  const hasDirective = cspContent.includes(directive);
  console.log(`- Directive "${directive.padEnd(20)}": ${hasDirective ? 'PASS' : 'FAIL'}`);
  assert(hasDirective, `Missing mandatory CSP directive: ${directive}`);
});

// 2. MIME Sniffing Prevention (X-Content-Type-Options)
const hasNosniff = /<meta\s+http-equiv="X-Content-Type-Options"\s+content="nosniff"/i.test(html);
console.log(`\n- X-Content-Type-Options = nosniff       : ${hasNosniff ? 'PASS' : 'FAIL'}`);
assert(hasNosniff, 'Must specify nosniff X-Content-Type-Options');

// 3. Referrer Policy
const hasReferrerPolicy = /<meta\s+name="referrer"\s+content="strict-origin-when-cross-origin"/i.test(html);
console.log(`- Referrer-Policy = strict-origin-when.. : ${hasReferrerPolicy ? 'PASS' : 'FAIL'}`);
assert(hasReferrerPolicy, 'Must specify strict-origin-when-cross-origin Referrer-Policy');

// 4. Safe Links (No javascript: URI pseudo-protocols)
const hasJsProtocol = /href\s*=\s*["']javascript:/i.test(html);
console.log(`- Zero "javascript:" pseudo-protocols   : ${!hasJsProtocol ? 'PASS' : 'FAIL'}`);
assert(!hasJsProtocol, 'Disallowed javascript: URI pseudo-protocol found in links');

// 5. Client-Side Input Sanitizer Check
const hasSanitizer = html.includes('replace(/[<>]/g') || html.includes('sanitize');
console.log(`- Input Sanitization Function Present    : ${hasSanitizer ? 'PASS' : 'FAIL'}`);
assert(hasSanitizer, 'Client-side sanitization handler must be present');

console.log('\nSUCCESS: All security policies and sanitization checks verified!\n');
