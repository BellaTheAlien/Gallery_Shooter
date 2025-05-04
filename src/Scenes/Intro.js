class Intro extends Phaser.Scene {
    constructor(){
        super("intro");

        this.my = {sprite: {}, text: {}};
    }

    preload(){
        //getting the assets for the Kenny assets pack
        this.load.setPath("./assets/");

        //for the intro "art"
        this.load.atlasXML("roundAnimals", "round.png", "round.xml");
        this.load.atlasXML("squareAnimals", "square.png", "square.xml");

        this.load.audio("hubNote", "jingles_SAX10.ogg");
    }

    create(){
        let my = this.my;

        //the enter key so the player can move on to the next scene
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //the bunny
        my.sprite.bunny = this.add.sprite(145, 145, "roundAnimals", "rabbit.png");
        my.sprite.bunny.setScale(0.25);

        //the pig
        my.sprite.pig = this.add.sprite(145, 70, "roundAnimals", "pig.png");
        my.sprite.pig.setScale(0.25);

        //the bird
        my.sprite.bird = this.add.sprite(145, 225, "roundAnimals", "parrot.png");
        my.sprite.bird.setScale(0.25);

        //the monkey
        my.sprite.monkey = this.add.sprite(145, 300, "roundAnimals", "monkey.png");
        my.sprite.monkey.setScale(0.25);

        //the square animles - they are the same ones
        my.sprite.squareBun = this.add.sprite(650, 145, "squareAnimals", "rabbit.png");
        my.sprite.squareBun.setScale(0.25);

        my.sprite.squarePig = this.add.sprite(650, 70, "squareAnimals", "pig.png");
        my.sprite.squarePig.setScale(0.25);

        my.sprite.squareBird = this.add.sprite(650, 227, "squareAnimals", "parrot.png");
        my.sprite.squareBird.setScale(0.25);

        my.sprite.squareMonkey = this.add.sprite(650, 300, "squareAnimals", "monkey.png");
        my.sprite.squareMonkey.setScale(0.25);

        //the intro text
        this.add.text(290, 5, "The Zoo Kepper", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 100
            }
        });

        //asks the player to press enter to move on
        this.add.text(250, 400, "Press enter to start", {
            fontFamily: 'Times, serif',
            fontSize: 40,
            wordWrap: {
                width: 300
            }
        });

        


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.sound.play("hubNote", {
                volume: 0.5
            });
            this.scene.start("rules");
        }
    }
}