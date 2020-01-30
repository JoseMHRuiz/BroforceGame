// class Rambo extends Player {
//     constructor(ctx, gameW, gameH, keys, imgSource, frame) {
//         super(ctx, gameW, gameH, keys, imgSource, frame)
//         this.imgSource = './img/RamboHQ.png'
//         this.frame = 11
//     }
  
// }

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