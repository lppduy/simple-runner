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
