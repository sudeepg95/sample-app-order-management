# Warehouse Packing Screen

This document is designed to be used as a prompt or architectural blueprint for AI-assisted UI generators (like v0, Bolt, Stitch, or GitHub Copilot), or handed off to a frontend developer. It focuses on the core "Active Packing" screen.

## 1. Context & Persona

- **Users:** Warehouse operatives wearing gloves, likely using a ruggedized tablet or mobile device (8-inch to 10-inch screen).
- **Environment:** Fast-paced, potentially poor lighting.
- **Goal:** Find items in the warehouse and pack them into a parcel as quickly and accurately as possible.
- **Design Vibe:** Utilitarian, extremely high contrast, accessible, large touch targets, zero unnecessary animations.

## 2. Core Requirements & Constraints

- **Framework:** React + Tailwind CSS (or similar utility-first framework).
- **Responsiveness:** Mobile-first, but optimized for tablet landscape/portrait.
- **Accessibility:** Must use semantic HTML (`<main>`, `<article>`, `<button>`). Buttons need clear `aria-label`s. Focus states must be highly visible (e.g., `focus:ring-4 focus:ring-blue-500`).
- **Color Palette:**
  - Background: Light gray (`bg-gray-50`) to reduce glare.
  - Cards: White (`bg-white`) with subtle borders, no heavy drop shadows.
  - Accents:
    - Standard Action: Blue (`bg-blue-600`)
    - Success/Packed: Green (`bg-green-600` or `bg-green-100` for backgrounds)
    - Urgent/Warning: Red/Orange (`bg-red-100`, `text-red-800`)

## 3. Data Structure (TypeScript Interfaces)

Feed these types to the UI generator so it types the props correctly:

````
```text?code_stdout&code_event_index=2
File created successfully: warehouse_packing_ui_spec.md

```typescript
interface Location {
  zone: string;
  aisle: number;
  shelf: string;
  bin: number;
}

interface Product {
  id: string;
  sku: string;
  name: string;
}

interface LineItem {
  id: string;
  product: Product;
  location: Location;
  quantityRequired: number;
  quantityPacked: number;
  isFullyPacked: boolean;
}

interface Order {
  id: string;
  priority: 'STANDARD' | 'NEXT_DAY' | 'URGENT';
  status: 'PACKING' | 'PACKED';
  items: LineItem[];
}
````

## 4. Component Layout Breakdown

### A. Header (Sticky Top)

- **Left:** Large text displaying the Order ID (e.g., `Order #ORD-5531`).
- **Right:** Priority Badge.
  - If `URGENT`, make it a bold red pill badge.
  - If `STANDARD`, make it a muted gray pill badge.
- **Bottom of Header:** A visual progress bar showing `Items Packed / Total Items` (e.g., 2/5).

### B. Main Content Area (Scrollable List)

A list of `LineItemCard` components. **Crucial business logic:** The UI should assume these cards are sorted by `Location` to optimize the operative's walking path.

**LineItem Card Design:**

- **Layout:** Flex container.
- **Left Column (Where & What):**
  - **Location Tag:** Highly prominent, large font (e.g., **Zone A, Aisle 12, Shelf B, Bin 4**). This is the most important piece of info.
  - **Product Details:** SKU (small, monospace) and Product Name (medium, bold).
- **Right Column (Action):**
  - **Quantity:** Big text showing `quantityPacked / quantityRequired`.
  - **Action Button:** A massive, easily tappable button.
    - _Default State:_ "Scan / Pack 1" (Blue button).
    - _Completed State:_ Replaced by a large green checkmark icon and text "Packed" (Green background, disabled state).

### C. Footer (Sticky Bottom - Conditional)

- **Default State:** Hidden.
- **Completed State:** When all `LineItem`s have `isFullyPacked === true`, a massive green button slides up from the bottom: **"DISPATCH PARCEL"**. Clicking this should trigger an animation or loading spinner.

## 5. Mock Data (For the UI Tool)

Pass this JSON to the generator so it can render a realistic preview immediately:

```json
{
  "id": "ORD-5531",
  "priority": "URGENT",
  "status": "PACKING",
  "items": [
    {
      "id": "item_1",
      "product": { "id": "p_1", "sku": "B08FX123", "name": "Wireless Mouse" },
      "location": { "zone": "A", "aisle": 12, "shelf": "B", "bin": 4 },
      "quantityRequired": 1,
      "quantityPacked": 1,
      "isFullyPacked": true
    },
    {
      "id": "item_2",
      "product": {
        "id": "p_2",
        "sku": "C99ZZ456",
        "name": "Mechanical Keyboard"
      },
      "location": { "zone": "A", "aisle": 12, "shelf": "C", "bin": 1 },
      "quantityRequired": 2,
      "quantityPacked": 0,
      "isFullyPacked": false
    },
    {
      "id": "item_3",
      "product": { "id": "p_3", "sku": "A11XX789", "name": "USB-C Hub" },
      "location": { "zone": "B", "aisle": 4, "shelf": "A", "bin": 10 },
      "quantityRequired": 1,
      "quantityPacked": 0,
      "isFullyPacked": false
    }
  ]
}
```

## 6. Screens and UI State Paths (The State Machine)

The UI must handle the complete lifecycle of a packing shift, not just the "happy path." Ensure the following views/states are distinct and accessible:

### A. Idle / Empty Queue State

- **Trigger:** The operator first logs in, or the warehouse has no pending orders.
- **UI Element:** A centered, highly visible "Next Order" button.
- **Copy:** "Ready to pack. Tap below to fetch the next order." or "All caught up! No pending orders right now."

### B. Loading / Transition State

- **Trigger:** The operator clicks "Next Order" OR "Dispatch Parcel".
- **UI Element:** The button pressed should transition to a disabled loading state (e.g., showing a spinner or text like "Fetching..." / "Dispatching...").
- **Requirement:** Prevent double-clicks. Do not show a full-screen loader; keep the context visible.

### C. Active Packing State (The Happy Path)

- **Trigger:** An order is successfully fetched from the mock API.
- **UI Element:** The main list of `LineItemCard` components sorted by warehouse location.
- **Flow:** Operator taps "Scan / Pack 1" on items until all `quantityPacked` values equal their respective `quantityRequired` values.

### D. Exception State (Missing Item)

- **Trigger:** The operator is at the correct bin location, but the item is missing or damaged.
- **UI Element:** A secondary, smaller button on the Line Item card labeled "Report Issue" or "Missing".
- **Flow:** Clicking this flags the item in the UI (e.g., changing the background to a warning color) and alerts the operative to move on to the next item while a supervisor is notified.

### E. Global Error State

- **Trigger:** The mock API call fails to fetch an order or dispatch a parcel (simulated network failure).
- **UI Element:** A high-contrast toast notification or banner at the top of the screen (Red background).
- **Copy:** "Network error. Unable to communicate with the server."
- **Action:** Provide a clear "Try Again" or "Retry" button. Never leave the operative stuck on a broken screen.
