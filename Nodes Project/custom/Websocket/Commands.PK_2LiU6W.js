module.exports = (node, graph) => {
  node.onReady = () => {
    const { scene } = graph;

    node.in(
      "Log Scene", 
      () => console.log(graph.scene), 
      { connectable: false }
    );
    node.in(
      "Log Graph", 
      () => console.log(graph), 
      { connectable: false }
    );
    node.in(
      "Delete All Objects",
      () => {
        for( var i = scene.children.length - 1; i >= 0; i--) { 
          obj = scene.children[i];
          scene.remove(obj); 
        }
      }, 
      { connectable: false }
    )
  };
  node.onDestroy = () => {
  };
};