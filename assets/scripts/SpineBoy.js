cc.Class({
  extends: cc.Component,

  properties: {
    spineBoy: sp.Skeleton,
  },

  onLoad() {
    this.spineBoy.setAnimation(0, 'run', true);
    this.spineBoy.setCompleteListener((trackEntry, loopCount) => {
      if (trackEntry.animation.name === 'shoot') {
        this.spineBoy.timeScale = 1;
        this.spineBoy.addAnimation(1, 'run', true);
      }
      if (trackEntry.animation.name === 'death') {
        this.spineBoy.clearTracks();
      }
    });
  },
  onCollisionEnter(other, self) {
    if (other.tag === 2) {
      this.spineBoy.setAnimation(1, 'death', false);
    }
  },
});
