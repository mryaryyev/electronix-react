# Electronix — Frontend

React 19 + TypeScript + Vite SPA for the Electronix electronics store. Talks to the backend in `../electronix`.

## Commands
- `yarn dev` — dev server
- `yarn build` — type-check + build
- `yarn type-check`, `yarn lint`, `yarn format`, `yarn test` (vitest)

## Stack
Redux Toolkit (+ redux-logger), React Router v6, MUI v9 + styled-components/emotion, axios, sweetalert2, swiper.

## Structure
- `src/app/App.tsx` — routes; `src/app/store.ts` — Redux store
- `src/app/screens/<page>/` — each page has `index.tsx`, `slice.ts`, `selector.ts` and sub-components
- `src/app/services/*Service.ts` — axios API classes using `serverApi` from `src/libs/config.ts`
- `src/app/components/`, `src/app/hooks/` (`useBasket`, `useGlobals`), `src/app/context/`
- `src/libs/types`, `src/libs/enums` — mirror the backend types/enums
- `src/css/` — plain CSS per page/component

## Conventions
- API base URL comes from `VITE_API_URL` (`.env`). Use `withCredentials: true` for authenticated calls.
- New page data: service method → slice action → selector → component.
- Keep types/enums in sync with `../electronix/src/libs`.
- Formatting by Prettier (`.prettierrc.json`); no semicolons in this codebase.
- Commit messages: `feat: ...` / `fix: ...`.
