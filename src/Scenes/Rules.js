class Rules extends Phaser.Scene {
    constructor(){
        super("rules");

        this.my = {sprite: {}, text: {}};
    }

    create(){
        let my = this.my;

        //the enter key so the player can move on to the next scene
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //rules text
        this.add.text(290, 5, "Da Rules", {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 300
            }
        });

        //rule 1: feed the bunnies and pigs
        this.add.text(20, 100, "1: Feed the bunnies and pig to gain points", {
            fontFamily: 'Times, serif',
            fontSize: 30,
            wordWrap: {
                width: 500
            }
        });

        //rule 2: avoid the bird and monkeies
        this.add.text(20, 200, "2: Avoid the birds and monkies, they make you lose points", {
            fontFamily: 'Times, serif',
            fontSize: 30,
            wordWrap: {
                width: 500
            }
        });

        //rule 3: time limit and high score
        this.add.text(20, 300, "3: You only have 30 seonds, get the highest score", {
            fontFamily: 'Times, serif',
            fontSize: 30,
            wordWrap: {
                width: 500
            }
        });


        //asks the player to press enter
        this.add.text(250, 500, "Press enter to start!", {
            fontFamily: 'Times, serif',
            fontSize: 40,
            wordWrap: {
                width: 700
            }
        });
    }

    update(){

        //moving to the next scene
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("babyBunny");
        }
    }

}