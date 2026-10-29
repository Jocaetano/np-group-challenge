# Northstar Asset Library

A responsive asset library prototype built from [INSTRUCTION.md](./INSTRUCTION.md) with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Run `npm run build` to verify the production build.

## What works

- Browse featured and trending assets, or switch between KPI, Layout, and Storyboard tabs.
- Search assets, reuse recent searches, clear a search, and view matching results.
- Expand the Library to discover more assets.
- Open type-specific asset details, including KPI metadata, an interactive data visualization, a layout preview, and a storyboard access state.
- Favorite assets, filter to favorites, and copy a direct link to an asset.
- Submit an access request with a reason. Favorites, recent searches, and requests are stored in this browser's local storage.
- Switch between light and dark themes from the header. The selected theme is saved in local storage; first-time visitors use their system preference.
- Open the workspace and profile menus for clearly labeled demo responses, use the notification button, and expand a layout preview. These controls are mocked locally and do not change an account or workspace.

## Feature boundary

`features/library` owns the Library's data model, state, and reusable presentation components. `hooks/useLibrary.ts` manages feature state, `storage.ts` owns browser persistence, and `components/details` contains the asset-specific detail views. `Library.tsx` only composes these pieces. The Next.js host imports the feature's public entry point (`features/library/index.ts`). Tailwind utilities style the page, modal, and detail layouts. Shared breakpoints, dimensions, text sizes, and color tokens live in `app/globals.css`; common patterns use the `Button`, `ModalBackdrop`, and detail primitives. The remaining custom CSS covers the asset artwork and animation keyframes. It is a local prototype, without a remote asset API, authentication, or a request delivery service.

## Generated demo data

`data.ts` builds a 24-asset catalog from one example template per asset type. Titles use a date and sequence, such as `Example KPI-261027-1`. `server-data.ts` selects a seed on the first request and caches the result for the life of that server process. Every visitor to that process sees the same catalog, while a server restart generates new categories, metrics, chart values, and dates. The page is dynamically rendered so the catalog is generated at runtime instead of build time. Direct links from a different date may no longer resolve.

## Assumptions

- The screenshot provides wireframe behavior but no production data or brand system, so the prototype generates demo assets and uses a neutral identity.
- “KPI” includes standalone KPI records and their related data visualizations in the navigation.
- The access form saves locally and does not contact an asset owner.
- The chart preview uses generated demo data; its time-range controls demonstrate the intended behavior.
