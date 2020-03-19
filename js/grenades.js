class Grenades {
  constructor(
    ctx,
    playerPosX,
    playerPosY,
    tarX,
    tarY,
    playerWidth,
    playerHeight
  ) {
    this.ctx = ctx;
    this.posX = playerPosX + playerWidth;
    this.posY = playerPosY + playerHeight / 2;
    this.width = 24;
    this.height = 24;
    this.targetX = tarX; // Tarjer X&Y gets the number in the player
    this.targetY = tarY;
    this.speed = 3; // Defines the speed for the trayectory
    this.gravity = 2.25;
    this.posY0 = this.posX;
    this.vecX = undefined; // defines the vector X & Y
    this.vecY = undefined;

    this.image = new Image();
    this.image.src = "image/grenade.png";
    this.image.frames = 12; // the number of img of the sprite
    this.image.framesIndex = 0;

    this.imageExp = new Image();
    this.imageExp.src = "image/explosion.png";
    this.imageExp.frames = 12; // the number of img of the sprite
    this.imageExp.framesIndex = 0;

    this.grenades = [];
    this.grenadeExplo = [];
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    //     this.ctx.beginPath();
    //     this.ctx.fillStyle = "whitesmoke";
    //     this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    //     this.ctx.fill();
    //     this.ctx.closePath();
  }

  move() {
    this.vecX = this.targetX - this.posX; //This is the position of the target minus the position of the origin
    this.vecY = this.targetY - this.posY;
    let distance = Math.sqrt(this.vecX * this.vecX + this.vecY * this.vecY); //this return the SquareRoot of the ** of the vectors, distance
    let moves = distance / this.speed; // now we have the distance / with the speed
    this.velX = this.vecX / moves; // here we define the velocity
    this.velY = this.vecY / moves;
    this.posY += this.velY;
    this.velY -= this.gravity;

    this.preVelX = this.vecX; // this defines the previus point for eliminate the bullet later
    this.preVelY = this.vecY;
    this.posX += this.velX; // now we apply the velocity yo the position, and we have the movement!!
    this.posY += this.velY;

    // this.bullets.forEach(bullet => bullet.move());
  }
  setExplode() {}
  drawexplode(granade, framesCounter) {
    this.ctx.drawImage(
      // this draw the enemy
      this.imageExp,
      this.imageExp.framesIndex *
        Math.round(this.imageExp.width / this.imageExp.frames), // divide the width of the sprite
      0,
      Math.floor(this.imageExp.width / this.imageExp.frames),
      this.imageExp.height,
      this.posX - 100,
      this.posY - 200,
      300,
      300
    );
    if (this.framesCounter % 12 === 0) this.framesCounter = 0;
    this.animateExp(framesCounter);
  }
  animate(framesCounter) {
    // this animates the player
    if (framesCounter % 10 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex > this.image.frames - 1) {
      this.image.framesIndex = 0;
    }
  }
  animateExp(framesCounter) {
    // this animates the player
    if (framesCounter % 12 == 0) {
      this.imageExp.framesIndex++;
    }
    if (this.imageExp.framesIndex > this.imageExp.frames - 1) {
      this.imageExp.framesIndex = 0;
    }
  }
}
