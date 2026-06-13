#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Checking design token artifacts..."
node "build.mjs" --check

required=(
  "tokens/foundation.json"
  "dist/css/foundation.css"
  "npm/tokens-css/dist/css/foundation.css"
  "swift/Sources/IntrinsicDesign/IntrinsicFoundation.generated.swift"
  "swift/Package.swift"
  "npm/tokens-css/package.json"
)

for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "Missing: $path" >&2
    exit 1
  fi
done

echo "Design checks passed."
