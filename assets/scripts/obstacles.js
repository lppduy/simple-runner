cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  start() {},

  update(dt) {
    if (this.node.position.x <= -this.node.parent.width) {
      this.node.parent.getComponent('Game').spawnEnemy();
      this.node.parent.getComponent('Game').addScore();
      console.log('the cactus has been destroyed');
      this.node.destroy();
    }
  },
});
