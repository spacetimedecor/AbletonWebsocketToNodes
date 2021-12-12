module.exports = (node, graph) => {
  let ws;

  node.onReady = () => {
    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log('New client connection opened! Saying hello to server.');
      ws.send('Hello server! Im a new client');
    };
    ws.onmessage = (msg) => {
      console.log('Server message received:', msg.data);
    }
  };

  node.onDestroy = () => {
    console.log('Node destroyed');
    ws.close();
    console.log('Socket closed');
  };
};
