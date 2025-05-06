// Neila Miranda
// Created: 4/27/2025
// Phaser: 3.70.0
//
// Gallary shooter

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [Intro, Rules, BabyBunny, ScoreRoundOne, Pigs, ScoreRoundTwo, BossLevel, GameOver, WinGame]
}

const game = new Phaser.Game(config);