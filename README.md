# KALE-CULT 

A decentralized agricultural staking platform built on Stellar blockchain, connecting real-world farming with DeFi yields.

## Features

### Core Functionality
- **Farm Staking**: Stake XLM on verified agricultural fields
- **Freighter Wallet Integration**: Seamless Web3 connectivity
- **Real-time Tracking**: Monitor staking positions and yields
- **Transparent Transactions**: All stakes verifiable on Stellar blockchain

### Smart Contract
- **Contract ID**: `CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7`
- **Network**: Stellar Testnet (Soroban)
- **Block Interval**: 5 minutes
- **Block Reward**: 2505 KALE
- **Monthly Decay**: 5%

## How It Works

1. **Connect Wallet**: Link your Freighter wallet to the platform
2. **Select Farm**: Choose from available agricultural fields
3. **Stake XLM**: Send XLM to the farmer's address to participate
4. **Earn Yields**: Receive KALE rewards based on farm performance
5. **Track Progress**: Monitor your stakes and returns in real-time

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Stellar Network, Soroban Smart Contracts
- **Wallet**: Freighter Browser Extension
- **Styling**: Tailwind CSS
- **APIs**: KALE-API-Core for contract integration

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/KALE-Cult.git
cd KALE-Cult

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Configuration

1. Install [Freighter Wallet](https://www.freighter.app/)
2. Switch to Stellar Testnet
3. Get test XLM from [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
4. Connect wallet and start staking

## Smart Contract Functions

### Core Methods
- `plant()` - Stake tokens in farming pool
- `work()` - Submit proof-of-work for mining
- `harvest()` - Claim accumulated rewards

## Project Structure

```
├── src/
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── contexts/     # Wallet context
│   └── lib/          # Stellar/KALE integration
├── kale-api-core/    # Smart contract API library
└── public/           # Static assets
```

## Farmer Address
All staking transactions are sent to:
`GD664UTMLQ2BQCUWXILU4NJLHWSDYV6IUMJZZCD7F3H7VNHY3CO7KUT2`

## Links

- [View Contract on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7)
- [Get Test XLM](https://laboratory.stellar.org/#account-creator?network=test)
- [Freighter Wallet](https://www.freighter.app/)


---

Built with 🌱 by KALE-CULT Ooviya and Aloys Jehwin
