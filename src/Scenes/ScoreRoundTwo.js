class ScoreRoundTwo extends Phaser.Scene {
    constructor(){
        super("scoreRoundTwo");
        this.my = {sprite: {}};
       
    }

    preload(){
        this.load.setPath("./assets/");

        //sound
        this.load.audio("hubNote", "jingles_SAX10.ogg");

        //load the time up sprite
        this.load.atlasXML("gamHub", "spritesheet_hud.png", "spritesheet_hud.xml");
    }

    create(){

        let my = this.my;

        my.sprite.timeUP = this.add.sprite(400, 250, "gamHub", "text_timeup.png");

        //playerScore.getScore();
        let playerScore = this.registry.get('highScoreTwo');
        //the enter key so the player can move on to the next scene
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // text
        this.add.text(250, 5, `Your Score: ${playerScore}`, {
            fontFamily: 'Times, serif',
            fontSize: 50,
            wordWrap: {
                width: 500
            }
         });

         //asks the player to press enter
        this.add.text(250, 500, "Press enter for boss!", {
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
            this.scene.start("boss");
        }
    }
    
}