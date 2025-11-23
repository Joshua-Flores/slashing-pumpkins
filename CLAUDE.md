# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite application using Vue Router for routing, PrimeVue for UI components, and Tailwind CSS for styling. The project is in early stages with a minimal setup and no components/views yet defined.

## Development Commands

**Start development server:**

```bash
npm run dev
```

**Build for production:**

```bash
npm run build
```

This runs type checking and builds in parallel using `npm-run-all2`.

**Type checking only:**

```bash
npm run type-check
```

Uses `vue-tsc` for Vue-aware TypeScript checking.

**Linting:**

```bash
npm run lint
```

Runs ESLint with auto-fix enabled. Uses Vue's flat config with TypeScript support.

**Formatting:**

```bash
npm run format
```

Formats `src/` directory using Prettier.

**Preview production build:**

```bash
npm run preview
```

## Architecture

**Entry point:** `src/main.ts` creates the Vue app instance and mounts it with the router.

**Routing:** Vue Router is configured in `src/router/index.ts` using web history mode. The routes array is currently empty and ready for route definitions.

**Path alias:** `@` is configured to resolve to `src/` directory (defined in `vite.config.ts`).

**Component structure:** The project uses Vue 3 Single File Components (SFC) with `<script setup lang="ts">` syntax. No components or views directories exist yet.

**Styling:** Tailwind CSS is configured for custom styling. PrimeVue components are available with the Nora theme preset using orange as the primary color (Tailwind's orange-500: `#f97316`). Ripple effect is enabled globally.

**UI Components:** PrimeVue is configured in `src/main.ts`. Import components individually as needed (e.g., `import Button from 'primevue/button'`). PrimeIcons are also available for use.

## Configuration Notes

- Node.js version requirement: `^20.19.0 || >=22.12.0`
- ESLint uses flat config format with Vue essential rules and TypeScript recommended rules
- Prettier is integrated to skip formatting conflicts with ESLint
- Vite DevTools plugin is enabled for development
- TypeScript uses project references (`tsconfig.node.json` and `tsconfig.app.json`)
- Tailwind CSS is configured with PostCSS and imported in `src/assets/main.css`
- PrimeVue uses Nora theme with orange primary color and ripple directive enabled
- Use Tailwind for all custom styling; use PrimeVue components for common UI patterns
