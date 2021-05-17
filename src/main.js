const{Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('2c9afe8daa2b3d77dbc1ec0ef70074e39a19eb8808b73d0e9d40d9f99782a69b');
const myWalletAddress = myKey.getPublic('hex');

let turingCoin=new Blockchain();

const tx1 = new Transaction(myWalletAddress,'public key goes here', 10);
tx1.signTransaction(myKey);
turingCoin.addTransaction(tx1);


//turingCoin.createTransaction(new Transaction('address1','address2',100));
//turingCoin.createTransaction(new Transaction('address1','address2',50));

console.log('\n Starting the miner...');
turingCoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of claudio is ', turingCoin.getBalanceOfAddress(myWalletAddress));

//turingCoin.chain[1].transactions[0].amount=1;

console.log('Is chain valid?', turingCoin.isChainValid());

//console.log('\n Starting the miner again...');
//turingCoin.minePendingTransactions('claudio-address');

//console.log('\n Balance of claudio is ', turingCoin.getBalanceOfAddress('claudio-address'));