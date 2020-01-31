window.onload = function () {

    document.getElementById("game-over").style.display = "none"
    document.getElementById('myCanvasGame').style.display = 'none'
    let b = document.getElementById('broforce');
    gsap.to(b, 1.25, {
        opacity: 1,
        scale: 1.2,
        ease: Linear.easeNone,
        repeat: 100,
        yoyo: true
    })

    rambo()
    chuck()
    terminator()
    document.getElementById("Restart").onclick = function () {
        window.location.reload()
    }
    document.getElementById("Restart").onmouseover = function () {
        gsap.to("#Restart", 0.5, {
            padding: 25,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.3)"
        });
    }
}

let main = new Howl({
    src: ['./sounds/unreal-tournament-main-theme.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.6,
});

//    main.play()