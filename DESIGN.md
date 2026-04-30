# Design System Document: Absolute Utility

## 1. Overview & Creative North Star

This design system is a rejection of the "soft" web. It moves away from the polite, rounded, and blurred aesthetics of modern SaaS to embrace **"Precision Brutalism."** The Creative North Star for this system is **The Kinetic Blueprint**: an aesthetic that prioritizes structural honesty, high-visibility communication, and the raw power of industrial machinery.

The layout breaks the standard "template" look by using intentional asymmetry and massive, uncompromising type scales. We do not use "white space" in the traditional sense; we use **"Buffer Zones"** that feel like the safety clearances around heavy equipment. Every element is designed to feel permanent, heavy, and functionally absolute.

---

## 2. Colors & Surface Logic

The palette is derived from industrial safety standards. It is designed to be felt as much as it is seen.

- **Primary (#FFEA00 - Safety Yellow):** This is your high-voltage signal. Use it for primary actions, critical path indicators, and "Active" states.
- **Background (#E5E7EB - Industrial Gray):** The concrete slab. This neutral provides the low-contrast foundation that allows the Yellow and Red to scream.
- **Surface (#FFFFFF - Pure White):** Reserved for data-dense containers and input fields where maximum legibility is non-negotiable.
- **Text (#030712 - Pitch Black):** The ink of a blueprint. Everything structural—borders, shadows, and text—uses this value.
- **Accent (#E11D48 - Alert Red):** Restricted to errors, destructive actions, and emergency status.
- **Success (#16A34A - Signal Green):** Confirmation of a cleared process or successful data transmission.

### The "Structural Beam" Rule

Prohibit the use of 1px or 2px lines for sectioning. In this system, boundaries are defined by **4px solid black borders (`on-surface`)**. These are not "lines"; they are structural beams. If a section needs to be separated without a beam, use a hard shift in background color (e.g., nesting a `surface` container inside an `industrial-gray` background).

### Surface Hierarchy & Nesting

Instead of soft shadows, we use **Tonal Stacking**.

- **Level 0:** `background` (#E5E7EB)
- **Level 1:** `surface` (#FFFFFF) with a 4px border.
- **Level 2:** `primary-container` (#FFEA00) for highlighted data blocks.

---

## 3. Typography

Typography is the core of our brand identity. We mix high-impact condensation with technical mono-spacing.

- **Display & Headlines (Barlow Condensed):** These must feel like stamped metal or stenciled crates. Use `all-caps` for `headline-lg` and `display` levels to reinforce the industrial authority.
- **Data & SKUs (JetBrains Mono):** All numerical values, technical specifications, and SKU codes must use this font. It conveys precision and a "raw data" feel.
- **Body (Inter):** Used for instructional text and long-form descriptions. It provides the necessary legibility to balance the aggression of the other two faces.

**Typography Scale:**

- **Display-LG:** Barlow Condensed, 3.5rem, Bold, All-Caps.
- **Headline-MD:** Barlow Condensed, 1.75rem, Semi-Bold.
- **Label-MD (Technical):** JetBrains Mono, 0.75rem, Medium.

---

## 4. Elevation & Depth: The Hard Offset

We ignore the physics of light. There are no "ambient" or "diffused" shadows here. This system uses **The Hard Offset**.

- **Shadow Construction:** All floating elements or high-priority cards use a **6px 6px 0px #030712** shadow.
- **The Layering Principle:** Depth is achieved by "stacking" blocks. A card doesn't "lift" off the page; it sits as a physical object on top of another.
- **No Glassmorphism:** Unlike standard high-end UI, we do not use blurs or transparency. We value "Opaque Truth." Every layer is 100% solid, reinforcing the Brutalist utility.
- **The Ghost Border:** If a border feels too heavy for a minor element, use the `outline-variant` at 40% opacity, but never go below 2px in width.

---

## 5. Components

### Buttons: The "Safety Switch"

Buttons are massive, tactile, and uncompromising.

- **Primary:** 64px minimum height. #FFEA00 background, 4px black border, 6px hard black shadow. Text in Barlow Condensed, All-Caps.
- **States:** On `hover` or `active`, the 6px shadow moves to 0px (the button "presses" into the page), but no animation or transition is allowed. The change must be instantaneous.

### Input Fields: The "Logbook"

- **Styling:** 0px border-radius, 4px solid black border.
- **Focus State:** The border color remains black, but the background of the input shifts to `primary-container` (#FFEA00) to signal "Active System Entry."
- **Touch Targets:** All inputs must maintain a 64px height to accommodate industrial environments and high-speed interaction.

### Cards & Lists: The "Manifest"

- Forbid the use of divider lines. Separate list items using a 4px black bottom border or by alternating backgrounds between `surface` and `surface-container-low`.
- **Asymmetry:** Use a "hanging" label for cards—a JetBrains Mono tag that sits on the top-left corner, breaking the container's 4px border.

### Chips: The "Status Tag"

- Rectangular (0px radius).
- JetBrains Mono text.
- Use `surface` for inactive and `primary` for active, always encased in a 2px black border.

---

## 6. Do’s and Don’ts

### Do:

- **Use Massive Touch Targets:** Every interactive element must be at least 64px. This is a "Gloves-On" design philosophy.
- **Embrace the Grid:** Align everything to a rigid 8px baseline, but break the horizontal symmetry to create visual tension.
- **Keep it Static:** Interactions should be binary. On or Off. No fades, no slides, no bounces.

### Don’t:

- **No Rounded Corners:** Any radius above 0px is a failure of the system.
- **No Gradients:** Colors must be flat and honest.
- **No Icons without Labels:** In an industrial context, ambiguity is a safety hazard. Every icon must be accompanied by technical text (JetBrains Mono).
- **No 1px Lines:** If it’s worth separating, it’s worth a 4px beam or a total color shift.

---

## 7. Editorial Notes for Junior Designers

When building layouts with this system, think like an architect, not a decorator. If a layout feels "too busy," do not reach for a thinner font or a lighter gray—increase the **Buffer Zones** and make the headers even larger. The goal is to make the user feel like they are operating a piece of high-end machinery: powerful, reliable, and perfectly clear.
