AFRAME.registerComponent('beat-shadows', {
  init: function () {
    this.active = [];
    this.geometry = null;
    this.originalVertices = null;
    this.pool = [];
  },

  play: function () {
    setTimeout(() => {
      this.originalVertices =
        this.el.children[0].getObject3D('mesh').geometry.attributes.position.array.slice();
      const material = this.el.children[0].getObject3D('mesh').material;
      this.el.setAttribute('buffer-geometry-merger', '');
      this.geometry = this.el.getObject3D('mesh').geometry;
      this.el.getObject3D('mesh').material = material;

      // 4 vertices, 3 numbers each.
      for (let i = 0; i < this.el.children.length; i++) { this.pool.push(i * 4 * 3); }
    });
  },

  requestShadow: function (position) {
    const index = this.pool[this.pool.length - 1];
    this.active.push(index);
    this.pool.length = this.pool.length - 1;

    let j = 0;
    for (let i = index; i < index + (4 * 3); i += 3) {
      this.geometry.attributes.position.array[i] = this.originalVertices[j] * position.x;
      // Swap Y and Z since need to rotate plane.
      this.geometry.attributes.position.array[i + 1] = this.originalVertices[j + 2] * position.y;
      this.geometry.attributes.position.array[i + 2] = this.originalVertices[j + 1] * position.z;
      console.log(
        this.geometry.attributes.position.array[i],
        this.geometry.attributes.position.array[i + 1],
        this.geometry.attributes.position.array[i + 2]);
      j += 3;
    }
  },

  returnShadow: function (uuid) {
  }
});
