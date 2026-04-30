# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm test             # Run tests (watch mode)
npm run lint         # Lint with oxlint
npm run lint:fix     # Auto-fix lint issues
npm run format       # Format with oxfmt
```

Run a single test file:
```bash
npx vitest run src/components/screens/ActivePackingScreen.test.tsx
```

Run tests with coverage:
```bash
npx vitest run --coverage
```

## Architecture

**React 19 SPA** — a warehouse operative packing tool (no backend, fully mocked).

### Screen-State Machine

There is no router. Navigation is a single `currentScreen: Screen` state in `App.tsx` that drives conditional rendering:

```
"standby" → "packing" → "dispatch" → (back to "standby")
```

All application state (`order`, `exceptionItem`, modal flags) lives in `App.tsx` and flows down via props. Callbacks bubble back up one level only — no Context, no reducers.

### Data Flow

1. `INITIAL_ORDER` constant (`src/constants.ts`) seeds state on mount — this is the mock service layer
2. `handleScanItem(id)` increments `quantityPacked` and sets `isFullyPacked` immutably on the matching `LineItem`
3. When all items are `isFullyPacked`, the dispatch button enables
4. Exception modal manages its own ephemeral form state locally; submitting closes it (supervisor alert is a no-op stub)

### Key Files

| File | Role |
|---|---|
| `src/App.tsx` | Root — all state + handlers |
| `src/types.ts` | Domain model (Screen, Order, LineItem, ExceptionType) |
| `src/constants.ts` | Mock data (INITIAL_ORDER, STATION_ID) |
| `src/components/screens/ActivePackingScreen.tsx` | Main packing workflow; uses `useMemo` for derived state |
| `src/components/modals/ExceptionReportingModal.tsx` | Animated overlay using `motion/react` |
| `src/utils/formatters.ts` | Pure utilities (e.g., `formatBinLocation`) |

### Styling

Tailwind v4 with a custom "Precision Brutalism" design system defined in `src/index.css`:
- **No rounded corners, no gradients**
- Custom `@theme {}` tokens: Safety Yellow `#FFEA00`, Pitch Black `#030712`, Alert Red `#E11D48`, Signal Green `#16A34A`
- Custom utilities `shadow-hard` / `shadow-hard-sm` (6px hard offset drops)
- Fonts: Barlow Condensed (headers), JetBrains Mono (data), Inter (body)
- Min 64px touch targets for operative use

`motion/react` (Framer Motion v12) is used **only** in `ExceptionReportingModal` — the sole animation in the app.

### Testing

Tests are co-located with components. `App.test.tsx` covers full user flows. Component tests use `@testing-library/react` with `vi.fn()` mocks.

Vitest is configured with jsdom and `@testing-library/jest-dom` (see `vitest.config.ts`). The `@` alias resolves to `./src` in tests.

## Tooling Notes

- **Linter**: oxlint (not ESLint) — config in `oxlint.config.ts`
- **Formatter**: oxfmt — config in `oxfmt.config.ts`, `printWidth: 80`
- **Node version**: 25.4.0 (asdf, see `.tool-versions`)
- **Path alias**: `@` maps to repo root in Vite/TS, to `./src` in Vitest
- **HMR**: Disabled when `DISABLE_HMR=true` env var is set (Google AI Studio compatibility)
- **Husky hooks**: `pre-commit` runs lint-staged; `pre-push` runs full test suite
