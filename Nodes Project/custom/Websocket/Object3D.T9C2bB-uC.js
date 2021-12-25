module.exports = (node, graph) => {
/*
  I take some objects in and provide position, rotation and scale functionality.

  I also create and remove child objects.
*/

  //
  // IMPORTS
  //
  const { scene, THREE } = graph;
  const { Math: { degToRad }, Object3D } = THREE;;

  const triggerIn = node.triggerIn("in");
  const triggerOut = node.triggerOut("out");

  const objectIn1 = node.in("Object In 1", null);
  const objectIn2 = node.in("Object In 2", null);
  const objectIn3 = node.in("Object In 3", null);
  const objectIn4 = node.in("Object In 4", null);
  const objectIn5 = node.in("Object In 5", null);

  const object = new Object3D();

  const transformPositionIn = node.in("position", [0, 0, 0]);
  const transformRotationIn = node.in("rotation", [0, 0, 0]);
  const transformScaleIn = node.in("scale", [1, 1, 1]);

  const objectPorts = [
    objectIn1,
    objectIn2,
    objectIn3,
    objectIn4,
    objectIn5,
  ];

  function upateObjects() {
    const newObjects = objectPorts.map((p) => p.value).filter((v) => !!v);

    for (let i = object.children.length - 1; i >= 0; --i) {
      const child = object.children[i];
      if (!newObjects.includes(child)) {
        object.remove(child);
      }
    }

    for (let i = 0; i < newObjects.length; i++) {
      const newObject = newObjects[i];
      if (!object.children.includes(newObject)) {
        object.add(newObject);
      }
    }
  }

  objectIn1.onChange = upateObjects;
  objectIn2.onChange = upateObjects;
  objectIn3.onChange = upateObjects;
  objectIn4.onChange = upateObjects;
  objectIn5.onChange = upateObjects;

  triggerIn.onTrigger = (props) => {
    const obj = [object];
    props.parentObject.push(obj);

    const newProps = Object.assign({}, props, {
      parentObject: obj,
    });

    triggerOut.trigger(newProps);
  };

  node.onReady = () => {
    scene.add(object);
  }

  node.onDestroy = () => {
    scene.remove(object);
  };

  /**
   * Transforms
   */
  const rotationEuler = new THREE.Euler(0, 0, 0, 'XYZ');
  const rotationQuat = new THREE.Quaternion();

  transformRotationIn.onChange = () => {
    rotationEuler.x = degToRad(transformRotationIn.value[0]);
    rotationEuler.y = degToRad(transformRotationIn.value[1]);
    rotationEuler.z = degToRad(transformRotationIn.value[2]);

    rotationQuat.setFromEuler(rotationEuler);

    object.applyQuaternion(rotationQuat);
  };

  transformPositionIn.onChange = () => {
    object.position.fromArray(transformPositionIn.value);
  };

  transformScaleIn.onChange = () => {
    object.scale.fromArray(transformScaleIn.value);
  };
};
