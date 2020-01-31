let chuck = () => {
    document.getElementById("startChuck").onmouseenter = function () {
        gsap.to("#startChuck", 0.5, {
            padding: 25,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };
    document.getElementById("startChuck").onclick = function () {
        document.getElementById('startChuck').classList.add('toUp')
        document.getElementById('startTerminator').classList.add('fuckoff')
        document.getElementById('startRambo').classList.add('fuckoff')
        setTimeout(() => {
            document.getElementById("main-menu").style.display = "none"
            document.getElementById("myCanvasGame").style.display = "block"
            game.init()
            game.setChuck()
        }, 1000)
    }
}
let rambo = () => {
    document.getElementById("startRambo").onmouseenter = function () {
        gsap.to("#startRambo", 0.5, {
            padding: 25,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });
    }
    document.getElementById("startRambo").onclick = function () {
        document.getElementById('startRambo').classList.add('toCenterL')
        document.getElementById('startTerminator').classList.add('fuckoff')
        document.getElementById('startChuck').classList.add('fuckoff')
        setTimeout(() => {
            document.getElementById("main-menu").style.display = "none"
            document.getElementById("myCanvasGame").style.display = "block"
            document.querySelector('.btn').classList.add('fuckoff')
            game.init();
            game.setRambo()
        }, 1000)
    };
}
let terminator = () => {
    document.getElementById("startTerminator").onmouseenter = function () {
        gsap.to("#startTerminator", 0.5, {
            padding: 25,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });
    }
    document.getElementById("startTerminator").onclick = function () {
        document.getElementById('startTerminator').classList.add('toCenterR')
        document.getElementById('startChuck').classList.add('fuckoff')
        document.getElementById('startRambo').classList.add('fuckoff')
        setTimeout(() => {
            document.getElementById("main-menu").style.display = "none"
            document.getElementById("myCanvasGame").style.display = "block"
            game.init();
            game.setTerminator()


        }, 1000)
    }
}