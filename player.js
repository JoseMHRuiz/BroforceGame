class Player {
    constructor(ctx, gameW, gameH, keys, imgSource) {
        this.ctx = ctx;

        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 100;
        this.height = 140;

        this.posX = 190;
        this.posY = this.gameHeight / 2; // this puts the player in the middle of the playground
        // this.posY0 = this.posY // maybe for the moving player!!

        // this.mouseX = undefined; //define the mouse position for the pointer???
        // this.mouseY = undefined;

        this.targetX = undefined; //define the target, so we can take the distance position
        this.targetY = undefined;

        this.bulletX = undefined; // the postion of the bullet
        this.bulletY = undefined;

        this.image = new Image();
        this.image.src = imgSource;
        this.image.frame = 28; // the number of img of the sprite
        this.image.framesIndex = 0;

        this.keys = keys;

        this.velY = 1;
        this.velX = 1
        this.speed = 1

        this.bullets = [];
        this.grenades = [];
        this.grenadeExplo = []
        // this.setListeners()

    }

   
    draw(framesCounter, frames) { //this function with the variable inside, set the timming of the sprite IMPORTANT!
        this.ctx.drawImage( // this draw the player
            this.image,
            this.image.framesIndex * Math.round(this.image.width / frames), // divide the width of the sprite
            0,
            Math.floor(this.image.width / frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter, frames);
        this.bullets.forEach(bullet => bullet.draw());
        this.clearBullets()
        this.grenades.forEach(grenade => grenade.draw());
        this.clearGrenades()
    }
    move() {
        this.bullets.forEach(bullet => bullet.move());
        this.grenades.forEach(grenade => grenade.move());
    }
    animate(framesCounter, frames) { // this animates the player
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    shootPistol(targetX,targetY) { // this set push the bullets with the coordenates already inside, correcting some posY&X for the bullet
        this.bullets.push(new Bullets(this.ctx, this.posX - 50, this.posY - 50, targetX, targetY, this.width, this.height));
    }
    shootGrenades(targetX, targetY) {
        this.grenades.push(new Grenades(this.ctx, this.posX - 50, this.posY - 50, targetX, targetY, this.width, this.height))
    }
    clearBullets() { // this set if the posX < of the target then crear out, always si a little more
        this.bullets = this.bullets.filter(bullet => bullet.posX <= bullet.targetX);
    }
    clearGrenades() {// this set if the posX < of the target then crear out, always si a little more
        this.grenades = this.grenades.filter(grenade => grenade.posX <= grenade.targetX)
    }

}