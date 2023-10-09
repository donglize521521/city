import * as THREE from "three";

export class Rain {
  constructor(scene) {
    this.scene = scene;

    //范围
    this.range = 1000;
    //个数
    this.count = 800;

    this.positionList = [];

    this.init();
  }
  init() {
    this.geometry = new THREE.BufferGeometry();

    this.material = new THREE.PointsMaterial({
      size: 10,
      map: new THREE.TextureLoader().load("../../src/assets/rain.png"),
      transparent: true,
      opacity: 0.4,
      depthTest: false,
    });

    for (let i = 0; i < this.count; i++) {
      const position = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2
      );
      position.speedY += 20;
      this.positionList.push(position);
    }

    this.geometry.setFromPoints(this.positionList);

    this.points = new THREE.Points(this.geometry, this.material);

    this.scene.add(this.points);
  }

  animation() {
    this.positionList.forEach((position) => {
      position.y -= 20;

      if (position.y < 0) {
        position.y = this.range / 2;
      }
    });
    this.points.geometry.setFromPoints(this.positionList);
  }
}
