class DeadEnemy {
    constructor(ctx, gameW, gameH, posX, posY, imgSource, ) {
        this.ctx = ctx

        this.gameWidth = gameW
        this.gameHeight = gameH
        this.width = 80;
        this.height = 100;
        this.posX = posX
        this.posY = posY
        this.life = 100;
        this.image = new Image();
        this.image.src = imgSource;
        this.image.frames = 6; // the number of img of the sprite
        this.image.framesIndex = 0;

        this.speed = 0 // this set the speed of the zombie
        // this.kills = kills
    }

    draw(framesCounter) {
        this.ctx.drawImage( // this draw the enemy
            this.image,
            this.image.framesIndex * Math.round(this.image.width / this.image.frames), // divide the width of the sprite
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter)
        this.move()
    }
    animate(framesCounter) { // this animates the player
        if (framesCounter % 30 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }

    move() {
        this.posX -= this.speed
    }

    life() {
        if (this.life <= 0) return
    }

    setDie(enemy) {

    }

    drawDead() {

    }

    die() {

    }

    kill() {

    }
}