class Bullets {
    constructor(ctx, playerPosX, playerPosY, tarX, tarY, playerWidth, playerHeight) {
        this.ctx = ctx;
        this.posX = playerPosX + playerWidth;
        this.posY = playerPosY + playerHeight / 2;
        this.width = 14;
        this.height = 14;
        this.targetX = tarX
        this.targetY = tarY

        this.radius = 2;

        this.speed = 5

        this.vecX = undefined;
        this.vecY = undefined;
        this.image = new Image();
        this.image.src = './img/Bullet.png';
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

        //     this.ctx.beginPath();
        //     this.ctx.fillStyle = "whitesmoke";
        //     this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        //     this.ctx.fill();
        //     this.ctx.closePath();
    }

    move() {
        this.vecX = this.targetX - this.posX
        this.vecY = this.targetY - this.posY
        let distance = Math.sqrt(this.vecX * this.vecX + this.vecY * this.vecY)
        let moves = distance / this.speed
        this.velX = (this.vecX) / moves;
        this.velY = (this.vecY) / moves;
        this.preVelX = this.vecX
        this.preVelY = this.vecY
        this.posX += this.velX
        this.posY += this.velY
    }

}