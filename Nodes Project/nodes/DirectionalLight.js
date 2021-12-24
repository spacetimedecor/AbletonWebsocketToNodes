module.exports = (node, graph) => {
  const { THREE, scene } = graph;

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.castShadow = true;

  var helper = new THREE.DirectionalLightHelper(light, 5);
  scene.add(light);
  scene.add(light.target);
  scene.add(helper);

  const positionIn = node.in("position", [0, 5, 0]);
  const targetIn = node.in("target", [0, 0, 0]);
  const colorIn = node.in("color", [1, 1, 1, 1], { type: "color" });
  const intensityIn = node.in("intensity", 1);

  positionIn.onChange = (position) => {
    light.position.fromArray(position);
    light.target.position.fromArray(targetIn.value);
    helper.update();
  };

  targetIn.onChange = (target) => {
    light.target.position.fromArray(target);
    helper.update();
  };

  intensityIn.onChange = (intensity) => {
    light.intensity = intensity;
  };

  colorIn.onChange = (color) => {
    light.color.fromArray(color);
  };

  node.onReady = () => {
    light.position.fromArray(positionIn.value);
    light.target.position.fromArray(targetIn.value);
    helper.update();
  };

  node.onDestroy = () => {
    scene.remove(light);
    scene.remove(light.target);
    scene.remove(helper);
  };
};
