
//this require the SHA256 function from  crypto-js
//terminal type npm ~~ 
const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block - 
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0,10)}
        Hash     : ${this.hash.substring(0,10)}
        Data     : ${this.data}`;

    }
    //constructor function helps us to find the univque attributes for any instance of this class
    //attributes should be stated in ()
    // this is an object represents an actual class

    // es6 interpolation meaning we can display variable data within in
    //bac ticks

    //input ${}

    //.substring take only 10 of characters it helps if the string is really long


    //-----------Genesius Block class-----------
    static genesis() {
        return new this('foo', 'bar', 'f1938787-hdj', []);
    }
    //genesis function is creating the first block which should include the dummy data
    //static class does not need instance . it can create functions  without having to make a new instance of the block
    //this means the Block class
    // [] is empty array for data in genesis block 

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);//get hash from hash function

        return new this(timestamp, lastHash, hash, data);

    }
    //mineBlock function is creating new block to connect. this should include actual data
    //Date id native JavaScript object
    //we need to connect with previous block with lastBlock.hash

    static hash (timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        //blockの中のvariableを取り出すときは{} 
        const { timestamp, lastHash, data } = block;
        //hashをつくる
        return Block.hash(timestamp, lastHash, data);
    }
}

module.exports = Block;

//do "$ node module.js" in terminal to use module

// to make sure taht this block class is shared in different file
//expore as a module 
//syntax for this exporting is
//module.exports = object that we want to share;



