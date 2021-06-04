const Block = require('./block');


class Blockchain{
    constructor(){
        //array called cahin should be posessed with blockchain 
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        //this.chain.length-1 represents the last element in the chain
        //push fucntion is to add
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

    //to see the hash is the same as previous hash [Hash Validation functionarity]
    isValidChain(chain){
        //the first chain should be the genesis block, if not the chain is not valid
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for(let i=1; i<chain.length; i++){
            const block = chain[i];//genesis の次のblcok
            const lastBlock = chain[i-1]//chain のlast block

            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                return false;

            }
        }
        return true;
    }

    //newChain should be valid chain which was made sure with is Vlaid chain
    replaceChain(newChain) {
        //make sure the new chain is longer than current length of chain
        if(newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain');
            return;
        } else if (!this.isValidChain(newChain)) {
            //check the new chain is valid meaning it has the same last hash and hash
            console.log('the received chain is not valid');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.chain = newChain;
        

    }

}

module.exports = Blockchain;