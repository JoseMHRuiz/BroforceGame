

class Enemy {
    constructor(ctx, gameW, gameH, imgSource, ) {
        this.ctx = ctx

        this.gameWidth = gameW
        this.gameHeight = gameH
        this.width = 80;
        this.height = 100;
        this.posX = gameW-100;
        this.posY = randomInt(200, 800)
        this.life = 100;



        // this.canvas = canvas
        // Initial Position
        // this.randomPos = randomPos
        //Sprite img and size
        this.image = new Image();
        this.image.src = imgSource;
        this.image.frames = 3; // the number of img of the sprite
        this.image.framesIndex = 0;

        this.speed = 0.3 // this set the speed of the zombie
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
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }

    move() {
        this.posX-=this.speed
    }

    life() {
        if(this.life <= 0) return
    }

    setDie(enemy) {
        enemy.image.src = './img/Bullet.png'
        enemy.speed = 0
    }

    die() {
        
    }

    kill() {

    }
    clearBullets() { // this set if the posX < of the target then crear out, always si a little more
        this.bullets = this.bullets.filter(bull => bull.posX <= bull.targetX);
    }
}