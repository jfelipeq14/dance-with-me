controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Steve.setPosition(60, 110)
    note = 3
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Steve.setPosition(30, 110)
    note = 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Steve.setPosition(130, 110)
    note = 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.spray, 100)
    music.setVolume(105)
    info.changeScoreBy(1)
    note2 = randint(0, 10)
    if (note == 1) {
        if (note2 == 0) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        } else {
            music.play(music.tonePlayable(294, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
    } else if (note == 2) {
        if (note2 == 0) {
            music.play(music.tonePlayable(330, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        } else {
            music.play(music.tonePlayable(349, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
    } else if (note == 3) {
        if (note2 == 0) {
            music.play(music.tonePlayable(392, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        } else {
            music.play(music.tonePlayable(440, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
    } else if (note == 4) {
        if (note2 == 0) {
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        } else {
            music.play(music.tonePlayable(523, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Steve.setPosition(100, 110)
    note = 4
})
info.onLifeZero(function () {
    if (info.score() > 0) {
        game.gameOver(true)
    } else {
        game.gameOver(false)
    }
    music.stopAllSounds()
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 2)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
})
let down: Sprite = null
let up: Sprite = null
let right: Sprite = null
let left: Sprite = null
let lane = 0
let note2 = 0
let note = 0
let Steve: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
effects.starField.startScreenEffect()
Steve = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
Steve.setPosition(80, 110)
let speed = 40
info.setScore(0)
info.setLife(5)
music.setTempo(120)
game.onUpdateInterval(500, function () {
    lane = randint(1, 4)
    if (lane == 1) {
        left = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 5 . . . . . . . . . . 
            . . . . 5 5 . . . . . . . . . . 
            . . . 5 5 5 . . . . . . . . . . 
            . . 5 5 5 5 . . . . . . . . . . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            . . 5 5 5 5 . . . . . . . . . . 
            . . . 5 5 5 . . . . . . . . . . 
            . . . . 5 5 . . . . . . . . . . 
            . . . . . 5 . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        left.setVelocity(0, speed)
        left.setPosition(30, 8)
    } else if (lane == 2) {
        right = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 3 . . . . . 
            . . . . . . . . . . 3 3 . . . . 
            . . . . . . . . . . 3 3 3 . . . 
            . . . . . . . . . . 3 3 3 3 . . 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
            3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . 
            . . . . . . . . . . 3 3 3 3 . . 
            . . . . . . . . . . 3 3 3 . . . 
            . . . . . . . . . . 3 3 . . . . 
            . . . . . . . . . . 3 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        right.setVelocity(0, speed)
        right.setPosition(130, 8)
    } else if (lane == 3) {
        up = sprites.create(img`
            . . . . . . . 6 . . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . 6 6 6 6 6 . . . . . . 
            . . . . 6 6 6 6 6 6 6 . . . . . 
            . . . 6 6 6 6 6 6 6 6 6 . . . . 
            . . 6 6 6 6 6 6 6 6 6 6 6 . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            `, SpriteKind.Projectile)
        up.setVelocity(0, speed)
        up.setPosition(60, 8)
    } else {
        down = sprites.create(img`
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . 9 9 9 9 9 9 9 9 9 9 9 . . . 
            . . . 9 9 9 9 9 9 9 9 9 . . . . 
            . . . . 9 9 9 9 9 9 9 . . . . . 
            . . . . . 9 9 9 9 9 . . . . . . 
            . . . . . . 9 9 9 . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            `, SpriteKind.Projectile)
        down.setVelocity(0, speed)
        down.setPosition(100, 8)
    }
    speed += 1
})
