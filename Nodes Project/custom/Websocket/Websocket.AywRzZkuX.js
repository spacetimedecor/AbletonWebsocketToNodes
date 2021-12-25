module.exports = (node, graph) => {
  // Nodes
  const triggerOut = node.triggerOut("trigger");

  // Defaults
  const defaultListeners = {
    default: ({ type, args, meta }) => {
      debug && console.log(`Server ${type} received:`, args, meta);
    },
    test: ({ type, args, meta }) => {
      if (type === 'note' && args[1] === 100) {
        triggerOut.trigger({});
      }
    }
  };

  // Global settings:
  graph.webSocket = null;
  graph.debug = true;
  graph.wbListeners = defaultListeners;

  // Global imports
  let { debug, wbListeners, webSocket } = graph;

  debug && console.log(graph);

  // // On node ready:
  node.onReady = () => {

    // Create websocket
    if (!webSocket) {
      webSocket = new WebSocket("ws://localhost:1234");
      graph.webSocket = webSocket;

          // On node connected to:
      webSocket.onopen = () => {
        debug && console.log('New client connection opened! Saying hello to server.');

        // Say hello to server:
        webSocket.send(JSON.stringify({
          type: 'message',
          args: 'Hello server! Im new client',
          meta: {}
        }));
      };

      // On node connected to:
      webSocket.onmessage = (msg) => {
        const decodedMessage = JSON.parse(msg.data);

        Object.values(wbListeners)
          .forEach(listener => listener(decodedMessage))
      }
    };
  }

  // On node destroy:
  node.onDestroy = () => {
    debug && console.log('Node destroyed');
    webSocket.close();
    debug && console.log('Socket closed');
  };
};
