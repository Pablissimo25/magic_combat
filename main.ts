radio.onReceivedNumber(function (receivedNumber) {
    Vie += receivedNumber
    basic.showIcon(IconNames.Heart)
    basic.showNumber(Vie)
})
function placement () {
    basic.showIcon(IconNames.SmallDiamond)
    while (place == 100) {
        if (input.isGesture(Gesture.LogoUp)) {
            place = orientation
            check_position()
        }
    }
    basic.showNumber(place)
}
input.onButtonPressed(Button.A, function () {
    Aura_de_Héros()
})
function outofmana () {
    basic.showIcon(IconNames.Skull)
    radio.setGroup(255)
}
function Aura_de_Héros () {
    Mana += -1
    check_position()
    basic.showIcon(IconNames.SmallHeart)
    music.playTone(392, music.beat(BeatFraction.Whole))
    radio.sendNumber(1)
}
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 10; index++) {
        basic.showIcon(IconNames.LeftTriangle)
        basic.showLeds(`
            # # # # #
            . # . . #
            . . # . #
            . . . # #
            . . . . #
            `)
    }
    Mana += 1
})
input.onButtonPressed(Button.B, function () {
    projectile()
})
function projectile () {
    Mana += -1
    check_position()
    basic.showIcon(IconNames.Triangle)
    music.playTone(523, music.beat(BeatFraction.Whole))
    radio.sendNumber(-1)
}
function check_orientation () {
    if (orientation >= 45) {
        if (orientation <= 135) {
            Est.showImage(0, 10)
            cible = 90
            radio.setGroup(1)
        } else {
            if (orientation <= 226) {
                Sud.showImage(0, 10)
                cible = 180
                radio.setGroup(2)
            } else {
                if (orientation <= 316) {
                    Ouest.showImage(0, 10)
                    cible = 270
                    radio.setGroup(3)
                } else {
                    Nord.showImage(0, 10)
                    cible = 0
                    radio.setGroup(4)
                }
            }
        }
    } else {
        Nord.showImage(20)
        cible = 0
        radio.setGroup(4)
    }
}
function check_position () {
    if (place >= 45) {
        if (place <= 135) {
            place = 90
            radio.setGroup(1)
        } else {
            if (place <= 226) {
                place = 180
                radio.setGroup(2)
            } else {
                if (place <= 316) {
                    place = 270
                    radio.setGroup(3)
                } else {
                    place = 0
                    radio.setGroup(4)
                }
            }
        }
    } else {
        place = 0
        radio.setGroup(1)
    }
}
input.onGesture(Gesture.ScreenDown, function () {
    radio.setGroup(255)
    for (let index = 0; index < 20; index++) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            `)
    }
    radio.setGroup(place)
})
function dead () {
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Skull)
    radio.setGroup(255)
}
let cible = 0
let Vie = 0
let place = 0
let orientation = 0
let Ouest: Image = null
let Est: Image = null
let Sud: Image = null
let Nord: Image = null
Nord = images.createImage(`
    . . . . .
    . . # . .
    . # # # .
    . . . . .
    . . . . .
    `)
Sud = images.createImage(`
    . . . . .
    . . . . .
    . # # # .
    . . # . .
    . . . . .
    `)
Est = images.createImage(`
    . . . . .
    . . # . .
    . . # # .
    . . # . .
    . . . . .
    `)
Ouest = images.createImage(`
    . . . . .
    . . # . .
    . # # . .
    . . # . .
    . . . . .
    `)
let icone_vie = images.createImage(`
    # # # # .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
let icone_mana = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    # # # . .
    `)
orientation = input.compassHeading()
radio.setGroup(1)
place = 100
Vie = 4
let Mana = 3
placement()
basic.forever(function () {
    icone_vie.showImage(4 - Vie, 10)
    icone_mana.showImage(3 - Mana, 10)
    check_orientation()
    orientation = input.compassHeading()
    if (Vie <= 0) {
        dead()
    }
    if (Mana <= 0) {
        outofmana()
    }
})
