cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    cc.director.preloadScene('mainScene');
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.changeScene, this);
    this.node.on('touchstart', this.mouseOrTouchChangeScene, this);
  },
  mouseOrTouchChangeScene() {
    cc.director.loadScene('mainScene');
  },
  changeScene(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.enter:
        cc.director.loadScene('mainScene');
        break;
    }
  },
});
