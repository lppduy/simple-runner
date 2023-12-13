cc.Class({
  extends: cc.Component,

  properties: {
    ground: cc.Prefab,
    spineBoy: sp.Skeleton,
    enemyPrefab: cc.Prefab,
    gameScore: cc.Label,
    resultBoard: cc.Node,
    restartBtn: cc.Button,
    _score: 0,
    _enemySpeed: -300,
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.typingCheck, this);
    this.restartBtn.node.on('mousedown', this.handleRestart, this);

    this.isPlaying = true;
    this.isEnemyAlive = false;
    this.curEnemy = null;
    this.curText = 'Null';
    this.correctCount = 0;
    this.wrongCount = 0;
    this.spawnEnemy();
  },
  handleRestart() {
    cc.director.loadScene('menuScene');
  },
  spawnGround() {
    let newGround = cc.instantiate(this.ground);
    newGround.getComponent(cc.PhysicsBoxCollider).friction = 0;
    newGround.setPosition(1908, -254);
    this.node.addChild(newGround);
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
      if (trackEntry.animation.name === 'Dead') {
        newEnemy.destroy();
        this.onEnemyDestroyed();
      }
    });
  },
  onEnemyDestroyed() {
    this.spawnEnemy();
  },
  typingCheck(e) {
    if (!this.isEnemyAlive || !this.isPlaying) return;
    const curKeyCode = e.keyCode;
    const curKeyChar = String.fromCharCode(curKeyCode);
    if (this.curText === curKeyChar) {
      const shark = this.curEnemy.getComponent(sp.Skeleton);
      this.spineBoy.timeScale = 2;
      this.spineBoy.setAnimation(0, 'idle', false);
      this.spineBoy.setAnimation(1, 'shoot', false);
      this.isEnemyAlive = false;
      shark.getComponent(cc.BoxCollider).enabled = false;
      shark.timeScale = 2;
      shark.setAnimation(0, 'Dead', false);
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
  checkEndGame() {
    if (this.curEnemy.x <= -555) {
      return true;
    } else return false;
  },
  onEndGame() {
    this.isPlaying = false;
    this.wrongCount++;
    const content = this.resultBoard.getChildByName('Content');
    const acc = Math.floor((this.correctCount / (this.correctCount + this.wrongCount)) * 100) || 0;
    content
      .getChildByName('Correct Words')
      .getComponent(cc.Label).string = `Correct words: ${this.correctCount}`;
    content
      .getChildByName('Wrong Words')
      .getComponent(cc.Label).string = `Wrong words: ${this.wrongCount}`;
    content.getChildByName('Accuracy').getComponent(cc.Label).string = `Accuracy: ${acc}%`;
    this.resultBoard
      .getChildByName('Score')
      .getComponent(cc.Label).string = `Scores: ${this._score}`;
    this.resultBoard.active = true;
    cc.director.getPhysicsManager().enabled = false;
  },
  update(dt) {
    if (this.isPlaying && this.checkEndGame()) {
      this.onEndGame();
    }
  },
});
