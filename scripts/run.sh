#!/usr/bin/env bash
set -euo pipefail
pnpm install
pnpm maps:all || true
pnpm dev
