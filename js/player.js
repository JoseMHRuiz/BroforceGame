class Player {
    constructor(ctx, gameW, gameH, keys, imgSource, frame) {
        this.ctx = ctx;

        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 100;
        this.height = 140;

        this.posX = 190;
        this.posY = this.gameHeight / 2; // this puts the player in the middle of the playground
   
        this.targetX = undefined; //define the target, so we can take the distance position
        this.targetY = undefined;

        this.bulletX = undefined; // the postion of the bullet
        this.bulletY = undefined;

        this.image = new Image();
        this.image.src = imgSource;
        this.image.frame = frame; // the number of img of the sprite
        this.image.framesIndex = 0;

        this.keys = keys;

        this.velY = 1;
        this.velX = 1
        this.speed = 1

        this.bullets = [];
        this.grenades = [];
        this.grenadeExplo = []
        // this.setListeners()

        this.shoot = shoot
        this.throw = throw2

    }


    draw(framesCounter, frame) { //this function with the variable inside, set the timming of the sprite IMPORTANT!
        this.ctx.drawImage( // this draw the player
            this.image,
            this.image.framesIndex * Math.round(this.image.width / frame), // divide the width of the sprite
            0,
            Math.floor(this.image.width / frame),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter, frame);
        this.bullets.forEach(bullet => bullet.draw());
        this.clearBullets()
        this.grenades.forEach(grenade => grenade.draw());
        this.clearGrenades()
    }
    move() {
        this.bullets.forEach(bullet => bullet.move());
        this.grenades.forEach(grenade => grenade.move());
    }
    animate(framesCounter, frame) { // this animates the player
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > frame - 1) {
            this.image.framesIndex = 0;
        }
    }
    shootPistol(targetX, targetY) { // this set push the bullets with the coordenates already inside, correcting some posY&X for the bullet
        this.bullets.push(new Bullets(this.ctx, this.posX - 50, this.posY - 50, targetX, targetY, this.width, this.height));
        this.shoot.play()

    }
    shootGrenades(targetX, targetY) {
        this.grenades.push(new Grenades(this.ctx, this.posX - 50, this.posY - 50, targetX, targetY, this.width, this.height))
        this.throw.play()
    }
    clearBullets() { // this set if the posX < of the target then crear out, always si a little more
        this.bullets = this.bullets.filter(bullet => bullet.posX <= bullet.targetX);
    }
    clearGrenades() { // this set if the posX < of the target then crear out, always si a little more
        this.grenades = this.grenades.filter(grenade => grenade.posX <= grenade.targetX)
    }

}
