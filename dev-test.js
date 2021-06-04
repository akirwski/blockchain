//the goal of this file is to explore the block class 
const Block = require('./block');

//couldn't do const Block = require('./block');

/*
const block = new Block('time', 'lasthash', 'hash', 'data');
console.log(block.toString());
console.log(Block.genesis().toString());

//change all the attributes into string and console
// a "console" implies an application that has a text-based interface.


//go to package.json and add a script to immediately read this file
*/

const foolBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(foolBlock.toString());

//create new genesis block as the lastBlock