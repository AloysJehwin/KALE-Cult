#!/bin/bash

# KALE Smart Contract Build Script
# Builds and optimizes the KALE smart contract for deployment

set -e

echo "🔨 Building KALE Smart Contract..."

# Check if Stellar CLI is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI is not installed"
    echo "Install with: brew install stellar-cli"
    exit 1
fi

# Check if wasm32v1-none target is installed
if ! rustup target list --installed | grep -q wasm32v1-none; then
    echo "📦 Installing wasm32v1-none target..."
    rustup target add wasm32v1-none
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf target/wasm32v1-none/release

# Build the contract
echo "🔨 Building contract..."
stellar contract build --package kale-sc

# Optimize the WASM
echo "📦 Optimizing WASM..."
stellar contract optimize --wasm target/wasm32v1-none/release/kale_sc.wasm

# Display results
echo "✅ Build complete!"
echo ""
echo "📊 Build Results:"
echo "  Unoptimized: target/wasm32v1-none/release/kale_sc.wasm"
echo "  Optimized:   target/wasm32v1-none/release/kale_sc.optimized.wasm"
echo ""

# Show file sizes
if [ -f "target/wasm32v1-none/release/kale_sc.wasm" ]; then
    UNOPT_SIZE=$(wc -c < "target/wasm32v1-none/release/kale_sc.wasm")
    echo "  Unoptimized size: $UNOPT_SIZE bytes"
fi

if [ -f "target/wasm32v1-none/release/kale_sc.optimized.wasm" ]; then
    OPT_SIZE=$(wc -c < "target/wasm32v1-none/release/kale_sc.optimized.wasm")
    echo "  Optimized size:   $OPT_SIZE bytes"
fi

echo ""
echo "🚀 Ready for deployment!"