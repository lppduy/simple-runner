cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  start() {},

  update(dt) {
    if (this.node.position.x <= -(this.node.parent.width + this.node.getContentSize().width)) {
      this.node.parent.getComponent('Game').spawnCactus();
      console.log('the cactus has been destroyed');
      this.node.destroy();
    }
  },
});
