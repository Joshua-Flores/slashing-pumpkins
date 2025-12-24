# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend-only Vue.js application** that powers the official website for the **Slashing Pumpkins**, a novice-level beer-league ice hockey team based in **Fairfax, Virginia**.

The site serves as the team's public-facing hub, providing:

- Team roster and player profiles
- Schedule and game results
- General information about the team
- Important links to other platforms such as YouTube.

**Tech stack**:

- Vue 3 (only use composition API)
- Typescript
- Vite for build and development
- Vue Router for routing
- PrimeVue for UI components
- Tailwind CSS for styling.
- No backend, data is maintained manually under the ./src/data directory since it is limited.
- Deployed on Netlify
- Plausible.io for site analytics
- Eslint for enforcing code quality
- Prettier for enforcing code style

Key Characteristics:

- Fully responsive design with expectation that most users will be on mobile devices
- Aggressive, modern styling, with orange as the accent color
- Site is built to be maintained by a single developer

## Key Directories

- `src/` — Root of the application source code
  - `src/assets/` — Static assets such as fonts
  - `src/components/` — Reusable Vue components
  - `src/views/` — Page-level components routed by Vue Router (e.g., `HomeView.vue`, `ScheduleView.vue`)
  - `src/router/` — Vue Router configuration (index.ts with all routes)
  - `src/data/` — Static typescript files for structured data (e.g., `games.ts`, `roster.ts`) used since there is no backend
  - `src/App.vue` — Root component
  - `src/main.ts` — Application entry point
- `public/` — Static files served as-is
  - favicon, logos, media, etc.

## Code Standards

- Only use tailwind for styling. Avoid manually editing css files unless user gives the okay to do so.
- Prefer to use primevue components over creating custom components.
- Never use inline styling.
- Use `type` instead of `interface` for TypeScript type definitions.
