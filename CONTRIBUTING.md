# Contributing

Thanks for your interest in contributing to this GenesisAeon ecosystem
package!

## Getting started

1. Fork and clone the repository.
2. Install dependencies: `pnpm install` (or `npm install`).
3. Run the dev server: `pnpm dev` (or `npm run dev`).
4. Run the test suite: `npm test` (Node's built-in test runner) and
   `npx vitest run` for the Vitest-based suites.

## Code style

- Keep TypeScript/JavaScript modules consistent with the existing style
  in `src/`, `tools/`, and `scripts/`.
- Add or update tests for any behavioral change (`test/`, `tests/`).
- Keep functions documented where the "why" isn't obvious from the name.

## Diamond Interface packages

If this package implements the GenesisAeon Diamond Interface
(`run_cycle`, `get_crep_state`, `get_utac_state`, `get_phase_events`,
`to_zenodo_record`), any change to these methods' signatures or return
shapes is a **breaking change** and requires a MAJOR version bump (see
`RELEASE_GUIDE.md`).

## Pull requests

- One logical change per PR.
- Add or update tests for any behavioral change.
- Update `CHANGELOG.md` under an `## [Unreleased]` section.
- Fill out the PR template (`.github/PULL_REQUEST_TEMPLATE.md`).

## Reporting issues

Please use the issue templates in `.github/ISSUE_TEMPLATE/` — they help us
triage bug reports vs. feature requests quickly.

## Scientific claims

This is part of a research framework. If your contribution touches any
scientific model, prediction, or benchmark (e.g. CREP `Γ` values, UTAC
parameters, falsifiable predictions), please:
- Cite the source (paper, dataset, or prior GenesisAeon Zenodo record).
- Clearly mark speculative vs. validated claims, consistent with this
  repo's existing governance docs (`GOVERNANCE.md`).
