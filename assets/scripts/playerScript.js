cc.Class({
  extends: cc.Component,

  properties: {
    _canJump: true,
  },

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.makePlayerJump, this);
    this.node.on('touchstart', this.addForce, this);
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

  makePlayerJump(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.space:
        this.addForce();
        break;
    }
  },

  addForce() {
    if (this._canJump) {
      this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 75000), true);
      this._canJump = false;
    }
  },
});
