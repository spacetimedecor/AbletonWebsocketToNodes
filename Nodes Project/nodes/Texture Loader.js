module.exports = (node, graph) => {
  const { THREE } = graph;
  const encodings = {
    Linear: THREE.LinearEncoding,
    sRGB: THREE.sRGBEncoding,
  };

  const urlIn = node.in("url", "", { type: "asset", thumbnails: true });
  const encodingIn = node.in("encoding", "sRGB", {
    type: "dropdown",
    values: Object.keys(encodings),
  });
  const textureOut = node.out("texture", null);

  let textureLoader = new THREE.TextureLoader();

  let texture = null;

  urlIn.onChange = (url) => {
    if (!url) return;
    node.comment = url;
    textureLoader.load(url, (map) => {
      texture = map;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 4;
      texture.encoding = encodings[encodingIn.value];
      map.anisotropy = 4;
      textureOut.setValue(texture);
    });
  };

  encodingIn.onChange = (encoding) => {
    if (texture) {
      texture.encoding = encodings[encoding];
      textureOut.setValue(texture);
    }
  };

  node.onDestroy = () => {
    if (texture) {
      texture.dispose();
      texture = null;
    }
  };
};
