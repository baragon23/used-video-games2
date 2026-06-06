# Copilot / AI Assistant Instructions

This file helps an AI coding agent become productive quickly in this Next.js TypeScript project.

## Big picture

- App type: Next.js (App Router) using the `app/` directory. Main layout: `app/layout.tsx` (client component with MUI theme).
- UI: React + TypeScript + MUI (`@mui/material`). Styling and theme located in `styles/theme.ts`.
- Data sources: static mock JSON under `public/games/*.json` (used by `lib/mockData.ts`) and real data via the eBay REST API.
- Server APIs: in-app API routes under `app/api/` (e.g. `app/api/ebay/browse/route.ts`) that proxy to external eBay endpoints.

## Important integration points

- eBay OAuth token: `lib/getEbayToken.ts` — caches token in-memory and expects environment vars `EBAY_CLIENT_ID` and `EBAY_CLIENT_SECRET`.
- eBay proxy route: `app/api/ebay/browse/route.ts` — calls the buy/browse API and returns JSON to the client. Handle HTTP errors and return appropriate NextResponse status.
- Client-side HTTP helper: `utils/callApi.tsx` — React hook wrapper around `axios` used by components for API calls.

## Developer workflows and commands

- Run dev server: `npm run dev` (uses `next dev --turbopack`).
- Build: `npm run build`; Start: `npm run start`; Lint: `npm run lint`.
- Keep in mind: network calls to eBay require valid `EBAY_CLIENT_ID`/`SECRET` in environment when testing the API route.

## Project-specific conventions

- Files under `app/` may be server or client components. Look for `'use client'` at the top to identify client components (e.g., `app/layout.tsx`).
- Type/Component files in `Types/` are `.tsx` React components (not just type-only `.ts`), so treat them as UI building blocks.
- Mock data: prefer `public/games/*.json` for offline UX work — `lib/mockData.ts` demonstrates how mocks are loaded.
- Prefer small, focused components in `components/` and `gameDetailPage/` rather than adding logic to layout files.

## Patterns to follow when editing

- When modifying API requests, update `lib/getEbayToken.ts` cache behavior or token lifetime handling to avoid frequent token refreshes.
- For external-network changes, add safe error handling in `app/api/ebay/browse/route.ts` and return JSON errors using `NextResponse.json` (status codes are already used here).
- Use `utils/callApi.tsx` for client fetches to maintain consistent error handling in UI components.

## Files to inspect for context (examples)

- `app/layout.tsx` — global layout, theme, and client directive example.
- `app/api/ebay/browse/route.ts` — server-side proxy to eBay.
- `lib/getEbayToken.ts` — token fetch + in-memory cache.
- `utils/callApi.tsx` — axios-based client hook.
- `public/games/` — sample JSON game fixtures used throughout the app.

## Safety and environment notes

- Do not commit real `EBAY_CLIENT_SECRET` values. Tests requiring eBay should use mocks or test credentials.
- Local testing of eBay endpoints requires network access and valid credentials. If unavailable, rely on `public/games` and `lib/mockData.ts`.

## Quick examples

- How to call the eBay proxy from client code: fetch `/api/ebay/browse?q=super+nintendo`.
- Token retrieval is centralized: prefer reusing `lib/getEbayToken.ts` instead of fetching tokens in multiple places.

If anything here is unclear or you want more detail (examples of common change patterns, where to add unit tests, or a checklist for PRs), tell me which sections to expand and I will iterate.
