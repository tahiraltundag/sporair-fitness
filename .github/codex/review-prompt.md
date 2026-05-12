# Codex Review — SporAirFitness

## Project Context
- Next.js 16.2.6 (breaking changes from standard Next.js — check `node_modules/next/dist/docs/` for current APIs)
- React 19.2.4
- Tailwind CSS v4 with `@tailwindcss/postcss`
- TypeScript 5 (strict)
- Framer Motion for animations
- Premium fitness studio website (single-page marketing site)

## Review Guidelines

### Priority Levels
- **P0** — Security vulnerability, data loss, broken build, or crash in production
- **P1** — Functional bug, missing error boundary, broken layout on key screen sizes
- **P2** — Code quality: missing types, unused imports, accessibility gaps, performance concern
- **P3** — Style nit: inconsistent naming, magic numbers, missing Tailwind utility usage

### What to flag
- TypeScript `any` usage (should be avoided)
- Missing or broken responsive design (mobile-first Tailwind classes)
- Hardcoded strings that should be extracted
- Missing `alt` attributes on images
- Framer Motion `exit` prop usage without `AnimatePresence`
- Direct DOM manipulation instead of React state
- Missing `key` props in lists
- Next.js 16 API violations (check AGENTS.md for context)
- Inline styles that should use Tailwind utilities
- Unused imports or dead code

### What to ignore
- File/folder structure debates
- Preference for arrow vs function declarations
- Naming debates that don't affect clarity
