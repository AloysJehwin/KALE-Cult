#!/bin/bash

# KALE Smart Contract Deployment Script
# Deploys the KALE contract to Stellar network

set -e

# Configuration
NETWORK=${1:-testnet}
SOURCE_ACCOUNT=${2:-default}
FARMER_ADDRESS=${3:-$(stellar keys address $SOURCE_ACCOUNT)}
ASSET_ADDRESS=${4:-CDQKZ76ZS7LYDOZ2E7OG5LUJEWDDUNYBVYRJTBJK6645DZBNJWA7DXCR}

echo "🚀 KALE Contract Deployment"
echo "=========================="
echo "Network:        $NETWORK"
echo "Source Account: $SOURCE_ACCOUNT"
echo "Farmer Address: $FARMER_ADDRESS"
echo "Asset Address:  $ASSET_ADDRESS"
echo ""

# Check if Stellar CLI is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI is not installed"
    echo "Install with: brew install stellar-cli"
    exit 1
fi

# Check if WASM file exists
WASM_FILE="target/wasm32v1-none/release/kale_sc.optimized.wasm"
if [ ! -f "$WASM_FILE" ]; then
    echo "❌ WASM file not found: $WASM_FILE"
    echo "Run ./scripts/build.sh first"
    exit 1
fi

# Check if account exists
echo "🔍 Checking account..."
if ! stellar keys address $SOURCE_ACCOUNT &> /dev/null; then
    echo "❌ Account $SOURCE_ACCOUNT not found"
    echo "Generate with: stellar keys generate $SOURCE_ACCOUNT --network $NETWORK"
    exit 1
fi

# Deploy the contract
echo "📤 Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
    --wasm $WASM_FILE \
    --network $NETWORK \
    --source $SOURCE_ACCOUNT \
    -- \
    --farmer $FARMER_ADDRESS \
    --asset $ASSET_ADDRESS)

echo ""
echo "✅ Deployment successful!"
echo ""
echo "📋 Contract Details:"
echo "  Contract ID: $CONTRACT_ID"
echo "  Network:     $NETWORK"
echo ""
echo "🔗 View on Explorer:"
if [ "$NETWORK" = "testnet" ]; then
    echo "  https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
else
    echo "  https://stellar.expert/explorer/public/contract/$CONTRACT_ID"
fi
echo ""
echo "📝 Next Steps:"
echo "  1. Update CONTRACT_ID in your configuration"
echo "  2. Fund the contract if needed"
echo "  3. Test with: stellar contract invoke --id $CONTRACT_ID --network $NETWORK --source $SOURCE_ACCOUNT -- get_info"