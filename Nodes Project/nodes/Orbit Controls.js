module.exports = (node, graph) => {
  var OrbitControls = require("three-orbit-controls")(graph.THREE);

  controls = new OrbitControls(graph.camera, graph.sceneContainer);

  node.onDestroy = () => {
    controls.dispose();
  };
};
