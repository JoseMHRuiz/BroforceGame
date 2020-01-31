const LiveBar = {
    ctx: undefined,
    init: function (ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
    },
    draw(live) {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, live, 15);
        // this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = '#a69867'
        this.ctx.fill()

        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText(`❤️Life ${live}`, this.x, this.y - 15);
    }
}

const Score = {
    ctx: undefined,
    init: function (ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
    },

    draw(score) {
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText(`⚰️Kill's ${score}`, this.x, this.y);
    },
    mensage(score) {
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText(`⚰️Kill's`, this.x + 30, this.y + 30);
    }
}

