import * as THREE from "three";

export class Points {
  constructor(
    scene,
    { range, count, url, size, opacity, setPosition, setAnimation }
  ) {
    this.scene = scene;

    this.range = range;
    //个数
    this.count = count;

    this.url = url;

    this.size = size;

    this.opacity = opacity;

    this.setPosition = setPosition;

    this.setAnimation = setAnimation;

    // //范围
    // this.range = 1000;
    // //个数
    // this.count = 800;

    this.positionList = [];

    this.init();
  }
  init() {
    this.geometry = new THREE.BufferGeometry();

    this.material = new THREE.PointsMaterial({
      size: this.size,
      map: new THREE.TextureLoader().load(this.url),
      transparent: true,
      opacity: this.opacity,
      depthTest: false,
    });

    for (let i = 0; i < this.count; i++) {
      const position = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2
      );
      this.setPosition(position);
      this.positionList.push(position);
    }

    this.geometry.setFromPoints(this.positionList);

    this.points = new THREE.Points(this.geometry, this.material);

    this.scene.add(this.points);
  }

  animation() {
    this.positionList.forEach((position) => {
      this.setAnimation(position);
    });
    this.points.geometry.setFromPoints(this.positionList);
  }
}
