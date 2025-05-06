class WinGame extends Phaser.Scene{
    constructor(){
        super("winner");
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

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.text(250, 220, "WINNER!!!", {
            fontFamily: 'Times, serif',
            fontSize: 60,
            wordWrap: {
                width: 300
            }
        });

        this.add.text(5, 500, "Press enter to feed the boss", {
            fontFamily: 'Times, serif',
            fontSize: 40,
            wordWrap: {
                width: 350
            }
        });

        this.add.text(500, 500, "Press esc for main menu", {
            fontFamily: 'Times, serif',
            fontSize: 40,
            wordWrap: {
                width: 350
            }
        });


    }

    update(){
        //moving to the next scene
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("boss");
        }
        if(Phaser.Input.Keyboard.JustDown(this.escKey)){
            this.scene.start("intro");
        }
    }
}