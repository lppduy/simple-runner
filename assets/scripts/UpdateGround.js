cc.Class({
  extends: cc.Component,

  properties: {},

  update(dt) {
    if (this.node.position.x <= -(this.node.parent.width + this.node.getContentSize().width)) {
      this.node.parent.getComponent('Game').spawnGround();
      this.node.destroy();
    }
  },
});
