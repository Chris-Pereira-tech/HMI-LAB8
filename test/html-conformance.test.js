/**
 * HTML5 Semantic Conformance & W3C Validity Test Suite
 * Asserts document structure, semantic hierarchy, and ID uniqueness
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('========================================================');
console.log(' HTML5 Conformance & Document Structure Verification');
console.log('========================================================\n');

// 1. Mandatory HTML5 Doctype & Language
const hasDocType = /^<!DOCTYPE html>/i.test(html.trim());
console.log(`- Valid HTML5 Doctype Declaration : ${hasDocType ? 'PASS' : 'FAIL'}`);
assert(hasDocType, 'Document must begin with <!DOCTYPE html>');

const hasLangEn = /<html\s+lang="en">/i.test(html);
console.log(`- <html> root with lang="en"      : ${hasLangEn ? 'PASS' : 'FAIL'}`);
assert(hasLangEn, 'html element must declare lang="en"');

// 2. Viewport & Charset Metadata
const hasCharset = /<meta\s+charset="UTF-8">/i.test(html);
console.log(`- UTF-8 Character Encoding Meta     : ${hasCharset ? 'PASS' : 'FAIL'}`);
assert(hasCharset, 'Document must specify UTF-8 charset');

const hasViewport = /<meta\s+name="viewport"/i.test(html);
console.log(`- Responsive Viewport Meta Tag       : ${hasViewport ? 'PASS' : 'FAIL'}`);
assert(hasViewport, 'Document must include responsive viewport meta');

// 3. Single H1 Heading Semantics
const h1Count = (html.match(/<h1\b[^>]*>/gi) || []).length;
console.log(`- Single Top-Level <h1> Heading      : Count = ${h1Count} -> ${h1Count === 1 ? 'PASS' : 'FAIL'}`);
assert.strictEqual(h1Count, 1, 'Page must contain exactly one h1 element for progressive disclosure');

// 4. Element ID Uniqueness
const idMatches = html.match(/\bid="([^"]+)"/g) || [];
const ids = idMatches.map(m => m.replace(/id="|"/g, ''));
const uniqueIds = new Set(ids);
console.log(`- ID Uniqueness Across Document      : ${uniqueIds.size} unique / ${ids.length} total -> ${uniqueIds.size === ids.length ? 'PASS' : 'FAIL'}`);
assert.strictEqual(ids.length, uniqueIds.size, 'Duplicate element IDs detected in document');

// 5. Explicit Button Types
const buttons = html.match(/<button\b[^>]*>/g) || [];
const allButtonsTyped = buttons.every(b => /type="(submit|button|reset)"/.test(b));
console.log(`- Explicit button types defined      : ${buttons.length} buttons -> ${allButtonsTyped ? 'PASS' : 'FAIL'}`);
assert(allButtonsTyped, 'All <button> elements must specify explicit type attribute');

console.log('\nSUCCESS: All HTML5 semantic conformance checks passed!\n');
