# Warehouse Packing System

## Product Overview

**The Pitch:** A high-visibility, zero-distraction interface for warehouse operators. Built for speed and accuracy, it features massive touch targets and aggressive visual contrast to support gloved hands and industrial environments.

**For:** Warehouse packing staff who need flawless legibility and immediate system feedback to fulfill high-volume orders without errors.

**Device:** desktop (optimized for industrial touchscreen monitors)

**Design Direction:** Industrial High-Vis & Brutalist Utility. Absolute contrast, stark spatial hierarchy, rugged condensed sans-serifs, and heavy brutalist borders.

**Inspired by:** Zebra enterprise scanner software, heavy machinery control panels.

---

## Screens

- **Idle:** Awaits operator readiness to pull the next order queue.
- **Active Packing:** Core execution screen showing ordered locations, SKUs, and massive action buttons.
- **Exception:** Rapid-reporting interface for missing or damaged inventory.
- **Dispatch Ready:** Success state allowing final parcel dispatch and label generation.

---

## Key Flows

**Packing an Order:**

1. User is on **Idle** -> sees massive "FETCH NEXT ORDER" button
2. User clicks **Fetch Next Order** -> transitions to **Active Packing** (loads ORD-5531)
3. User verifies item in Bin C4 -> taps "SCAN / PACK 1" on the Wireless Mouse card -> Card turns green, progress bar updates.
4. User completes all items -> clicks massive sticky "DISPATCH PARCEL" footer -> returns to **Idle**.

**Reporting an Exception:**

1. User is on **Active Packing** -> cannot find item in Bin D2.
2. User clicks **"REPORT ISSUE"** on the item card -> opens **Exception** overlay.
3. User selects "Missing from Bin" -> confirms -> item is marked red, order status changes to "INCOMPLETE DISPATCH".

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#FFEA00` - Safety Yellow (Main CTAs, Active highlights)
- **Background:** `#E5E7EB` - Industrial Gray (Main app background, cuts glare)
- **Surface:** `#FFFFFF` - White (Item cards, modals)
- **Text:** `#030712` - Pitch Black (Maximum contrast text)
- **Muted:** `#4B5563` - Slate (Borders, secondary data labels)
- **Accent:** `#E11D48` - Alert Red (URGENT badges, Missing items, Errors)
- **Success:** `#16A34A` - Signal Green (Packed items, Dispatch ready)

## Typography

Rugged, high-legibility fonts specifically chosen for numerical distinction and rapid scanning.

- **Headings:** `Barlow Condensed`, 800, 32-48px, uppercase.
- **Data/SKUs:** `JetBrains Mono`, 700, 18px.
- **Body:** `Inter`, 600, 16px.
- **Buttons:** `Barlow Condensed`, 800, 24px, uppercase, +1px letter-spacing.

**Style notes:** Brutalist utility. `0px` border radius everywhere. Heavy `4px` solid `#030712` borders on interactive elements. Hard, non-blurred drop shadows (`6px 6px 0px #030712`). Absolutely zero transition animations—instant state changes only. Minimum touch target height is `64px`.

## Design Tokens

```css
:root {
  --color-primary: #ffea00;
  --color-background: #e5e7eb;
  --color-surface: #ffffff;
  --color-text: #030712;
  --color-muted: #4b5563;
  --color-alert: #e11d48;
  --color-success: #16a34a;

  --font-heading: "Barlow Condensed", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-body: "Inter", sans-serif;

  --border-heavy: 4px solid #030712;
  --border-standard: 2px solid #030712;

  --shadow-brutal: 6px 6px 0px #030712;
  --shadow-brutal-sm: 4px 4px 0px #030712;

  --radius: 0px;
  --touch-min: 64px;
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Idle

**Purpose:** Standby screen between orders.

**Layout:** Single full-viewport flex container, perfectly centered.

**Key Elements:**

- **Fetch Button:** Massive `400px` wide, `120px` high button. `#FFEA00` background, `4px` black border, `8px 8px 0px` black shadow. Text: "FETCH NEXT ORDER".
- **Status Indicator:** Top right corner, small green circle + "SYSTEM ONLINE" (`JetBrains Mono`, `14px`).

**States:**

- **Loading:** Button text changes to "LOADING..." with a high-contrast black/yellow hazard stripe background pattern.

**Interactions:**

- **Click Fetch:** Instant hard cut to Active Packing.

### Active Packing

**Purpose:** Core execution view for fulfilling a single order.

**Layout:** 3-part vertical layout: Sticky Header (15%), Scrollable Content (65%), Sticky Footer (20%).

**Key Elements:**

- **Sticky Header:** White background, bottom border `4px` black.
  - Left: "ORD-5531" (`Barlow Condensed`, `48px`).
  - Middle: Priority Badge (`#E11D48` background, white text "URGENT").
  - Bottom edge: Progress Bar (100% width, `16px` height, `#E5E7EB` track, `#16A34A` fill).
- **LineItemCard (x3):** White background, `2px` black border, `16px` padding.
  - Location Block: "Z:1 A:12 S:4 B:C4" (`JetBrains Mono`, `20px`, black background, white text).
  - Product Info: SKU "MS-WL-099", Name "Wireless Mouse" (`Inter`, `16px`).
  - Action Button: "SCAN / PACK 1", `120px` wide, `64px` high, `#FFEA00` background.
  - Exception Button: "!", `64px` x `64px`, gray background, right-aligned.
- **Sticky Footer:** Fixed bottom. Full width button "DISPATCH PARCEL". Initially `#E5E7EB` background, disabled cursor.

**States:**

- **Active:** Cards stack vertically, 24px gap.
- **Item Packed:** Card background turns to very light green `#DCFCE7`, action button hides, replaced by large checkmark. Progress bar increments.
- **Global Error:** Toast notification top-center. Black box, yellow text "NETWORK DROP - RETRYING".

**Interactions:**

- **Click SCAN / PACK:** Card immediately snaps to 'Packed' state. No fade.

### Exception

**Purpose:** Interrupt flow to report a physical discrepancy in the warehouse.

**Layout:** Full-screen modal overlay (obscures Active Packing behind a 90% opaque black scrim).

**Key Elements:**

- **Modal Box:** Centered, `600px` wide, `#FFFFFF` background, `4px` black border, `12px 12px 0px` shadow.
- **Title:** "REPORT EXCEPTION" (`#E11D48` text).
- **Target Item:** SKU and Name displayed in mono font.
- **Reason Grid:** 4 large square buttons (`200px` x `120px`): "MISSING", "DAMAGED", "WRONG ITEM", "BARCODE UNREADABLE".
- **Cancel Button:** Text link, `JetBrains Mono`, "CANCEL AND RETURN".

**Interactions:**

- **Click Reason:** Modal closes immediately, parent card turns `#E11D48`, progress bar recalibrates, logs exception.

### Dispatch Ready

**Purpose:** Final confirmation to finalize the order.

**Layout:** Same as Active Packing, but footer is fully activated.

**Key Elements:**

- **Progress Bar:** 100% filled, pulsing slightly (the only animation in the app, purely for dispatch prompt).
- **Sticky Footer:** "DISPATCH PARCEL" button becomes `#16A34A` with white text, gains brutalist drop shadow.

**Interactions:**

- **Click DISPATCH PARCEL:** Hard cut back to Idle screen.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3

**Build Order:**

1. **Design System & Base HTML:** Set up custom fonts (`Barlow Condensed`, `JetBrains Mono`) and brutalist Tailwind config (custom colors, heavy borders, box-shadows).
2. **Idle Screen:** Establish the macro layout and massive touch target components.
3. **Active Packing (Static):** Build the sticky header, scrollable area, and sticky footer. Hardcode the 3 items (Wireless Mouse, Mechanical Keyboard, USB-C Hub) to perfect the card grid and typography hierarchy.
4. **LineItemCard Variations:** Style the 'Idle', 'Packed', and 'Error' states of the individual cards.
5. **Exception Modal:** Build the full-screen overlay and absolute z-index stacking context.

</details>
