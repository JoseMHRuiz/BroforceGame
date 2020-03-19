/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomIntVel = (min, max) => Math.random() * (max - min + 1) + min;
const randomIntHit = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = array => array.sort(() => Math.random() - 0.5);

const game = {
  canvas: undefined,
  ctx: undefined,
  width: window.innerWidth,
  height: window.innerHeight,
  FPS: 60,
  randomHit: randomIntHit(0, 1),
  framesCounter: 0,
  mousePos: undefined,
  enemysArr: [],
  rect: undefined,
  deadEnemiesArr: [],
  grenadeExplo: [],
  counterEnemies: 0,
  totalDeadths: 0,
  numberOfEnemies: 100,
  targetX: undefined,
  targetY: undefined,
  live: 1000,
  keys: {
    TOP: 38,
    SPACE: 32,
    C: 67
  },
  showMessage: false,
  message: undefined,
  init() {
    this.canvas = document.getElementById("myCanvasGame");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.start();
  },
  restore() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.clear();
    clearInterval(this.interval);
    this.totalDeadths = 0;
    this.enemysArr = [];
    this.live = 1000;
  },
  start() {
    this.reSet(); //Set the images of the bg and the player
    this.setListeners();
    this.interval = setInterval(() => {
      // this is the interval, all the moving parts inside
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }
      this.counterEnemies++;
      this.framesCounter++; // this is the important part for the velocity of the things!!!
      this.clear(); // clear the canvas every time
      this.drawAll();
      this.generateEnemies();
      this.moveAll();
      this.bulletsVsZombies();
      this.grenadesVsZombies();
      this.zombieVsBarrier();
      this.level();
      this.gameOver();
      if (this.showMessage) this.msg.draw(this.message);
      LiveBar.draw(this.live);
      Score.draw(this.totalDeadths);
    }, 1000 / this.FPS);
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  setChuck() {
    this.chuck = new Chuck(this.ctx, this.width, this.height, this.keys);
    this.reSet(this.chuck);
  },
  setTerminator() {
    this.terminator = new Terminator(
      this.ctx,
      this.width,
      this.height,
      this.keys
    );
    this.reSet(this.terminator);
  },
  setRambo() {
    this.rambo = new Rambo(this.ctx, this.width, this.height, this.keys);
    this.reSet(this.rambo);
  },

  reSet(player) {
    LiveBar.init(this.ctx, 200, 45);
    Score.init(this.ctx, 200, 100);
    this.msg = new Message(this.ctx, 400, -50);
    this.backgroud = new Backgroud(
      this.ctx,
      this.width,
      this.height,
      "./img/ground.png"
    );
    this.barrier = new Barrier(this.ctx, this.width * 0.2, this.height * 0.85);
    this.player = player;
    this.zombieHit1 = arrHit[this.randomHit];
    this.zombieDead1 = arrDead[this.randomHit];
    this.explosion = explosion;
    this.unreal = unreal;
    this.erradi = erradi;
    this.blood = blood;
    this.killing = killing;
    this.unstop = unstop;
    this.impre = impre;
    this.good = good;
  },
  drawAll() {
    this.backgroud.draw();
    this.barrier.draw();
    // this.player.draw(this.framesCounter); //IMPORTANT!! set the timming of the sprite player!!
    this.player.draw(this.framesCounter);
    this.enemysArr.forEach(enemy => enemy.draw(this.framesCounter));
    // This call the function of the Enemy array and set the new animation!!! NO SE TE OLVIDE ESTO!!
    this.deadEnemiesArr.forEach(enemy =>
      enemy.drawDead(enemy, this.framesCounter)
    );
    this.grenadeExplo.forEach(granade =>
      granade.drawexplode(granade, this.framesCounter)
    );
  },
  moveAll() {
    // this.player.move()
    this.player.move();
  },
  setDimensions() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },
  setListeners() {
    document.addEventListener("keydown", e => {
      document.onmousemove = e => {
        // this sets the event of the mouse pointer
        this.targetX = e.pageX;
        this.targetY = e.pageY;
      };
      if (e.keyCode === 32) this.player.shootPistol(this.targetX, this.targetY);
      if (e.keyCode === 67)
        this.player.shootGrenades(this.targetX, this.targetY);
    });
  },
  collision(enemy, bullet) {
    return (
      enemy.posX < bullet.posX + bullet.width &&
      enemy.posX + enemy.width > bullet.posX &&
      enemy.posY < bullet.posY + bullet.height &&
      enemy.posY + enemy.height > bullet.posY
    );
  },
  zombieVsBarrier() {
    this.enemysArr.forEach(enemy => {
      if (this.collision(enemy, this.barrier)) this.barrierLive(enemy);
    });
  },
  barrierLive(enemy) {
    enemy.speed = 0;
    this.live -= 1;
  },
  bulletsVsZombies() {
    this.enemysArr.forEach(enemy => {
      if (this.player.bullets.some(bullet => this.collision(enemy, bullet))) {
        this.zombieHit1.play();
        enemy.live -= 30;
        if (enemy.live <= 0) {
          this.zombieDead1.play();
          this.setZombieDead(enemy);
        }
      }
    });
    this.player.bullets.forEach(bullet => {
      // This eliminate the bullet pro the array when the bulle touch the zombie
      if (
        this.enemysArr.some(enemy => {
          return this.collision(bullet, enemy);
        })
      ) {
        this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1);
      }
    });
  },
  grenadesVsZombies() {
    this.enemysArr.forEach(enemy => {
      if (
        this.player.grenades.some(grenade => this.collision(enemy, grenade))
      ) {
        enemy.live -= 110;
        if (enemy.live <= 0) this.setZombieDead(enemy);
      }
    });
    this.player.grenades.forEach(grenade => {
      // This eliminate the bullet pro the array when the bulle touch the zombie
      if (
        this.enemysArr.some(enemy => {
          return this.collision(grenade, enemy);
        })
      ) {
        this.setGranadeExplode(grenade);
      }
    });
  },
  setZombieDead(enemy) {
    this.totalDeadths++;
    setTimeout(
      () => this.enemysArr.splice(this.enemysArr.indexOf(enemy), 1),
      1
    ); //splice the enemy with a setTimeout
    this.deadEnemiesArr.push(enemy); // push enemy in a deadEnemy
    setTimeout(() => {
      // set time out for the animation zombie
      this.deadEnemiesArr.splice(this.deadEnemiesArr.indexOf(enemy), 1);
    }, 1800);
    this.soundsCounter();
  },
  setGranadeExplode(grenade) {
    setTimeout(
      () =>
        this.player.grenades.splice(this.player.grenades.indexOf(grenade), 1),
      1
    ); //splice the enemy with a setTimeout
    this.grenadeExplo.push(grenade); // push enemy in a deadEnemy
    this.explosion.play();
    setTimeout(() => {
      // set time out for the animation zombie
      this.grenadeExplo.splice(this.grenadeExplo.indexOf(grenade), 1);
    }, 1800);
  },
  showMess() {
    this.showMessage = true;
    setTimeout(_ => (this.showMessage = false), 2000);
    setTimeout(_ => (this.msg.y = this.msg.y0), 2001);
    setTimeout(_ => (this.msg.font = this.msg.font0), 2001);
  },
  soundsCounter() {
    switch (this.totalDeadths) {
      case 5:
        this.unreal.play();
        this.message = "Unreal";
        this.showMess();
        break;
      case 10:
        this.erradi.play();
        this.message = "Erradication";
        this.showMess();
        break;
      case 15:
        this.blood.play();
        this.message = "Blood Bath";
        this.showMess();
        break;
      case 20:
        this.killing.play();
        this.message = "Killing Machine";
        this.showMess();
        break;
      case 25:
        this.unstop.play();
        this.message = "Unstoppable";
        this.showMess();
        break;
      case 30:
        this.impre.play();
        this.message = "Impresive";
        this.showMess();
        break;
      case 35:
        this.good.play();
        this.message = "GOOD LIKE";
        this.showMess();
        break;
    }
  },
  generateEnemies() {
    if (this.counterEnemies % this.numberOfEnemies === 0)
      this.enemysArr.push(
        new Enemy(this.ctx, this.width, this.height, "./img/zombiemoving.png")
      );
  },
  level() {
    switch (this.totalDeadths) {
      case 5:
        this.numberOfEnemies = 90;
        break;
      case 10:
        this.numberOfEnemies = 80;
        break;
      case 15:
        this.numberOfEnemies = 70;
        break;
      case 20:
        this.numberOfEnemies = 50;
        break;
      case 25:
        this.numberOfEnemies = 40;
        break;
      case 30:
        this.numberOfEnemies = 20;
        break;
      case 40:
        this.numberOfEnemies = 5;
        break;
    }
  },
  gameOver() {
    if (this.live <= 0) {
      document.getElementById("game-over").style.display = "block";
      document.getElementById("myCanvasGame").style.display = "none";
      main.stop();
    }
  }
};
