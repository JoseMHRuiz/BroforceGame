let volumeEffect = 0.3
let volumeVoice = 0.5
let mainMusic = 0.6



let shoot = new Howl({
    src: ['./sounds/shot.wav'],
    volume: volumeEffect,
});

let throw2 = new Howl({
    src: ['./sounds/sfx_throw.wav'],
    volume: volumeEffect,
});

let zombieHit1 = new Howl({
    src: ['./sounds/Zombie_hit_1.wav'],
    volume: volumeEffect,
});

let zombieHit2 = new Howl({
    src: ['./sounds/Zombie_hit_2.wav'],
    volume: volumeEffect,
});
let zombieDead1 = new Howl({
    src: ['./sounds/Zombie_dead_1.wav'],
    volume: volumeEffect,
});
let explosion = new Howl({
    src: ['./sounds/explosion04.ogg'],
    volume: volumeEffect,
});

let unreal = new Howl({
    src: ['./sounds/Unreal.mp3'],
    volume: volumeVoice,
});
let erradi = new Howl({
    src: ['./sounds/Erradi.mp3'],
    volume: volumeVoice,
});
let blood = new Howl({
    src: ['./sounds/BloodBath.mp3'],
    volume: volumeVoice,
});
let killing = new Howl({
    src: ['./sounds/KillingMachine.mp3'],
    volume: volumeVoice,
});
let unstop = new Howl({
    src: ['./sounds/Unstopp.mp3'],
    volume: volumeVoice,
});
let impre = new Howl({
    src: ['./sounds/Impresive.mp3'],
    volume: volumeVoice,
});
let good = new Howl({
    src: ['./sounds/GoodLike.mp3'],
    volume: volumeVoice,
});