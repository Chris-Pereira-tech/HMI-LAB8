## HCI Screen Complexity & Quality Review Checklist

### 1. Element Inventory Verification (Target N = 25)
- [ ] Header logo count = 1
- [ ] Header navigation links = 4
- [ ] Form field labels = 6
- [ ] Text inputs = 4
- [ ] Dropdowns = 2
- [ ] Radio buttons = 2
- [ ] Checkbox = 1
- [ ] Buttons = 2
- [ ] Footer links = 3
- [ ] **Total Visible Elements = 25**

### 2. Shannon & Tullis Constraints
- [ ] Shannon Entropy $H \approx 2.33$ bits/element
- [ ] Total Screen Complexity $C \approx 58.2$ bits
- [ ] Max vertical alignment axes $\le 2$
- [ ] Overall character density $\le 25\%$

### 3. File Budgets & Dependencies
- [ ] `index.html` $\le 150$ lines
- [ ] `styles.css` $\le 80$ lines
- [ ] Zero external dependencies (no CDNs, no webfonts, no remote images)

### 4. Accessibility & Automated Tests
- [ ] `npm test` passes all 6 test suites locally
- [ ] WCAG 2.1 AA color contrast ratios confirmed ($\ge 4.5:1$)
- [ ] Explicit `<label for="...">` associations verified
