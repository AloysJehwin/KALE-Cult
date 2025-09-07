/**
 * KALE Smart Contract Integration Module
 * Implements all contract functions: plant, work, harvest
 */

import { 
  StellarService,
  addressToScVal,
  i128ToScVal,
  u64ToScVal,
  u32ToScVal,
  bytesNToScVal
} from "./stellar";
import { signTransaction } from "./wallet";
import { xdr } from "@stellar/stellar-sdk";

export interface KaleContractConfig {
  contractId: string;
  stellarService: StellarService;
  networkPassphrase: string;
}

export class KaleContract {
  private contractId: string;
  private stellar: StellarService;
  private networkPassphrase: string;

  constructor(config: KaleContractConfig) {
    this.contractId = config.contractId;
    this.stellar = config.stellarService;
    this.networkPassphrase = config.networkPassphrase;
  }

  /**
   * Plant (stake) tokens in the farming contract
   * @param signerKey - Public key of the signer
   * @param farmerAddress - Address of the farmer (can be same as signer)
   * @param amount - Amount to stake in stroops (1 KALE = 10,000,000 stroops)
   */
  async plant(
    signerKey: string,
    farmerAddress: string,
    amount: string
  ): Promise<any> {
    const args = [
      addressToScVal(farmerAddress),
      i128ToScVal(amount)
    ];

    const txXDR = await this.stellar.buildContractTransaction(
      signerKey,
      this.contractId,
      "plant",
      args
    );

    const signResult = await signTransaction(
      txXDR,
      this.networkPassphrase,
      signerKey
    );

    return await this.stellar.submitTransaction(signResult.signedXDR);
  }

  /**
   * Submit proof of work for mining
   * @param signerKey - Public key of the signer
   * @param farmerAddress - Address of the farmer
   * @param hash - 32-byte hash (hex string)
   * @param nonce - Nonce value for proof of work
   */
  async work(
    signerKey: string,
    farmerAddress: string,
    hash: string,
    nonce: string
  ): Promise<any> {
    const args = [
      addressToScVal(farmerAddress),
      bytesNToScVal(hash),
      u64ToScVal(nonce)
    ];

    const txXDR = await this.stellar.buildContractTransaction(
      signerKey,
      this.contractId,
      "work",
      args
    );

    const signResult = await signTransaction(
      txXDR,
      this.networkPassphrase,
      signerKey
    );

    return await this.stellar.submitTransaction(signResult.signedXDR);
  }

  /**
   * Harvest rewards from completed blocks
   * @param signerKey - Public key of the signer
   * @param farmerAddress - Address of the farmer
   * @param blockIndex - Index of the block to harvest
   */
  async harvest(
    signerKey: string,
    farmerAddress: string,
    blockIndex: number
  ): Promise<any> {
    const args = [
      addressToScVal(farmerAddress),
      u32ToScVal(blockIndex)
    ];

    const txXDR = await this.stellar.buildContractTransaction(
      signerKey,
      this.contractId,
      "harvest",
      args
    );

    const signResult = await signTransaction(
      txXDR,
      this.networkPassphrase,
      signerKey
    );

    return await this.stellar.submitTransaction(signResult.signedXDR);
  }

  /**
   * Get contract information
   */
  getContractId(): string {
    return this.contractId;
  }
}