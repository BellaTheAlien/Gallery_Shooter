class ScoreRoundTwo extends Phaser.Scene {
    constructor(){
        super("scoreRoundTwo");

       
    }

    preload(){
        //sound
        this.load.audio("hubNote", "jingles_SAX10.ogg");
    }

    create(){

        //playerScore.getScore();
        let playerScore = this.registry.get('highScoreTwo');
        //the enter key so the player can move on to the next scene
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //rules text
        this.add.text(250, 5, `Your Score: ${playerScore}`, {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 500
            }
         });

         //asks the player to press enter
        this.add.text(250, 500, "Press enter to play again!", {
            fontFamily: 'Times, serif',
            fontSize: 40,
            wordWrap: {
                width: 300
            }
        });

    }

    update(){
        //moving to the next scene
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("intro");
        }
    }
    
}