module.exports = (node, graph) => {
  const { scene, THREE } = graph;
  const ratioIn = node.triggerOut("ratio");
  const geometryIn = node.triggerIn("geometry");
  const materialIn = node.triggerIn("material");
  const meshOut = node.out("mesh", null);

  const defaultGeometry = new THREE.BoxGeometry();
  const defaultMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
  });

  const mesh = new THREE.Mesh(defaultGeometry, defaultMaterial);
  meshOut.value = mesh;

  geometryIn.onTrigger = (geometry) => {
    mesh.geometry = geometry || defaultGeometry;
  };

  materialIn.onTrigger = (material) => {
    mesh.material = material || defaultMaterial;
  };

  node.onDestroy = () => {
    defaultGeometry.dispose();
    defaultMaterial.dispose();
  };
};
