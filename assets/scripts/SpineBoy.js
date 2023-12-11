cc.Class({
  extends: cc.Component,

  properties: {
    _canJump: true,
    spineBoy: sp.Skeleton,
  },

  onLoad() {
    this.node.on('touchstart', this.addForce, this);
    this.spineBoy.setAnimation(0, 'hoverboard', true);
    cc.director.preloadScene('menuScene');
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    this._canJump = true;
    console.log(otherCollider.name);
    if (
      otherCollider.name === 'Bush<PhysicsPolygonCollider>' ||
      otherCollider.name === 'Cactus2<PhysicsPolygonCollider>' ||
      otherCollider.name === 'Cactus<PhysicsPolygonCollider>'
    ) {
      cc.director.loadScene('menuScene');
    }
  },

  addForce() {
    if (this._canJump) {
      this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 420), true);
      this._canJump = false;
    }
  },
});
