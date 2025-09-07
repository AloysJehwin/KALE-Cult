/**
 * Stellar SDK Integration Module
 * Handles blockchain interactions, transactions, and account management
 */

import {
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  BASE_FEE,
  Address,
  xdr,
  nativeToScVal,
  Horizon,
  Account
} from "@stellar/stellar-sdk";
import { signTransaction } from "./wallet";

// Network Configuration
export const TESTNET_HORIZON = "https://horizon-testnet.stellar.org";
export const MAINNET_HORIZON = "https://horizon.stellar.org";
export const TESTNET_PASSPHRASE = Networks.TESTNET;
export const MAINNET_PASSPHRASE = Networks.PUBLIC;

export interface NetworkConfig {
  horizonUrl: string;
  networkPassphrase: string;
  isTestnet: boolean;
}

export class StellarService {
  private horizonServer: Horizon.Server;
  private networkPassphrase: string;

  constructor(config: NetworkConfig) {
    this.horizonServer = new Horizon.Server(config.horizonUrl);
    this.networkPassphrase = config.networkPassphrase;
  }

  /**
   * Get account information
   */
  async getAccount(publicKey: string): Promise<Account> {
    try {
      return await this.horizonServer.loadAccount(publicKey);
    } catch (error) {
      throw new Error("Account not found or not funded");
    }
  }

  /**
   * Get account balance
   */
  async getBalance(publicKey: string): Promise<string> {
    const account = await this.getAccount(publicKey);
    const accountBalances = (account as any).balances;
    const xlmBalance = accountBalances?.find(
      (balance: any) => balance.asset_type === "native"
    );
    return xlmBalance?.balance || "0";
  }

  /**
   * Send XLM payment
   */
  async sendPayment(
    senderPublicKey: string,
    recipientPublicKey: string,
    amount: string
  ): Promise<any> {
    const sourceAccount = await this.getAccount(senderPublicKey);
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: recipientPublicKey,
          asset: Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();

    const signResult = await signTransaction(
      transaction.toXDR(),
      this.networkPassphrase,
      senderPublicKey
    );
    
    const signedTransaction = TransactionBuilder.fromXDR(
      signResult.signedXDR,
      this.networkPassphrase
    );

    return await this.horizonServer.submitTransaction(signedTransaction);
  }

  /**
   * Build contract invocation transaction
   */
  async buildContractTransaction(
    sourcePublicKey: string,
    contractId: string,
    method: string,
    args: xdr.ScVal[]
  ): Promise<string> {
    const account = await this.getAccount(sourcePublicKey);
    const contract = new Address(contractId);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(
        Operation.invokeContractFunction({
          contract: contract.toScAddress() as any,
          function: method,
          args: args,
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  }

  /**
   * Submit signed transaction
   */
  async submitTransaction(signedXDR: string): Promise<any> {
    const transaction = TransactionBuilder.fromXDR(
      signedXDR,
      this.networkPassphrase
    );
    return await this.horizonServer.submitTransaction(transaction);
  }
}

// Utility functions for type conversion
export function addressToScVal(address: string): xdr.ScVal {
  return new Address(address).toScVal();
}

export function i128ToScVal(amount: string): xdr.ScVal {
  return nativeToScVal(BigInt(amount), { type: "i128" });
}

export function u64ToScVal(value: string): xdr.ScVal {
  return nativeToScVal(BigInt(value), { type: "u64" });
}

export function u32ToScVal(value: number): xdr.ScVal {
  return xdr.ScVal.scvU32(value);
}

export function bytesNToScVal(hex: string): xdr.ScVal {
  // Remove 0x prefix if present
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const buffer = Buffer.from(cleanHex, "hex");
  return xdr.ScVal.scvBytes(buffer);
}