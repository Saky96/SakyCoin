// BlockChain implementation
const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timeSamp, data, previousHash = ''){
        this.index = index;
        this.timeSamp = timeSamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timeSamp + this.data + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true;
    }
}

let sakyCoin = new BlockChain();
sakyCoin.addBlock(new Block(1, "10/01/2020", {amount: 100}))
sakyCoin.addBlock(new Block(1, "10/01/2020", {amount: 4}))
sakyCoin.addBlock(new Block(1, "10/01/2020", {amount: 6000}))

console.log(JSON.stringify(sakyCoin, null, 4))

console.log(sakyCoin.isChainValid());  

sakyCoin.chain[1].data = {amount: 1000}
sakyCoin.chain[1].hash = sakyCoin.chain[1].calculateHash()

 console.log(sakyCoin.isChainValid()); 
