const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];


class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;

    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer);

      socket.on('open', () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');

    this.messageHandler(socket);

    //socket.send(JSON.stringigy()this.blockchain.chain); this send whole the connected chain to the terminal
    this.sendChain(socket);

  }

  messageHandler(socket) {
    socket.on('message', message => {
            //sting JSONのmessage をjaba script型に変える
            const data = JSON.parse(message);
           
            
            this.blockchain.replaceChain(data);
    });
  }

  //when new block is added to a chain, we want to let each peer aware to the addition.so we need to always update the loggest chain.
  //this function will be send the updated block chain of this current instance to all the sockets of peers
  syncChains(){
    //for each of socket, send and updated the current connected socket
    this.sockets.forEach(socket => {this.sendChain(socket)});
  }

  sendChain(socket){
    socket.send(JSON.stringify(this.blockchain.chain));
  }
}

module.exports = P2pServer;

