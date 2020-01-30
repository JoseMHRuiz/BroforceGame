/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomIntVel = (min, max) => Math.random() * (max - min + 1) + min;

const shuffle = array => array.sort(() => Math.random() - 0.5);




const game = {
    canvas: undefined,
    ctx: undefined,
    width: 1600,
    height: 900,
    FPS: 60,
    framesCounter: 0,
    mousePos: undefined,
    message: undefined,
    score: 0,
    enemysArr: [],
    rect: undefined,
    deadEnemiesArr: [],
    grenadeExplo: [],
    counterEnemies: 0,
    totalDeadths: 0,
    numberOfEnemies: 100,
    targetX: undefined,
    targetY: undefined,
    live: 1000,
    keys: {
        TOP: 38,
        SPACE: 32,
        C: 67,

    },
    init(img, frames) {
        this.canvas = document.getElementById('myCanvasGame')
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.start(img, frames)
    },
    restore() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.clear()
        clearInterval(this.interval)
        this.totalDeadths = 0
        this.enemysArr = []
        this.live = 1000
    },
    start(img, frames) {
        this.reSet(img) //Set the images of the bg and the player
        this.setListeners()
        this.interval = setInterval(() => { // this is the interval, all the moving parts inside
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.counterEnemies++
            this.framesCounter++; // this is the important part for the velocity of the things!!!
            this.clear(); // clear the canvas every time
            this.drawAll(frames);
            this.generateEnemies();
            this.moveAll();
            this.bulletsVsZombies();
            this.grenadesVsZombies();
            this.grenadesExpVsZombies();
            this.zombieVsBarrier()
            this.level()
            this.gameOver()
            this.liveBar(this.live)
            this.showScore()

        }, 1000 / this.FPS);
    },
    setListeners() {
        document.addEventListener("keydown", e => {
            document.onmousemove = e => { // this sets the event of the mouse pointer
                this.targetX = e.pageX
                this.targetY = e.pageY
            }
            if (e.keyCode === 32) this.player.shootPistol(this.targetX, this.targetY);
            if (e.keyCode === 67) this.player.shootGrenades(this.targetX, this.targetY)

        });
    },
    collision(enemy, bullet) {
        return enemy.posX < bullet.posX + bullet.width &&
            enemy.posX + enemy.width > bullet.posX &&
            enemy.posY < bullet.posY + bullet.height &&
            enemy.posY + enemy.height > bullet.posY;
    },
    liveBar(live) {
        this.ctx.beginPath();
        this.ctx.rect(200, 40, live, 15);
        // this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = '#a69867'
        this.ctx.fill()

        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText(`❤️Life ${live}`, 200, 25);
    },

    showScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText(`⚰️Kill's ${this.totalDeadths}`, 200, 100);
    },
    zombieVsBarrier() {
        this.enemysArr.forEach(enemy => {
            if (this.collision(enemy, this.barrier))
                this.barrierLive(enemy)
        })
    },
    barrierLive(enemy) {
        enemy.speed = 0
        this.live -= 1
    },
    bulletsVsZombies() {
        this.enemysArr.forEach(enemy => {
            if (this.player.bullets.some(bullet => this.collision(enemy, bullet))) {
                this.zombieHit1.play()
                enemy.live -= 30
                if (enemy.live <= 0) {
                    this.zombieDead1.play()
                    this.setZombieDead(enemy)
                }
            }
        })
        this.player.bullets.forEach(bullet => { // This eliminate the bullet pro the array when the bulle touch the zombie
            if (this.enemysArr.some(enemy => {
                    return this.collision(bullet, enemy)
                })) {
                this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
            }
        })
    },
    grenadesVsZombies() {
        this.enemysArr.forEach(enemy => {
            if (this.player.grenades.some(grenade => this.collision(enemy, grenade))) {
                enemy.live -= 110
                if (enemy.live <= 0)
                    this.setZombieDead(enemy)
            }
        })
        this.player.grenades.forEach(grenade => { // This eliminate the bullet pro the array when the bulle touch the zombie
            if (this.enemysArr.some(enemy => {
                    return this.collision(grenade, enemy)
                })) {
                this.setGranadeExplode(grenade)
            }
        })
    },
    grenadesExpVsZombies() { // should work with the explosion buuuuuut no
        this.enemysArr.forEach(enemy => {
            if (this.grenadeExplo.some(grenade => this.collision(enemy, grenade))) {
                enemy.live -= 110
                if (enemy.live <= 0)
                    this.setZombieDead(enemy)
            }
        })
    },
    setZombieDead(enemy) {
        this.totalDeadths++
        setTimeout(() => this.enemysArr.splice(this.enemysArr.indexOf(enemy), 1), 1) //splice the enemy with a setTimeout
        this.deadEnemiesArr.push(enemy) // push enemy in a deadEnemy
        setTimeout(() => { // set time out for the animation zombie
            this.deadEnemiesArr.splice(this.deadEnemiesArr.indexOf(enemy), 1)
        }, 1800)
        this.soundsCounter()


    },
    setGranadeExplode(grenade) {
        setTimeout(() => this.player.grenades.splice(this.player.grenades.indexOf(grenade), 1), 1) //splice the enemy with a setTimeout
        this.grenadeExplo.push(grenade) // push enemy in a deadEnemy
        this.explosion.play()
        console.log(this.grenadeExplo)
        setTimeout(() => { // set time out for the animation zombie
            this.grenadeExplo.splice(this.grenadeExplo.indexOf(grenade), 1)
        }, 1800)
    },


    setDimensions() {
        this.canvas.width = this.width
        this.canvas.height = this.height
    },
    drawAll(frames) {
        this.backgroud.draw()
        this.barrier.draw()
        this.player.draw(this.framesCounter, frames); //IMPORTANT!! set the timming of the sprite player!!!
        this.enemysArr.forEach((enemy) => enemy.draw(this.framesCounter))
        // This call the function of the Enemy array and set the new animation!!! NO SE TE OLVIDE ESTO!!!!
        this.deadEnemiesArr.forEach((enemy) => enemy.drawDead(enemy, this.framesCounter))
        this.grenadeExplo.forEach((granade) => granade.drawexplode(granade, this.framesCounter))
    },
    moveAll() {
        this.player.move()

    },

    soundsCounter() {
        switch (this.totalDeadths) {
            case 5:
                new Howl({
                    src: ['./sounds/Unreal.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 10:
                new Howl({
                    src: ['./sounds/Erradi.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 15:
                new Howl({
                    src: ['./sounds/BloodBath.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 20:
                new Howl({
                    src: ['./sounds/KillingMachine.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 25:
                new Howl({
                    src: ['./sounds/Unstopp.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 30:
                new Howl({
                    src: ['./sounds/Impresive.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
            case 35:
                new Howl({
                    src: ['./sounds/GoodLike.mp3'],
                    volume: 0.4,
                    autoplay: true
                });
                break;
        }

    },
    reSet(img) {
        this.backgroud = new Backgroud(this.ctx, this.width, this.height, './img/ground.png');
        this.barrier = new Barrier(this.ctx)
        this.player = new Player(this.ctx, this.width, this.height, this.keys, img);
        this.zombieHit1 = new Howl({
            src: ['./sounds/Zombie_hit_1.wav'],
            volume: 0.6,
        });
        this.zombieHit2 = new Howl({
            src: ['./sounds/Zombie_hit_2.wav'],
            volume: 0.6,
        });
        this.zombieDead1 = new Howl({
            src: ['./sounds/Zombie_dead_1.wav'],
            volume: 0.6,
        });
        this.explosion = new Howl({
            src: ['./sounds/explosion04.ogg'],
            volume: 0.6,
        });

    },
    terminator() {
        this.player = new Player(this.ctx, this.width, this.height, this.keys, './img/ZombieMoving.png');

    },
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    generateEnemies() {
        if (this.counterEnemies % this.numberOfEnemies === 0)
            this.enemysArr.push(new Enemy(this.ctx, this.width, this.height, './img/ZombieMoving.png'))
    },
    level() {
      if(this.totalDeadths === 1) this.numberOfEnemies = 50
    },
    gameOver() {
        if (this.live <= 0) {
            document.getElementById("game-over").style.display = "block"
            document.getElementById("myCanvasGame").style.display = "none"

        }
    },
}

window.onload = function () {

    document.getElementById("game-over").style.display = "none"
    new Howl({
        src: ['./sounds/unreal-tournament-main-theme.mp3'],
        volume: 0.6,
    })
    rambo()
    chuck()
    terminator()
    document.getElementById("Restart").onclick = function () {
        game.restore()
        sound.play()
        document.getElementById("game-over").style.display = "none"
        document.getElementById("myCanvasGame").style.display = "block"
        game.init()

    }
}

let chuckImg = {
    img: './img/Chuck-patada.png',
    frames: 8,
}
let RamboImg = {
    img: './img/RamboHQ.png',
    frames: 11,
}
let TerminatorImg = {
    img: './img/Terminator-smash.png',
    frames: 8,
}


let chuck = () => {
    document.getElementById("startChuck").onclick = function () {
        document.getElementById("main-menu").style.display = "none"
        document.getElementById("myCanvasGame").style.display = "block"
        game.init(chuckImg.img, chuckImg.frames);
    }
}

let rambo = () => {
    document.getElementById("startRambo").onclick = function () {
        document.getElementById("main-menu").style.display = "none"
        document.getElementById("myCanvasGame").style.display = "block"
        game.init('./img/RamboHQ.png', 11);

    }
}


let terminator = () => {
    document.getElementById("startTerminator").onclick = function () {
        document.getElementById("main-menu").style.display = "none"
        document.getElementById("myCanvasGame").style.display = "block"
        game.init('./img/Terminator-smash.png', 8);

    }
}


// let sounds = new Howl({
//     unreal: {
//         src: ['./sounds/Unreal.mp3'],
//         volume: 0.4,
//         autoplay: true
//     },
//     hit1: {
//         src: ['./sounds/Zombie_hit_1.wav'],
//         volume: 0.4,
//         autoplay: true
//     },
//     hit2: {
//         src: ['./sounds/Unreal.mp3'],
//         volume: 0.4,
//         autoplay: true
//     }
// })