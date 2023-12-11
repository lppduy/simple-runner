cc.Class({
  extends: cc.Component,

  properties: {
    ground: cc.Prefab,
    spineBoy: sp.Skeleton,
    enemyPrefab: cc.Prefab,
    gameScore: cc.Label,
    _score: 0,
    _enemySpeed: -300,
  },

  onLoad() {
    let physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.typingCheck, this);
    this.isEnemyAlive = false;
    this.curEnemy = null;
    this.curText = 'Null';
    this.correctCount = 0;
    this.wrongCount = 0;
    this.spawnEnemy();
  },

  spawnGround() {
    let newGround = cc.instantiate(this.ground);
    newGround.getComponent(cc.PhysicsBoxCollider).friction = 0;
    newGround.setPosition(1908, -254);
    this.node.addChild(newGround);
    console.log('the new ground has been added');
  },
  spawnEnemy() {
    const newEnemy = cc.instantiate(this.enemyPrefab);
    this.curText = this.getRandomChar();
    this.curEnemy = newEnemy;
    newEnemy.getChildByName('Text').getComponent(cc.Label).string = this.curText;
    this._enemySpeed -= 10;
    newEnemy.getComponent(cc.RigidBody).linearVelocity.x = this._enemySpeed;
    newEnemy.setPosition(564, -197);
    this.node.addChild(newEnemy);
    this.isEnemyAlive = true;
    newEnemy.getComponent(sp.Skeleton).setCompleteListener((trackEntry, loopCount) => {
      let animationName = trackEntry.animation.name;
      if (animationName === 'Dead') {
        newEnemy.destroy();
        this.onEnemyDestroyed();
      }
    });
    console.log('the new enemy has been added');
  },
  onEnemyDestroyed() {
    this.spawnEnemy();
  },
  typingCheck(e) {
    if (!this.isEnemyAlive) return;
    const curKeyCode = e.keyCode;
    const curKeyChar = String.fromCharCode(curKeyCode);
    if (this.curText === curKeyChar) {
      const shark = this.curEnemy.getComponent(sp.Skeleton);
      this.spineBoy.addAnimation(1, 'aim', false);
      this.isEnemyAlive = false;
      shark.getComponent(cc.RigidBody).enabled = false;
      shark.setAnimation(0, 'Dead', false);
      shark.timeScale = 2;
      this.curEnemy.getChildByName('Text').getComponent(cc.Label).node.color = cc.Color.GREEN;
      this.addScore();
      this.correctCount++;
    } else {
      this.curEnemy.getChildByName('Text').getComponent(cc.Label).node.color = cc.Color.RED;
      this.wrongCount++;
    }
  },
  addScore() {
    this._score += 1;
    this.gameScore.string = `score : ${this._score}`;
  },
  getRandomChar() {
    const keyCode = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    const char = String.fromCharCode(keyCode);
    return char;
  },
});
