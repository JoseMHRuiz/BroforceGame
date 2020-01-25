class Player {
    constructor(ctx, gameW, gameH, keys, imgSource) {
        this.ctx = ctx;

        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 90;
        this.height = 120;

        this.posX = 20;
        this.posY = this.gameHeight / 2;
        this.posY0 = this.posY

        this.mouseX = undefined;
        this.mouseY = undefined;

        this.targetX = undefined;
        this.targetY = undefined;

        this.bulletX = undefined;
        this.bulletY = undefined;

        this.image = new Image();
        this.image.src = imgSource;
        this.image.frames = 11;
        this.image.framesIndex = 0;

        this.keys = keys;

        this.velY = 1;
        this.velX = 1
        this.speed = 1

        this.bullets = [];
        this.setListeners()

    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.animate(framesCounter);
        this.bullets.forEach(bullet => bullet.draw());
        this.clearBullets()
    }
    move() {
        this.bullets.forEach(bullet => bullet.move());
    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    setListeners() {
        document.addEventListener("click", e => {
            document.onmousemove = event => {
                this.mouseX = event.pageX
                this.mouseY = event.pageY
                this.targetX = this.mouseX// - this.posX;
                this.targetY = this.mouseY //- this.posY;
            }
            document.onclick = event => {
                this.shootX = event.pageX
                this.shootY = event.pageY
                this.shoot(event.pageX, event.pageY)
            }
            if (e.initMouseEvent) this.shoot();

        });
    }
    shoot() {
        
// new Bullet(this.pos.x, this.pos.y, tx, ty, this.ctx, this.bullets
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.targetX, this.targetY, this.width,this.height));
    }
    clearBullets() {

        this.bullets = this.bullets.filter(bull => bull.posX <= bull.targetX);
        
       
    }
}


//        this.bullets = this.bullets.filter(bull => bull.posX <= bull.targetX);
// this.bullets = this.bullets.forEach(bulleet => {
// if (Math.round(bullet.prevVelX) !== -Math.round(bullet.velX) && Math.round(bullet.prevVelY) !== -Math.round(bullet.velY)) bulleet.img.src = ('./img/Rambo.png')
// });