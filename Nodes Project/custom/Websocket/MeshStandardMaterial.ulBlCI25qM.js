module.exports = (node, graph) => {
  const { THREE } = graph;

  const material = new THREE.MeshStandardMaterial({
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide
  });

  const colorIn = node.in("color", [1, 1, 1, 1], { type: "color" });
  const metalnessIn = node.in("metalness", 0, { min: 0, max: 1 });
  const roughnessIn = node.in("roughness", 1, { min: 0, max: 1 });

  const mapIn = node.triggerIn("map");
  const normalMapIn = node.triggerIn("normalMap", null);
  const roughnessMapIn = node.triggerIn("roughnesslMap", null);

  const materialOut = node.triggerOut("material");

  colorIn.onChange = (color) => {
    material.color.fromArray(color).convertGammaToLinear();
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  metalnessIn.onChange = (metalness) => {
    material.metalness = metalness;
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  roughnessIn.onChange = (roughness) => {
    material.roughness = roughness;
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  mapIn.onTrigger = (texture) => {
    material.map = texture;
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  normalMapIn.onTrigger = (normalMap) => {
    material.normalMap = normalMap;
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  roughnessMapIn.onTrigger = (roughnessMap) => {
    material.roughnessMap = roughnessMap;
    material.needsUpdate = true;
    materialOut.trigger(material);
  };

  node.onDestroy = () => {
    material.dispose();
  };
};
