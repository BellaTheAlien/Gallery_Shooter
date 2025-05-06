class BossLevel extends Phaser.Scene{
    constructor(){
        super("boss");

        this.my = {sprite: {}}; //text: {}

        //set movement speed
        this.playerSpeed = 5;
        this.foodSpeed = 5;
        this.bossSpeed = 2;

        //making a property inside "sprite" called "food"
        //the food property has a value which is an array
        //holds pointers to sprites
        this.my.sprite.food = [];
        this.maxFood = 10;

        //the record for the score keeping
        //this.myScore = 0;

        //the timer
        //this.myTime = 30;
        //this.timeEvent = null;

        //the boss start location and size
        this.bossX = 450;
        this.bossY = 5;
        this.bossSize = 2;

    }

    preload(){
        //getting the assets for the Kenny assets pack
        this.load.setPath("./assets/");
        this.load.atlasXML("squareAnimals", "square.png", "square.xml");
        
        //to load in the game audio
        this.load.audio("goodHit", "jingles_PIZZI02.ogg");
    }

    create(){
        let my = this.my;

        //the key inputs
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bossSize = 2;

        //the player movment - calls the player subclass
        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", "rifle.png", this.left, this.right, this.playerSpeed);
        my.sprite.player.setScale(0.5);

        //the big boss
        my.sprite.boss = this.add.sprite(this.bossX,this.bossY, "squareAnimals", "snake.png");
        my.sprite.boss.setScale(this.bossSize);

        document.getElementById('description').innerHTML = '<h2>Oh Lord He Coming.js</h2><br>A: left // D: right'

        //my.text.time = this.add.bitmapText(290, 0, "rocketSquare", "Time " + this.myTime);

        //putting the text on screen
        this.add.text(10, 5,"FEED FEED FEED!", {
            frontFamily: 'Times, serif',
            fontSize: 24,
            wordWrap: {
                width: 60
            }
        });

        //making the time event
        //the timer is one create so the game only loads the timer once
        /*
        this.timeEvent = this.time.addEvent({
            delay: 1000, //1000ms is 1 second
            callback: this.onSecond,
            callbackScope: this,
            loop: true
        });
        */

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

        if (!(this.collides(my.sprite.boss, my.sprite.player))){//my.sprite.boss.y == 600
            my.sprite.boss.y += this.bossSpeed;
        }
        if(this.collides(my.sprite.boss, my.sprite.player)){
            this.scene.start("gameOver");
        }

        //revomving all the food sprites when they reach off screen
        my.sprite.food = my.sprite.food.filter((food) => food.y > -(food.displayHeight/2));

        //checking if you hit the boss
        for(let food of my.sprite.food){
            if (this.collides(my.sprite.boss, food)){
                //clear the food -- places y offscreen, gets reaped next update
                food.y = -100;

                //move back the boss on y axes and reduse size
                my.sprite.boss.y -= this.bossSpeed;
                my.sprite.boss.setScale(this.updateSize());

                this.sound.play("goodHit", {
                    volume: 0.5
                });
            }
        }

        if(this.bossSize < 0.2){
            this.scene.start("winner");
        }

    }

    collides(a, b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    /*
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
    */

    updateSize(){
        this.bossSize -= 0.25;

        return this.bossSize;

    }
}