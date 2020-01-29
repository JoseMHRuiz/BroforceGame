class Backgroud {
    constructor(ctx, w, h, imgSource) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;

        this.image = new Image();
        this.image.src = imgSource;

        this.posX = 0;
        this.posY = 0;
    }

    draw() { 
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);

    }
    

}

class Barrier {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 300;
        this.height = 750;

        this.image = new Image();
        this.image.src = './img/Barrier.png';
        this.live = 1000;
        this.posX = 0;
        this.posY = 100;
    }


    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}