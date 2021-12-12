module.exports = (node, graph) => {
  let ws;

  node.onReady = () => {
    ws = new WebSocket("ws://localhost:8888");
    ws.onopen = () => {
      console.log('New client connection opened! Saying hello to server.');
      ws.send('Hello server! Im new client');
    };
    ws.onmessage = async (msg) => {
      const { type, args } = JSON.parse(msg.data); 
      console.log(`Server ${type} received:`, args); 
    }
  };

  node.onDestroy = () => {
    console.log('Node destroyed');  
    ws.close();
    console.log('Socket closed');    
  };
};