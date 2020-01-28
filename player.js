class Player {
    constructor(ctx, gameW, gameH, keys, imgSource) {
        this.ctx = ctx;

        this.gameWidth = gameW;
        this.gameHeight = gameH;

        this.width = 100;
        this.height = 120;

        this.posX = 20;
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
        this.image.frames = 11; // the number of img of the sprite
        this.image.framesIndex = 0;

        this.keys = keys;

        this.velY = 1;
        this.velX = 1
        this.speed = 1

        this.bullets = [];
        this.grenades = [];
        this.grenaExplo = []
        this.setListeners()

    }
    draw(framesCounter) { //this function with the variable inside, set the timming of the sprite IMPORTANT!
        this.ctx.drawImage( // this draw the player
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

        this.animate(framesCounter);
        this.bullets.forEach(bullet => bullet.draw());
        this.clearBullets()
        this.grenades.forEach(grenade => grenade.draw());
        this.clearGrenades()



    }


    move() {
        this.bullets.forEach(bullet => bullet.move());
        this.grenades.forEach(grenade => grenade.move());
    }
    animate(framesCounter) { // this animates the player
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    setListeners() {
        document.addEventListener("keydown", e => {
            document.onmousemove = e => { // this sets the event of the mouse pointer
                // this.mouseX = event.pageX // have the set por the pointer
                // this.mouseY = event.pageY
                this.targetX = e.pageX
                this.targetY = e.pageY
            }
            // document.addEventListener('keydown')
            // if (e.initMouseEvent) this.shoot();
            if (e.keyCode === 32) this.shootPistol();
            if (e.keyCode === 67) this.shootGrenades()


        });
    }
    shootPistol() { // this set push the bullets with the coordenates already inside, correcting some posY&X for the bullet
        this.bullets.push(new Bullets(this.ctx, this.posX - 50, this.posY - 50, this.targetX, this.targetY, this.width, this.height));
    }
    shootGrenades() {
        this.grenades.push(new Grenades(this.ctx, this.posX - 50, this.posY - 50, this.targetX, this.targetY, this.width, this.height))
    }
    clearBullets() { // this set if the posX < of the target then crear out, always si a little more
        this.bullets = this.bullets.filter(bull => bull.posX <= bull.targetX);
    }
    clearGrenades() {// this set if the posX < of the target then crear out, always si a little more
        this.grenades = this.grenades.filter(gre => gre.posX <= gre.targetX)
    }
        
        // setTimeout(() => this.grenades.splice(this.grenades.indexOf(grenade), 1), 1) //splice the enemy with a setTimeout
        // this.grenaExplo.push(grenade) // push enemy in a deadEnemy
        // setTimeout(() => { // set time out for the animation zombie
        //     this.grenaExplo.splice(this.grenaExplo.indexOf(grenade), 1)
        // }, 1800)


        //     if (this.grenades = this.grenades.filter(gre => gre.posX <= gre.targetX))
        //            this.totalDeadths++
        //    setTimeout(() => this.enemysArr.splice(this.enemysArr.indexOf(enemy), 1), 1) //splice the enemy with a setTimeout
        //    this.deadEnemiesArr.push(enemy) // push enemy in a deadEnemy
        //    setTimeout(() => { // set time out for the animation zombie
        //        this.deadEnemiesArr.splice(this.deadEnemiesArr.indexOf(enemy), 1)
        //    }, 1800)

        // }
    
}