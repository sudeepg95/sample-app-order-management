## Problem Statement

Warehouse operatives need a fast, reliable, and accessible Web UI to be assigned orders, directed to inventory locations, and to accurately pack items into parcels. The current process requires an efficient, real-time system to manage orders per workstation (terminal) and handle exceptions seamlessly without blocking the operational flow.

## Solution

A responsive, high-contrast, tablet-optimized React Web UI that interfaces with a Mock Service Layer. The application will authenticate the physical terminal, pull the next available pending order from a queue (avoiding overwhelming list views), guide the operative through packing items sorted by location, and provide a clear flow for handling damaged or missing items by marking exceptions and handing over partial orders to an exception team.

## User Stories

1. As a warehouse operative, I want the system to automatically recognize my workstation (Terminal ID), so that I don't have to manually select my location.
2. As a warehouse operative, I want to click a "Next Order" button to fetch my next task, so that I am not overwhelmed by a massive list of pending orders.
3. As a warehouse operative, I want to see order items sorted by warehouse location, so that I can walk an optimized path.
4. As a warehouse operative, I want to pack items individually (item-level actions), so that the system tracks my exact progress without risk of race conditions.
5. As a warehouse operative, I want to flag an item if it is damaged or missing, so that the system knows the order cannot be completely packed as expected.
6. As a warehouse operative, I want to continue packing remaining items even if one item has an exception, so that the exception team doesn't have to restart the order from scratch.
7. As a warehouse operative, I want the final action for an order with exceptions to be "Send to Exception Handling" instead of "Dispatch", so that I pass partial orders correctly without blocking my queue.
8. As a warehouse operative, I want the system to handle network delays gracefully, so that I know an action is processing and do not double-click.

## Implementation Decisions

- The terminal ID will be injected or assumed constant (e.g., `STATION_04` via `localStorage` or constants) when fetching session data.
- The UI will _not_ show a list of pending orders; it will only feature a "Next Order" CTA that pulls the top `PENDING` order for the active station.
- Item packing will use item-level mocked actions (`POST /order/:id/items/:itemId/pack`) instead of overwriting the entire order object via `PUT`.
- Exceptions will trigger a specific workflow (`POST /exception/:orderId`). This flags the item and changes the order's final CTA to "Send to Exception Handling" (`POST /order/:id/handover-exception`).
- The Service Layer will be mocked via a deep module (`api/mockClient.ts`) that manages in-memory state and simulates asynchronous network latency (e.g., Promises + setTimeout) to demonstrate correct UI loading states.
- The UI state machine will be managed by a deep React hook (`hooks/useOrderWorkflow.ts`) to cleanly separate domain logic from rendering.

## Testing Decisions

- Good tests should verify external behavior and state transitions, not implementation details (e.g., test that flagging an exception updates the order state and changes the available actions, without testing the internal array mutations).
- We will focus our automated testing efforts on the deep modules: `api/mockClient.ts` and `hooks/useOrderWorkflow.ts`, ensuring the state machine and data logic are robust.
- We will mock the simulated delays in our tests to keep them fast.

## Out of Scope

- A full dashboard or queue view of all pending orders across the warehouse.
- A fully functional backend service (we are using a simulated mock client).
- Authentication via badge scanning or external SSO (we are using a fixed terminal ID).

## Further Notes

- This implementation must adhere strictly to the `ui-spec.md` design constraints: high contrast, semantic HTML, and accessibility features.
