#!/usr/bin/env bash
set -euo pipefail

PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${1:-.}" && pwd)"

if ! git -C "$REPO_ROOT" rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "ERROR: target is not a Git repository: $REPO_ROOT" >&2
  exit 1
fi

BRANCH="$(git -C "$REPO_ROOT" branch --show-current)"
if [[ "$BRANCH" == "main" ]]; then
  echo "ERROR: refusing to apply directly on main. Create a working branch first." >&2
  exit 1
fi

TARGETS=(
  "src/components/home/homepage.module.css"
  "src/components/home/latest-guides.module.css"
  "src/components/layout/mobile-menu.tsx"
  "tests/e2e/homepage-visual-audit.spec.ts"
)

for relative_path in "${TARGETS[@]}" "src/app/globals.css"; do
  if [[ ! -f "$REPO_ROOT/$relative_path" ]]; then
    echo "ERROR: expected Stage 1.2 file is missing: $relative_path" >&2
    exit 1
  fi
done

if ! git -C "$REPO_ROOT" apply --check "$PACKAGE_DIR/patches/globals.css.patch"; then
  echo "ERROR: globals.css patch does not match this checkout. No files were copied." >&2
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$REPO_ROOT/.patch-backups/stage-1.2-audit/$STAMP"
mkdir -p "$BACKUP_DIR"

for relative_path in "${TARGETS[@]}" "src/app/globals.css"; do
  mkdir -p "$BACKUP_DIR/$(dirname "$relative_path")"
  cp -p "$REPO_ROOT/$relative_path" "$BACKUP_DIR/$relative_path"
done

git -C "$REPO_ROOT" apply "$PACKAGE_DIR/patches/globals.css.patch"
for relative_path in "${TARGETS[@]}"; do
  mkdir -p "$REPO_ROOT/$(dirname "$relative_path")"
  cp "$PACKAGE_DIR/$relative_path" "$REPO_ROOT/$relative_path"
done

git -C "$REPO_ROOT" diff --check

echo "BuddyDays audit fixes applied."
echo "Branch: $BRANCH"
echo "Backups: $BACKUP_DIR"
echo "Next: npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e"
