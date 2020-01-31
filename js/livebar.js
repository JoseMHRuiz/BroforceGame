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
}

class Message {
    constructor(ctx, x, y) {
            this.ctx = ctx;
            this.x = x
            this.y = y
            this.font = 100
            this.font0 = 100
            this.y0 = y
            this.y1 = y + 200
        }
        draw(msg) {
            this.y += 2
            this.w += 2
            this.h += 2
            this.font++
            this.ctx.fillStyle = "white";
            this.ctx.font = `${this.font}px ThaleahFat`
            this.ctx.fillText(`${msg}`, this.x, this.y);
        }
}