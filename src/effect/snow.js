import * as THREE from "three";

export class Snow {
  constructor(scene) {
    this.scene = scene;

    //雪花范围
    this.range = 1000;
    //雪花个数
    this.count = 600;
    //
    this.pointList = [];

    //初始化
    this.init();
  }

  init() {
    //粒子和粒子系统
    //PointCloud(12.5版本之前)   Points(12.5版本之后)
    //材质
    this.material = new THREE.PointsMaterial({
      size: 30, //雪花大小
      map: new THREE.TextureLoader().load("../../src/assets/snow.png"),
      transparent: true,
      opacity: 0.8,
      depthTest: false, //主要是为了消除Loader的黑色背景
    });
    //几何对象(空的)
    this.geometry = new THREE.BufferGeometry();

    for (let i = 0; i < this.count; i++) {
      const position = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2
      );

      position.speedX = Math.random() - 0.5;
      position.speedY = Math.random() + 4;
      position.speedZ = Math.random() - 0.5;

      this.pointList.push(position);
    }
    console.log(this.pointList);

    this.geometry.setFromPoints(this.pointList);

    this.point = new THREE.Points(this.geometry, this.material);

    this.scene.add(this.point);
    console.log(this.scene);
  }

  animation() {
    // this.scene.remove(this.point);
    this.pointList.forEach((position) => {
      position.x -= position.speedX;
      position.y -= position.speedY;
      position.z -= position.speedZ;

      //边界检查实现持续下雪
      if (position.y < 0) {
        position.y = this.range / 2;
      }

      //性能差
      //   this.geometry.setFromPoints(this.pointList);
      //   this.point = new THREE.Points(this.geometry, this.material);
      //   this.scene.add(this.point);
      //性能好
      this.point.geometry.setFromPoints(this.pointList);
    });
  }
}
