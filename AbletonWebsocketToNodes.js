const Max = require('max-api');
const ws = require('ws');
const config = require("./config");

// Init:
Max.removeHandlers();

// Singletons
const wss = new ws.WebSocketServer(config.websocketSettings);

let websocketServer;

// Handlers:
const onMessageFromClient = (msg) => {
  const { type, args, meta } = JSON.parse(msg);
  Max.post('Received message from client:', args);
}

const onConnection = (server) => {
  websocketServer = server;
  websocketServer.on('message', onMessageFromClient);
  Max.post('New client connected! Saying hello to new client! :)');
  websocketServer.send(JSON.stringify({
    type: 'message',
    args: 'Hello new client, Im the server!',
    meta: {}
  }));
}

const onShutdown = () => {
  wss.removeAllListeners();
  wss.close();
}

const onControl = (...args) => {
  // Max.post(args);
  if (websocketServer) {
    websocketServer.send(JSON.stringify({ type: 'control', args, meta: {} }));
  }
}

const onNote = (...args) => {
  // Max.post(args);
  if (websocketServer) {
    websocketServer.send(JSON.stringify({ type: 'note', args, meta: {} }));
  }
}

// Events listeners:
wss.on('connection', onConnection);
Max.addHandler("control", onControl)
Max.addHandler("note", onNote)
Max.registerShutdownHook(onShutdown);


