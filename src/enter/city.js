import { loadFBX } from "../utils";
import * as THREE from "three";
import { SurroundLine } from "../effect/surroundLine";

export class City {
  constructor(scene) {
    console.log(scene);
    this.scene = scene;

    this.loadCity();
  }
  loadCity() {
    //加载模型，并且渲染到画布上
    loadFBX("/src/model/beijing.fbx").then((object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          new SurroundLine(this.scene, child);
        }
      });
    });
  }
  start() {
    //保留
  }
}
