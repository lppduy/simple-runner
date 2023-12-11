cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    cc.director.preloadScene('gameScene');
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.changeScene, this);
    this.node.on('touchstart', this.mouseOrTouchChangeScene, this);
  },
  mouseOrTouchChangeScene() {
    cc.director.loadScene('gameScene');
  },
  changeScene(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.enter:
        cc.director.loadScene('gameScene');
        break;
    }
  },
});
