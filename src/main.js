const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('cbf14c3e8cdbb8c257383b66023312d1f27326dff805e2f5898558e0af3b3820');
const myWalletAddress = myKey.getPublic('hex');

let brewCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
brewCoin.addTransaction(tx1);

console.log('\nStarting miner...\n');
brewCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of miner is', brewCoin.getBalanceOfAddress(myWalletAddress));

brewCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', brewCoin.isChainValid());