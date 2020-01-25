/** @type HTMLCanvasElement */
/** @type CanvasRenderingContext2D */

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);



const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    mousePos: undefined,
    message: undefined,
    score: 0,
    zombies: 0,
    rect: undefined,
    keys: {
        TOP: 38,
        SPACE: 32
    },
    init() {
       
        
        this.canvas = document.getElementById('myCanvasGame')
        this.ctx = this.canvas.getContext('2d')
        this.setDimensions()
        this.start()
    },
    start() {
        this.reSet()
        this.interval = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.framesCounter++;
            this.clear();
            this.drawAll();
            this.moveAll();
            this.generateZombies();


        }, 1000 / 60);
    },
    setDimensions() {
        this.width = 1600;
        this.height = 900;
        this.canvas.width = this.width
        this.canvas.height = this.height
    },
    drawAll() {
        this.backgroud.draw()
        this.player.draw(this.framesCounter);

    },
    moveAll() {
        this.player.move()

    },
    reSet() {
        this.backgroud = new Backgroud(this.ctx, this.width, this.height, '/img/ground.png');
        this.player = new Player(this.ctx, this.width, this.height, this.keys, '/img/Rambo.png');

    },
    clear() {

    },
    generateZombies() {

    },
    setLiseners(canvas,) {
        
    }




}
window.onload = () => {
    game.init();
};




// This launch the game
// window.onload = () => {
//     game.init();
// };