class Pigs extends Phaser.Scene {
    constructor(){
        super("pigs");

        this.my = {sprite: {}, text: {}};

        //set movement speed
        this.playerSpeed = 5;
        this.foodSpeed = 5;

        //making a property inside "sprite" called "food"
        //the food property has a value which is an array
        //holds pointers to sprites
        this.my.sprite.food = [];
        this.maxFood = 10;

        //the limite of sprites to make
        this.my.sprite.pigArray = [];
        this.my.sprite.monkeyArray = [];

        //the record for the score keeping
        this.myScore = 0;

        //the timer
        this.myTime = 30;
        this.timeEvent = null;

    }

    preload(){
        //getting the assets for the Kenny assets pack
        this.load.setPath("./assets/");
        //the round rabbits are the babies, from animal pack
        this.load.atlasXML("roundAnimals", "round.png", "round.xml");

        //the player will be the rifle from the gallery shooter pack
        this.load.atlasXML("player", "spritesheet_objects.png", "spritesheet_objects.xml");
        //the "food"/"vitamin"
        this.load.atlasXML("food", "spritesheet_hud.png", "spritesheet_hud.xml");

        //the "enamy" the bird
        //this.load.atlasXML("bird", "round.png", "round.xml");

        //loading the kenny rocket square bitmap font
        //seen in bulletTime example
        // BMFont: https://www.angelcode.com/products/bmfont/
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "kennyRocketSquare.fnt");

        //to load in the game audio
        this.load.audio("goodHit", "jingles_PIZZI02.ogg");
        this.load.audio("badHit", "jingles_PIZZI03.ogg");
    }

    create(){
        let my = this.my;

        //the key inputs
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //the player movment - calls the player subclass
        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", "rifle.png", this.left, this.right, this.playerSpeed);
        my.sprite.player.setScale(0.5);

        //the setup for the score and timer text
        my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + this.myScore);
        my.text.time = this.add.bitmapText(290, 0, "rocketSquare", "Time " + this.myTime);

        //calls for the pigs and monkies
        this.pigSpawn();
        this.pigSpawn();
        this.pigSpawn();
        this.pigSpawn();
        //the monkey
        this.monkeySpawn();
        this.monkeySpawn();
        this.monkeySpawn();


        document.getElementById('description').innerHTML = '<h2>Baby Pigs.js</h2><br>A: left // D: right'

        //putting the text on screen
        this.add.text(10, 5,"Feed the pigs!", {
            frontFamily: 'Times, serif',
            fontSize: 24,
            wordWrap: {
                width: 60
            }
        });

        //making the time event
        //the timer is one create so the game only loads the timer once
        this.timeEvent = this.time.addEvent({
            delay: 1000, //1000ms is 1 second
            callback: this.onSecond,
            callbackScope: this,
            loop: true
        });
    }

    //the pigs and monkey function to set them in the scene and thier path
    pigSpawn(){
        let my = this.my;

        let pigFirstX = Math.random()*config.width;
        let pigLimitX = ((Math.random()*config.width) - pigFirstX) + pigFirstX;
        let pigPathY = Math.random()*(config.height/2);

        this.pigPoints = [
            pigFirstX, pigPathY,
            pigLimitX, pigPathY
        ];
        this.pigCurve = new Phaser.Curves.Spline(this.pigPoints);

        my.sprite.pigs = this.add.follower(this.pigCurve, 10, 10, "roundAnimals", "pig.png");
        my.sprite.pigs.setScale(0.3);
        my.sprite.pigs.scorePoints = 100;

        my.sprite.pigs.x = this.pigCurve.points[0].x;
        my.sprite.pigs.y = this.pigCurve.points[0].y;
        my.sprite.pigs.visible = true;
        
        my.sprite.pigs.setPath(this.pigCurve);
        my.sprite.pigs.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.pigArray.push(my.sprite.pigs);
        
    }

    monkeySpawn(){
        let my = this.my;

        //the bird paths limites
        let monkeyFirstY = Math.random()*(config.height/2);
        let monkeyLimitY = Math.random()*((config.height/2) + monkeyFirstY);
        let monkeyPathX = Math.random()*config.width;

        this.monkeyPoints = [
            monkeyPathX, monkeyFirstY,
            monkeyPathX, monkeyLimitY
        ];
        this.monkeyCurve = new Phaser.Curves.Spline(this.monkeyPoints);

        my.sprite.monkey = this.add.follower(this.monkeyCurve, 10, 10, "roundAnimals", "monkey.png");
        my.sprite.monkey.setScale(0.3);
        my.sprite.monkey.scorePoints = 50;

        my.sprite.monkey.x = this.monkeyCurve.points[0].x;
        my.sprite.monkey.y = this.monkeyCurve.points[0].y;
        my.sprite.monkey.visible = true;

        
        my.sprite.monkey.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.monkeyArray.push(my.sprite.monkey);
    }

    update(){
        let my = this.my;

        //cales the Player update move movment of the player to act
        my.sprite.player.update();

         //check for the food being fired
         if(Phaser.Input.Keyboard.JustDown(this.space)){
            if(my.sprite.food.length < this.maxFood){
                my.sprite.food.push(this.add.sprite(
                    my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/2), "food", "icon_bullet_gold_short.png")
                );
            }
        }

        //make all of the food sprites move
        for (let food of my.sprite.food){
            food.y -= this.foodSpeed;
        }

        //revomving all the food sprites when they reach off screen
        my.sprite.food = my.sprite.food.filter((food) => food.y > -(food.displayHeight/2));

        //check for collision of food for the pigs
        for(let i of my.sprite.food){
            for(let k = my.sprite.pigArray.length - 1; k >= 0; k--){
                let currPig = my.sprite.pigArray[k];
                if (this.collides(currPig, i)){
                    //clear the food -- places y offscreen, gets reaped next update
                    i.y = -100;

                    //updateing the score
                    this.myScore += my.sprite.pigs.scorePoints;
                    this.updateScore();

                    currPig.destroy();
                    my.sprite.pigArray.splice(k, 1);

                    this.sound.play("goodHit", {
                        volume: 0.5
                    });

                    //add a new pig
                    if(my.sprite.pigArray.length < 4){
                        this.pigSpawn();
                    }
                    
                }
            }

            for(let k = my.sprite.monkeyArray.length -1; k >=0; k--){
                let currMonkey = my.sprite.monkeyArray[k];
                if(this.collides(currMonkey,i)){
                    i.y = -100;

                    //updateing the score - the monkey takes away from the score
                    this.myScore -= my.sprite.monkey.scorePoints;
                    this.updateScore();

                    currMonkey.destroy();
                    my.sprite.monkeyArray.splice(k, 1);

                    this.sound.play("badHit", {
                        volume: 0.5
                    });


                    //add a new monkey
                    if(my.sprite.monkeyArray.length < 3){
                        this.monkeySpawn();
                    }
                    

                }
            }

        }
    }

    collides(a, b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore(){
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }

    onSecond(){
        this.myTime--;
        this.my.text.time.setText("Time: " + this.myTime);

        if(this.myTime <= 0){
            this.timeEvent.remove(false);
            
            //the registry functiion keeps the score for the next scene, but leaves the myScore the same for this scene
            this.registry.set('highScoreTwo', this.myScore);
            this.scene.start("scoreRoundTwo");
            //this.scene.pause();
        }
    }
}