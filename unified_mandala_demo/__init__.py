"""Python metadata shim for the unified-mandala Node/TypeScript demo layer."""

from __future__ import annotations

from pathlib import Path

__version__ = "1.0.1"

_REPO_ROOT = Path(__file__).resolve().parents[1]


def demo_root() -> Path:
    """Return the repository root (Node demo assets, public/, scripts/)."""
    return _REPO_ROOT