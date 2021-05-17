const SHA256 =require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();

    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("Block mined: " +this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
        this.difficulty = 2;

    }
    createGenesisBlock(){
        return new Block(0, "01/05/2021", "Genesis BLock", "0");

    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];

    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock =this.chain[i];
            const previousBlock =this.chain[i-1];

            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                return false;
            }
        }

        return true;
    }

}


let turingCoin=new Blockchain();

console.log('Mining block 1..');
turingCoin.addBlock(new Block(1,"02/05/2021",{amount:1}));
console.log('Mining block 2..');
turingCoin.addBlock(new Block(2,"02/05/2021",{amount:2}));


//console.log('Is blockchain valid? ' + turingCoin.isChainValid());


//turingCoin.chain[1].data = {amount:100};
//turingCoin.chain[1].chain= turingCoin.chain[1].calculateHash();
//console.log('Is blockchain valid? ' + turingCoin.isChainValid());
//console.log(JSON.stringify(turingCoin,null,4));