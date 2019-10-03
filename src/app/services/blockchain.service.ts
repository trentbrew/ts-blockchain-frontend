import { Injectable } from '@angular/core';
import { Blockchain } from 'brewcoin-service/blockchain'; 
import EC from "elliptic";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public walletKeys  = [];

  constructor() {
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('my-wallet-address');

    this.generateWalletKeys();
  }

  public getBlocks() {
    return this.blockchainInstance.chain;
  }

  public addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }

  public getPendingTransactions() {
    return this.blockchainInstance.getPendingTransactions;
  }

  public minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  private generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex')
    });
  }
}
