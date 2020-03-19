class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 100;
    this.height = 140;

    this.posX = 250;
    this.posY = this.gameHeight / 2; // this puts the player in the middle of the playground

    this.targetX = undefined; //define the target, so we can take the distance position
    this.targetY = undefined;

    this.bulletX = undefined; // the postion of the bullet
    this.bulletY = undefined;

    this.keys = keys;

    this.image = new Image();
    this.image.src = undefined;
    this.image.frame = undefined; // the number of img of the sprite
    this.image.framesIndex = 0;

    this.velY = 1;
    this.velX = 1;
    this.speed = 1;

    this.bullets = [];
    this.grenades = [];
    this.grenadeExplo = [];
    // this.setListeners()

    this.shoot = shoot;
    this.throw = throw2;
  }

  draw(framesCounter) {
    //this function with the variable inside, set the timming of the sprite IMPORTANT!
    this.ctx.drawImage(
      // this draw the player
      this.image,
      this.image.framesIndex * Math.round(this.image.width / this.image.frame), // divide the width of the sprite
      0,
      Math.floor(this.image.width / this.image.frame),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.animate(framesCounter);
    this.bullets.forEach(bullet => bullet.draw());
    this.clearBullets();
    this.grenades.forEach(grenade => grenade.draw());
    this.clearGrenades();
  }
  move() {
    this.bullets.forEach(bullet => bullet.move());
    this.grenades.forEach(grenade => grenade.move());
  }
  animate(framesCounter) {
    // this animates the player
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex > this.image.frame - 1) {
      this.image.framesIndex = 0;
    }
  }
  shootPistol(targetX, targetY) {
    // this set push the bullets with the coordenates already inside, correcting some posY&X for the bullet
    this.bullets.push(
      new Bullets(
        this.ctx,
        this.posX - 50,
        this.posY - 50,
        targetX,
        targetY,
        this.width,
        this.height
      )
    );
    this.shoot.play();
  }
  shootGrenades(targetX, targetY) {
    this.grenades.push(
      new Grenades(
        this.ctx,
        this.posX - 50,
        this.posY - 50,
        targetX,
        targetY,
        this.width,
        this.height
      )
    );
    this.throw.play();
  }
  clearBullets() {
    // this set if the posX < of the target then crear out, always si a little more
    this.bullets = this.bullets.filter(bullet => bullet.posX <= bullet.targetX);
  }
  clearGrenades() {
    // this set if the posX < of the target then crear out, always si a little more
    this.grenades = this.grenades.filter(
      grenade => grenade.posX <= grenade.targetX
    );
  }
}

class Rambo extends Player {
  constructor(ctx, gameW, gameH, keys) {
    super(ctx, gameW, gameH, keys);
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "image/rambohq.png";
    this.image.frame = 11; // the number of img of the sprite
    this.image.framesIndex = 0;
  }
}

class Chuck extends Player {
  constructor(ctx, gameW, gameH, keys) {
    super(ctx, gameW, gameH, keys);
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "image/chuckpatada.png";
    this.image.frame = 8; // the number of img of the sprite
    this.image.framesIndex = 0;
  }
}

class Terminator extends Player {
  constructor(ctx, gameW, gameH, keys) {
    super(ctx, gameW, gameH, keys);
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "image/terminatorsmash.png";
    this.image.frame = 8; // the number of img of the sprite
    this.image.framesIndex = 0;
  }
}
