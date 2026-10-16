# MHT CET Candidate Registration — Minimal UI Redesign (HMI Lab 8)

A single-page, static redesign of the Maharashtra Common Entrance Test (MHT CET) candidate registration portal, built with pure HTML and CSS (no frameworks, no external images, no CDN dependencies).

Designed for an **HCI / Human-Machine Interaction assignment on minimizing screen complexity**, optimized for calculating Shannon screen complexity.

---

## Preview

![Screenshot](screenshot.png)

---

## Exact Element Inventory ($N = 25$)

The design adheres to a strict inventory of exactly **25 visible functional elements**:

| # | Group | Elements Included | Count |
|---|---|---|:---:|
| 1 | **Header Logo** | Slim text logo: `"MHT CET"` | **1** |
| 2 | **Navigation Links** | Links: `Register`, `Login`, `Important Dates`, `Help` | **4** |
| 3 | **Field Labels** | Labels: `Full Name`, `Mobile Number`, `Email`, `Date of Birth`, `Category`, `Domicile` | **6** |
| 4 | **Text Inputs** | Inputs: Full Name, Mobile Number, Email, Date of Birth | **4** |
| 5 | **Dropdowns** | Select elements: `Category`, `Domicile` | **2** |
| 6 | **Radio Buttons** | Subject groups: `PCM`, `PCB` (inline labels, no separate group label) | **2** |
| 7 | **Checkbox** | Single declaration: `"I confirm the details are correct"` | **1** |
| 8 | **Action Buttons** | Primary: `"Continue"`, Secondary: `"Login"` | **2** |
| 9 | **Footer Links** | Links: `Contact`, `Privacy`, `Help` | **3** |
| | **TOTAL** | | **25** |

> **Note on Progressive Disclosure**: The heading (`"Step 1 of 3"`) communicates multi-step progression in plain text without adding an extra functional element count.

---

## Design System & Constraints

- **Layout**: Centered single-column layout (`max-width: 480px`). All form elements align strictly to a single left edge.
- **Grid**: Strict 8px spacing grid (`8px`, `16px`, `24px`, `32px`, `48px`).
- **Typography**: Single font family (`system-ui, -apple-system, sans-serif`) with only **two font sizes**:
  - Heading: `20px` (logo and step heading)
  - Body: `15px` (all form inputs, labels, options, buttons, and links)
- **Color Palette**: Neutral grays (`#ffffff`, `#111827`, `#6b7280`, `#d1d5db`) and a **single accent color** (`#1d4ed8`) reserved exclusively for the primary `"Continue"` button.
- **Visual Grouping**: Grouped into *Personal details* and *Exam details* using 32px whitespace rather than borders or visual clutter.
- **Accessibility & Responsiveness**: Fully responsive across mobile and desktop; explicit label associations (`for`/`id`), visible 2px focus outlines, and high contrast ratios.

---

## How to Run

Open `index.html` directly in any web browser:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```
