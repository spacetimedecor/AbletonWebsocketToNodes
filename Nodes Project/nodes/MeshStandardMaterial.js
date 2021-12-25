module.exports = (node, graph) => {
  const { THREE } = graph;
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });

  const colorIn = node.in("color", [1, 1, 1, 1], { type: "color" });
  const metalnessIn = node.in("metalness", 0, { min: 0, max: 1 });
  const roughnessIn = node.in("roughness", 1, { min: 0, max: 1 });

  const mapIn = node.in("map", null);
  const normalMapIn = node.in("normalMap", null);
  const roughnessMapIn = node.in("roughnesslMap", null);

  const materialOut = node.out("material", material);

  colorIn.onChange = (color) => {
    material.color.fromArray(color).convertGammaToLinear();
    material.needsUpdate = true;
  };

  metalnessIn.onChange = (metalness) => {
    material.metalness = metalness;
    material.needsUpdate = true;
  };

  roughnessIn.onChange = (roughness) => {
    material.roughness = roughness;
    material.needsUpdate = true;
  };

  mapIn.onChange = (map) => {
    material.map = map;
    material.needsUpdate = true;
  };

  normalMapIn.onChange = (normalMap) => {
    material.normalMap = normalMap;
    material.needsUpdate = true;
  };

  roughnessMapIn.onChange = (roughnessMap) => {
    material.roughnessMap = roughnessMap;
    material.needsUpdate = true;
  };

  node.onDestroy = () => {
    material.dispose();
  };
};
