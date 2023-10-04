import { loadFBX } from "../utils";
import * as THREE from "three";
import { SurroundLine } from "../effect/surroundLine";
import { Background } from "../effect/background";

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
      this.initEffect();
    });
  }

  initEffect() {
    new Background(this.scene);
  }

  start() {
    //保留
  }
}
