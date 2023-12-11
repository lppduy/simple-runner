cc.Class({
  extends: cc.Component,

  properties: {},

  update(dt) {
    if (this.node.position.x <= -(this.node.parent.width + this.node.getContentSize().width)) {
      this.node.parent.getComponent('Game').spawnGround();
      console.log('the ground has been destroyed');
      this.node.destroy();
    }
  },
});
