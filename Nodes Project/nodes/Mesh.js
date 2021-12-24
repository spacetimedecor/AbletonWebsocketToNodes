module.exports = (node, graph) => {
  const { scene, THREE } = graph;
  const geometryIn = node.in("geometry", null);
  const materialIn = node.in("material", null);
  const positionIn = node.in("position", [0, 0, 0]);
  const rotationIn = node.in("rotation", [0, 0, 0]);
  const scaleIn = node.in("scale", [1, 1, 1]);

  const defaultMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
  });

  var defaultGeometry = new THREE.BoxGeometry();
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0xffFFFF,
  //   emissive: 0x000000,
  // });

  var mesh = new THREE.Mesh(defaultGeometry, defaultMaterial);

  geometryIn.onChange = (geometry) => {
    mesh.geometry = geometry || defaultGeometry;
  };

  materialIn.onChange = (material) => {
    mesh.material = material || defaultMaterial;
  };

  // textureIn.onChange = (texture) => {a
  //   material.map = texture
  //   material.needsUpdate = true
  // }

  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  positionIn.onChange = (position) => {
    mesh.position.fromArray(position);
  };

  rotationIn.onChange = (rotation) => {
    mesh.rotation.fromArray(rotation.map(THREE.MathUtils.degToRad));
  };

  scaleIn.onChange = (scale) => {
    mesh.scale.fromArray(scale);
  };

  node.onDestroy = () => {
    scene.remove(mesh);
    defaultMaterial.dispose();
  };
};
