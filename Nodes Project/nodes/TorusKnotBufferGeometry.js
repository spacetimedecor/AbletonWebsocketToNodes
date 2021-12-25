module.exports = (node, graph) => {
  const radiusIn = node.in("radiusIn", 1, { min: 0, max: 10 });
  const tubeIn = node.in("scale", 0.3, { min: 0.1, max: 3 });
  const geometryOut = node.out("geometry");
  const { THREE } = graph;

  let geometry = null;

  function update() {
    geometry = new THREE.TorusKnotBufferGeometry(
      radiusIn.value,
      tubeIn.value,
      50,
      20
    );
    geometryOut.setValue(geometry);
  }

  radiusIn.onChange = update;
  tubeIn.onChange = update;

  node.onDestroy = () => {
    if (geometry) {
      geometry.dispose();
      geometry = null;
    }
  };
};
