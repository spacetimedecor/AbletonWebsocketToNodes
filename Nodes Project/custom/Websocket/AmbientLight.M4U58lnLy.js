module.exports = (node, graph) => {
  const { THREE, scene } = graph;

  var light = new THREE.AmbientLight(0xffffff, 1);
  light.castShadow = true;

  scene.add(light);

  const colorIn = node.in("color", [1, 1, 1, 1], { type: "color" });
  const intensityIn = node.in("intensity", 1);

  intensityIn.onChange = (intensity) => {
    light.intensity = intensity;
  };

  colorIn.onChange = (color) => {
    light.color.fromArray(color);
  };

  node.onDestroy = () => {
    scene.remove(light);
  };
};
