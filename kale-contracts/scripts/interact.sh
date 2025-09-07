#!/bin/bash

# KALE Contract Interaction Script
# Execute contract functions from command line

set -e

# Configuration
CONTRACT_ID=${CONTRACT_ID:-CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7}
NETWORK=${NETWORK:-testnet}
SOURCE=${SOURCE:-default}

# Function to display usage
usage() {
    echo "Usage: $0 <command> [arguments]"
    echo ""
    echo "Commands:"
    echo "  plant <amount>           - Stake tokens (amount in stroops)"
    echo "  work <hash> <nonce>      - Submit proof-of-work"
    echo "  harvest <index>          - Harvest rewards from block"
    echo "  balance                  - Check account balance"
    echo "  info                     - Get contract info"
    echo ""
    echo "Environment Variables:"
    echo "  CONTRACT_ID - Contract address (default: testnet deployment)"
    echo "  NETWORK     - Network to use (default: testnet)"
    echo "  SOURCE      - Source account (default: default)"
    echo ""
    echo "Examples:"
    echo "  $0 plant 1000000000      # Plant 100 KALE"
    echo "  $0 work 0x0001 12345      # Submit work"
    echo "  $0 harvest 0              # Harvest block 0"
    exit 1
}

# Check if Stellar CLI is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI is not installed"
    echo "Install with: brew install stellar-cli"
    exit 1
fi

# Get farmer address
FARMER=$(stellar keys address $SOURCE)

# Process commands
case "$1" in
    plant)
        if [ -z "$2" ]; then
            echo "❌ Missing amount argument"
            usage
        fi
        echo "🌱 Planting $2 stroops..."
        stellar contract invoke \
            --id $CONTRACT_ID \
            --network $NETWORK \
            --source $SOURCE \
            -- \
            plant \
            --farmer $FARMER \
            --amount $2
        echo "✅ Plant successful!"
        ;;
        
    work)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "❌ Missing hash or nonce argument"
            usage
        fi
        echo "⛏️ Submitting work..."
        stellar contract invoke \
            --id $CONTRACT_ID \
            --network $NETWORK \
            --source $SOURCE \
            -- \
            work \
            --farmer $FARMER \
            --hash $2 \
            --nonce $3
        echo "✅ Work submitted!"
        ;;
        
    harvest)
        if [ -z "$2" ]; then
            echo "❌ Missing index argument"
            usage
        fi
        echo "🌾 Harvesting block $2..."
        stellar contract invoke \
            --id $CONTRACT_ID \
            --network $NETWORK \
            --source $SOURCE \
            -- \
            harvest \
            --farmer $FARMER \
            --index $2
        echo "✅ Harvest successful!"
        ;;
        
    balance)
        echo "💰 Checking balance for $FARMER..."
        stellar account balance $SOURCE --network $NETWORK
        ;;
        
    info)
        echo "📋 Contract Information"
        echo "  Contract ID: $CONTRACT_ID"
        echo "  Network:     $NETWORK"
        echo "  Farmer:      $FARMER"
        echo ""
        stellar contract info --id $CONTRACT_ID --network $NETWORK
        ;;
        
    *)
        echo "❌ Unknown command: $1"
        usage
        ;;
esac