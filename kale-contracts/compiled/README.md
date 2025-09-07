# Compiled WASM Files

## Current Deployment

**Contract ID:** `CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7`
**Network:** Stellar Testnet
**WASM Hash:** `2324cfb0ad3d71263dc7cd1ffa4a254c26c41ed7bee88e18d1c37e5d60ab9eb8`

## Build Instructions

To compile the KALE smart contract:

```bash
# 1. Install Stellar CLI
brew install stellar-cli

# 2. Add WASM target
rustup target add wasm32v1-none

# 3. Build the contract
stellar contract build --package kale-sc

# 4. Optimize the WASM
stellar contract optimize --wasm target/wasm32v1-none/release/kale_sc.wasm
```

The optimized WASM will be at: `target/wasm32v1-none/release/kale_sc.optimized.wasm`

## File Sizes
- Unoptimized: ~17.4 KB
- Optimized: ~14.8 KB

## Exported Functions
- `__constructor` - Initialize contract
- `plant` - Stake tokens
- `work` - Submit proof-of-work
- `harvest` - Claim rewards
- `pause` - Pause farming
- `unpause` - Resume farming
- `remove_block` - Admin function
- `upgrade` - Contract upgrade
- `__check_auth` - Authentication