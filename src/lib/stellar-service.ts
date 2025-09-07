import * as StellarSdk from '@stellar/stellar-sdk';

const TESTNET_URL = 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

export class StellarService {
  private server: StellarSdk.Horizon.Server;

  constructor() {
    this.server = new StellarSdk.Horizon.Server(TESTNET_URL);
  }

  async sendXLM(
    senderPublicKey: string,
    recipientPublicKey: string,
    amount: string,
    signTransaction: (xdr: string) => Promise<string>
  ) {
    try {
      // Load sender account
      const account = await this.server.loadAccount(senderPublicKey);
      
      // Build transaction
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: recipientPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: amount,
          })
        )
        .setTimeout(180)
        .build();

      // Convert to XDR for signing
      const xdr = transaction.toXDR();
      
      // Get signature from Freighter
      const signedXDR = await signTransaction(xdr);
      
      // Submit transaction
      const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
        signedXDR,
        NETWORK_PASSPHRASE
      );
      
      const result = await this.server.submitTransaction(signedTransaction as StellarSdk.Transaction);
      
      return {
        success: true,
        hash: result.hash,
        ledger: result.ledger,
      };
    } catch (error: any) {
      console.error('Transaction failed:', error);
      throw new Error(error?.response?.data?.extras?.result_codes?.operations?.[0] || error.message || 'Transaction failed');
    }
  }

  async getBalance(publicKey: string): Promise<string> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const accountBalances = (account as any).balances;
      const xlmBalance = accountBalances?.find(
        (balance: any) => balance.asset_type === 'native'
      );
      return xlmBalance?.balance || '0';
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }
}