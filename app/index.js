const express = require('express');
const bodyParser = require('body-parser');
//create an instance of this blockchain class
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

//declare a constant called HTTP port and set it to 3001
//this allow us to run on port 3001 when we're running the server so we can access it through the local host domain 
//to let multiple instances use the same port add

const HTTP_PORT = process.env.HTTP_PORT || 3001;

//$ HTTP_PORT=3002 npm run dev

//give a result from express port into app

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);
//this allows recieve json within poser class
app.use(bodyParser.json());
//make us possible to see what's already been stored
//get method has to parameters; req and res. 
//blocks file is the endpoint

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});
//users use this post when they want to add some data to the blockchain
//we need to create a block with data which went throught the body function  and turned itto JSON type
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  //this allows us to send a synchronization everytime a mine occurs
  p2pServer.syncChains();
  //we need to come back from endpoin to blocks
  res.redirect('/blocks');
});
//listen method can make us able to make sure the app is running
//listen method takes two parameters: HTTP port and out put of message
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();

