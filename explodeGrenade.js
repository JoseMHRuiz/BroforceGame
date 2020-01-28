class explodeGrenade {
    constructor(ctx, gameW, gameH, posX, posY, imgSource, ) {
        this.ctx = ctx

        this.gameWidth = gameW
        this.gameHeight = gameH
        this.width = 100;
        this.height = 100;
        this.posX = posX
        this.posY = posY
        this.life = 100;
        this.image = new Image();
        this.image.src = imgSource;
        this.image.frames = 12; // the number of img of the sprite
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
        // this.move()
    }
    drawexplode(grenade, framesCounter) {
        this.draw(framesCounter)
          grenade.draw(framesCounter)
          grenade.image.frames = 12
          grenade.image.src = './img/explosion-4.png'
          grenade.speed = 0
          grenade.width = 110
          grenade.height = 130
          if (this.framesCounter % 70 === 0) this.framesCounter = 0
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
    }

}