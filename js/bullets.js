class Bullets {
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
    this.width = 14;
    this.height = 14;
    this.targetX = tarX; // Tarjer X&Y gets the number in the player
    this.targetY = tarY;

    this.speed = 10; // Defines the speed for the trayectory

    this.vecX = undefined; // defines the vector X & Y
    this.vecY = undefined;
    this.image = new Image();
    this.image.src = "./img/bullet.png";
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
    this.preVelX = this.vecX; // this defines the previus point for eliminate the bullet later
    this.preVelY = this.vecY;
    this.posX += this.velX; // now we apply the velocity yo the position, and we have the movement!!
    this.posY += this.velY;
  }
}
