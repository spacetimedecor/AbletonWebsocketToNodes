module.exports = (node, graph) => {
  const debug = true;
  let ws;

  node.onReady = () => {
    ws = new WebSocket("ws://localhost:8888");
    ws.onopen = () => {
      debug && console.log('New client connection opened! Saying hello to server.');
      ws.send(JSON.stringify({ 
        type: 'message', 
        args: 'Hello server! Im new client', 
        meta: {}
      }));
    };
    ws.onmessage = async (msg) => {
      const { type, args, meta } = JSON.parse(msg.data); 
      debug && console.log(`Server ${type} received:`, args, meta); 
    }
  };

  node.onDestroy = () => {
    debug && console.log('Node destroyed');  
    ws.close();
    debug && console.log('Socket closed');    
  };
};