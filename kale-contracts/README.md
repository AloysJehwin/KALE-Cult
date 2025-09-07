# KALE Smart Contracts

Complete smart contract files for the KALE Protocol - a Proof-of-Work farming system on Stellar blockchain.

## 📁 Project Structure

```
kale-contracts/
├── src/                    # Rust source code
│   ├── lib.rs             # Main contract entry point
│   ├── contract_farm.rs   # Farming functions (plant, work, harvest)
│   ├── contract_homestead.rs # Admin functions
│   ├── storage.rs         # Data storage management
│   ├── types.rs           # Type definitions
│   ├── errors.rs          # Error handling
│   └── tests.rs           # Unit tests
├── compiled/              # Compiled WASM files
│   └── README.md          # Build instructions
├── scripts/               # Deployment & interaction scripts
│   ├── build.sh          # Build contract
│   ├── deploy.sh         # Deploy to network
│   └── interact.sh       # Interact with deployed contract
├── docs/                  # Documentation
│   └── PROTOCOL.md       # Protocol specification
├── Cargo.toml            # Rust dependencies
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Build the Contract
```bash
./scripts/build.sh
```

### 2. Deploy to Testnet
```bash
./scripts/deploy.sh testnet default
```

### 3. Interact with Contract
```bash
# Plant (stake) tokens
./scripts/interact.sh plant 1000000000

# Submit work
./scripts/interact.sh work 0x0001 12345

# Harvest rewards
./scripts/interact.sh harvest 0
```

## 📋 Contract Details

### Deployed Contract (Testnet)
- **Contract ID:** `CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7`
- **Network:** Stellar Testnet
- **Explorer:** [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7)

### Core Functions

#### `plant(farmer: Address, amount: i128)`
Stake tokens into the farming pool.
- Burns KALE tokens from farmer
- Creates a "Pail" (stake record) in current block
- One stake per farmer per block

#### `work(farmer: Address, hash: BytesN<32>, nonce: u64) -> u32`
Submit proof-of-work for mining.
- Requires active stake in current block
- Validates hash difficulty based on stake amount
- Returns block index

#### `harvest(farmer: Address, index: u32) -> i128`
Claim rewards from completed blocks.
- Block must be complete (5 minutes passed)
- Requires completed work submission
- Mints reward tokens to farmer

## ⚙️ Protocol Constants

```rust
BLOCK_INTERVAL: 300 seconds (5 minutes)
BLOCK_REWARD: 2505 KALE per block
BLOCKS_PER_MONTH: 8640
DECAY_RATE: 5% monthly
STROOPS_PER_KALE: 10,000,000
```

## 🛠️ Development Setup

### Prerequisites
- Rust 1.70+
- Stellar CLI
- Freighter wallet (for testing)

### Install Dependencies
```bash
# Install Stellar CLI
brew install stellar-cli

# Add WASM target
rustup target add wasm32v1-none

# Install contract dependencies
cargo build
```

### Build Contract
```bash
stellar contract build --package kale-sc
stellar contract optimize --wasm target/wasm32v1-none/release/kale_sc.wasm
```

### Run Tests
```bash
cargo test
```

## 📊 Contract Architecture

### Storage Layout
- **Blocks:** Sequential mining blocks (5-minute intervals)
- **Pails:** User stakes in specific blocks
- **Farm State:** Global protocol state
- **Rewards:** Calculated based on stake proportion

### Mining Difficulty
```
Required zeros = log2(user_stake / max_stake_in_block)
```
Higher stake = fewer zeros needed = easier mining

### Reward Calculation
```
User Reward = (User Stake / Total Staked) * Block Reward * Decay^(months_elapsed)
```

## 🔒 Security Features

- **One stake per block:** Prevents duplicate entries
- **Time-locked blocks:** 5-minute mining window
- **Proof-of-work validation:** Hash difficulty verification
- **Decay mechanism:** Deflationary token economics
- **Admin controls:** Pause/unpause functionality

## 📝 Integration Guide

### Using in JavaScript/TypeScript
```javascript
import { KaleContract } from '../kale-api-core';

const kale = new KaleContract({
  contractId: 'CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7',
  stellarService: stellar,
  networkPassphrase: Networks.TESTNET
});

// Plant tokens
await kale.plant(publicKey, farmerAddress, "1000000000");

// Submit work
await kale.work(publicKey, farmerAddress, hash, nonce);

// Harvest rewards
await kale.harvest(publicKey, farmerAddress, blockIndex);
```

### Direct CLI Usage
```bash
# Plant
stellar contract invoke \
  --id CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7 \
  --network testnet \
  --source default \
  -- plant --farmer G... --amount 1000000000

# Work
stellar contract invoke \
  --id CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7 \
  --network testnet \
  --source default \
  -- work --farmer G... --hash 0x... --nonce 12345

# Harvest
stellar contract invoke \
  --id CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7 \
  --network testnet \
  --source default \
  -- harvest --farmer G... --index 0
```

## 📚 Documentation

- [Protocol Specification](docs/PROTOCOL.md)
- [API Reference](../kale-api-core/docs/API-REFERENCE.md)
- [Deployment Guide](../kale-api-core/docs/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. All tests pass
2. Code follows Rust best practices
3. Documentation is updated

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban SDK](https://soroban.stellar.org/)
- [Freighter Wallet](https://freighter.app/)
- [Stellar Expert Explorer](https://stellar.expert/)