module.exports = (node, graph) => {
  node.onReady = () => {
    const OrbitControls = require("three-orbit-controls")(graph.THREE);

    graph.controls = new OrbitControls(graph.camera, graph.sceneContainer);
  }

  node.onDestroy = () => {
    graph.controls.dispose();
  };
};
