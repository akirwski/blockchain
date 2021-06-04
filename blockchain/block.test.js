//access the BLOCK class
const Block = require('./block');

//seves as description of these test
//arrow function will contain a series of tests that hest will excute
//it function goes right in the body of the described function
describe('Block', () => {
    //make variables for BforeEach
    let data, lastBlock, blcok;

    beforeEach(()=> {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });
    //first test
    //describe the the data attribute for that bloack
    //expect function takes an object or any other piece of data like string as first in@ut
    it('sets the data to match the input', () => {
        expect(block.data).toEqual(data);
    });
    //second test
    //BforeEach runs before each following unit test
    it('sets the lastHash to match the has of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});


