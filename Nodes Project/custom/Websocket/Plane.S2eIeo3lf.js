module.exports = (node, graph) => {
  const ratioIn = node.triggerIn("ratio");
  const triggerIn = node.triggerIn("in");
  const geometryOut = node.triggerOut("geometry");
  const { THREE } = graph;

  let geometry = null;
  geometry = new THREE.PlaneBufferGeometry( 100, 100 );
  geometryOut.trigger(geometry);

  triggerIn.onTrigger = () => {
    geometryOut.trigger(geometry);
  }

  ratioIn.onTrigger = (ratio) => {
    if (!geometry) return;
    geometry = new THREE.PlaneBufferGeometry( (ratio) * 100, 100 );
    geometryOut.trigger(geometry);
  }

  node.onDestroy = () => {
    if (geometry) {
      geometry.dispose();
      geometry = null;
    }
  };
};