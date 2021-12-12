const Max = require('max-api');
const ws = require('ws');
const config = require("./config");

// Init:
Max.removeHandlers();

// Singletons
const wss = new ws.WebSocketServer({
  port: config.ServerPort,
});

let websocketServer;

// Handlers:
const onMessageFromClient = (data) => {
  Max.post('Received message from client:', data.toString());
}

const onConnection = (server) => {
  websocketServer = server;
  websocketServer.on('message', onMessageFromClient);
  Max.post('New client connected! Saying hello to new client! :)');
  websocketServer.send('Hello new client, Im the server!');
}

const onBang = () => {
  Max.post(JSON.stringify("test"));
}

const onShutdown = () => {
  wss.removeAllListeners();
  wss.close();
}

// Events listeners:
wss.on('connection', onConnection);
Max.addHandler("bang", onBang);
Max.registerShutdownHook(onShutdown);


