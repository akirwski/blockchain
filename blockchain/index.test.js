const Blockchain = require('./index');
const Block = require('./block');


describe('Blockchain', () => {
    let bc, bc2;

     //BforeEach runs before each following unit test
    beforeEach(() => {
        //make sure that always starts with new Blockchain created by Blockchain class
        bc = new Blockchain();//first contributer to create blockchain named "A"
        bc2 = new Blockchain();// to demonstrate there is second contributer named "B"
    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
        //chain[0]should already has genesis block
    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        //confirm that the last element's data of the chain is equal to the data I just added.
        expect(bc.chain[bc.chain.length-1].data).toEqual(data)
    });

    //After adding isValidChain Function
    //模擬テスト1全てのhashとlastHashが一致する場合 should return true
    it('validates a valid chain', ()=> {
        //this is going to have valid blockchain variable to it.
        //foo は、genesisのdataと同じなのでgenesisiのhashと同じhash番号がblock0, つまりgenesisとして作られる。
         bc2.addBlock('foo');
         //if the bc chain has euqal has with bc2 chain
         expect(bc.isValidChain(bc2.chain));
    });

    //模擬テスト2add したbc2のgenensisblockが もともとのbcのgenesisiblockと一致しない場合
    it('invalidates a chain with a corrupt genesis block', () =>{
        //上のitでつくったbc2のgenesisのデータを変えると,bc2のgenesisのhash番号も変わるのでbcのhash番号と一致しなくなる。
        bc2.chain[0].data = 'Wrong data';
        expect(bc.isValidChain(bc.chain));

        
    });

    //模擬テスト3最初のgenesisblockとBlock1のhasuが一致しない場合. should return false
    it('invalidates a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';

        expect(bc.isValidChain(bc2.chain));
        //bc2's new block has 'foo' as data, but it changes into "not foo
        //addBlockの中のmineBlock functionをみてみると。dataが違うだけで、全く違うhash を作ってしまうことがわかる。
        //違うhashが作られてしまうと、last hashと合わないことになるので。
        //this means the data was tamperated.
    });


    //After adding replaceChain Function
    //Test 1: f given chain is vaid as input
    it('replaces the chain with a valid chain', () => {
        bc2.addBlock('goo');//bc2 = [genesis , 'foo', 'goo']  while bc = [genesis, 'foo']
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    })
    //Test 2: demonstrate that the chai is not replaced if it receives a chain of less than or euqal to the original length
   it('does not replace the chain with one of less than or equal to length', ()=> {
       bc.addBlock('foo');//then the lenghth of bc is equal to bc2 length
       bc.replaceChain(bc.chain);


       expect(bc.chain).not.toEqual(bc2.chain);
   });



});