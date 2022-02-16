import MapboxGL, {LngLatLike, MercatorCoordinate} from 'mapbox-gl';
import React, {useEffect, useState} from 'react';
import {withMap} from 'react-mapbox-gl/lib-esm/context';

// import {FeatureCollection} from 'geojson';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

function getSpriteMatrix(sprite, center) {
  const {model, position, altitude} = sprite;
  const {scale, rotate} = model;
  const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), rotate[0]);
  const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), rotate[1]);
  const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), rotate[2]);

  const coord = MercatorCoordinate.fromLngLat(position, altitude);
  return new THREE.Matrix4()
    .makeTranslation(coord.x - center.x, coord.y - center.y, coord.z - center.z)
    .scale(new THREE.Vector3(scale, -scale, scale))
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);
}

class SpriteCustomLayer implements mapboxgl.CustomLayerInterface {
  type = 'custom' as const;
  renderingMode = '3d' as const;

  id: string;
  options: SpritePaint;
  camera: THREE.Camera;
  scene: THREE.Scene;
  map: MapboxGL.Map;
  renderer: THREE.WebGLRenderer;
  center: MapboxGL.MercatorCoordinate;
  cameraTransform: THREE.Matrix4;
  model: Promise<THREE.Scene>;
  modelConfig: Model;
  features: FeatureCollection | null;

  constructor(id: string, options: SpritePaint) {
    this.id = id;
    this.options = options;
    this.modelConfig = {
      path: options.gltfPath,
      scale: options.scale || 1,
      rotate: [
        options.rotateDeg ? options.rotateDeg.x || 0 : 0,
        options.rotateDeg ? options.rotateDeg.y || 0 : 0,
        options.rotateDeg ? options.rotateDeg.z || 0 : 0,
      ].map(deg => (Math.PI / 180) * deg),
    };
    this.model = new Promise<THREE.Scene>((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        options.gltfPath,
        gltf => {
          resolve(gltf.scene);
        },
        () => {
          // progress is being made; bytes loaded = xhr.loaded / xhr.total
        },
        e => {
          const xhr = e.target;
          const message = `Unable to load ${options.gltfPath}: ${xhr.status} ${xhr.statusText}`;
          console.error(message); // tslint:disable-line
          reject(message);
        },
      );
    });
    this.features = null;
  }
}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
