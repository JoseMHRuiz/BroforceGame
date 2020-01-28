/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);



const gam = {
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
    keys: {
        TOP: 38,
        SPACE: 32,
        C: 67,
    },
    init() {
        this.canvas = document.getElementById('myCanvasGame')
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.start()
    },
    start() {
        this.reSet() //Set the images of the bg and the player
        this.interval = setInterval(() => { // this is the interval, all the moving parts inside
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.counterEnemies++
            this.framesCounter++;  // this is the important part for the velocity of the things!!!
            this.clear(); // clear the canvas every time
            this.drawAll();
            this.generateEnemies();
            this.moveAll();
            this.bulletsVsZombies();
            this.grenadesVsZombies()
            this.showScore()
        }, 1000 / this.FPS);
    },
    collision(enemy, bullet) {
        return enemy.posX < bullet.posX + bullet.width &&
            enemy.posX + enemy.width > bullet.posX &&
            enemy.posY < bullet.posY + bullet.height &&
            enemy.posY + enemy.height > bullet.posY;
    },

    showScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = '30px ThaleahFat'
        this.ctx.fillText("⚰️Deaths", 200, 100);
        this.ctx.fillText(this.totalDeadths, 200, 140);
    },
    bulletsVsZombies() {
        this.enemysArr.forEach(enemy => {
            if (this.player.bullets.some(bullet => this.collision(enemy, bullet))) {
                enemy.life -= 30
                if (enemy.life <= 0)
                    this.setZombieDead(enemy)
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
                enemy.life -= 80
                if (enemy.life <= 0)
                    this.setZombieDead(enemy)
            }
        })
        this.player.grenades.forEach(grenade => { // This eliminate the bullet pro the array when the bulle touch the zombie
            if (this.enemysArr.some(enemy => {
                    return this.collision(grenade, enemy)
                })) {
                this.player.grenades.splice(this.player.grenades.indexOf(grenade), 1)
                this.setGranadeExplode(grenade)
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
    },
    setGranadeExplode(grenade) {
        setTimeout(() => this.player.grenades.splice(this.player.grenades.indexOf(grenade), 1), 1) //splice the enemy with a setTimeout
        this.grenadeExplo.push(grenade) // push enemy in a deadEnemy
        setTimeout(() => { // set time out for the animation zombie
            this.grenadeExplo.splice(this.grenadeExplo.indexOf(grenade), 1)
        }, 1800)
    },


    setDimensions() {
        this.canvas.width = this.width
        this.canvas.height = this.height
    },
    drawAll() {
        this.backgroud.draw()
        this.player.draw(this.framesCounter); //IMPORTANT!! set the timming of the sprite player!!!
        this.enemysArr.forEach((enemy) => enemy.draw(this.framesCounter))
        // This call the function of the Enemy array and set the new animation!!! NO SE TE OLVIDE ESTO!!!!
        this.deadEnemiesArr.forEach((enemy) => enemy.drawDead(enemy, this.framesCounter))
        this.grenadeExplo.forEach((granade) => granade.drawexplode(granade, this.framesCounter))
    },
    moveAll() {
        this.player.move()

    },
    reSet() {
        this.backgroud = new Backgroud(this.ctx, this.width, this.height, './img/ground.png');
        this.player = new Player(this.ctx, this.width, this.height, this.keys, './img/RamboHQ.png');

    },
    clear() {

    },
    generateEnemies() {
        if (this.counterEnemies % 100 === 0)
            this.enemysArr.push(new Enemy(this.ctx, this.width, this.height, './img/ZombieMoving.png'))
    },




}
window.onload = () => {
    game.init();
};




// This launch the game
// window.onload = () => {
//     game.init();
// };