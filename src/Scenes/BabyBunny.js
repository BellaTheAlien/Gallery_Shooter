class BabyBunny extends Phaser.Scene {
    constructor(){
        super("babyBunny");

        this.my = {sprite: {}, text: {}};

        //temp location for sprites so i can see them and change anything i need on them
        //TODO: delete this later
        this.tempX = 300;
        this.tempY = 350;

        //set movement speed
        this.playerSpeed = 5;
        this.foodSpeed = 5;

        //making a property inside "sprite" called "food"
        //the food property has a value which is an array
        //holds pointers to sprites
        this.my.sprite.food = [];
        this.maxFood = 10;

        //the limite of sprites to make
        this.my.sprite.bunnryArray = [];
        this.my.sprite.birdArray = [];

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

        /*
        let bunnyFirstX = Math.random()*config.width;
        let bunnyLimitX = ((Math.random()*config.width) - bunnyFirstX) + bunnyFirstX;//Math.random()*(config.width - bunnyFirstX) + bunnyFirstX;
        let bunnyPathY = Math.random()*(config.height/2);
        */

        //the bird paths limites
        //let birdFirstY = Math.random()*(config.height/2);
        //let birdLimitY = Math.random()*((config.height/2));
        //let birdPathX = Math.random()*config.width;
        //making the key inputs
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //this.playerSpeed = 5;
        //this.foodSpeed = 5;
        
        //adding the player to the scene
        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", "rifle.png", this.left, this.right, this.playerSpeed);
        my.sprite.player.setScale(0.5);

        my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + this.myScore);
        my.text.time = this.add.bitmapText(290, 0, "rocketSquare", "Time " + this.myTime);

        //time anout of time bunny spawn is called is the amount of bunnies in the array
        this.bunnySpawn();
        this.bunnySpawn();
        this.bunnySpawn();
        this.bunnySpawn();
        //the time a bird spaw gets called in the amount of birds in the array
        this.birdSpawn();
        this.birdSpawn();

        //making the path the bunnies will follow
        /*
        this.bunnyPoints = [
            bunnyFirstX, bunnyPathY,
            bunnyLimitX, bunnyPathY
        ];
        this.bunnyCurve = new Phaser.Curves.Spline(this.bunnyPoints);
        */
        

        //the birds path curve
        /*
        this.birdPoints = [
            birdPathX, birdFirstY,
            birdPathX, birdLimitY
        ];
        this.birdCurve = new Phaser.Curves.Spline(this.birdPoints);
        */

        //making the bunny sprite
        //my.sprite.babyBun = this.add.follower(this.bunnyCurve, 10, 10, "baby_bunny", "rabbit.png");
        //my.sprite.babyBun.setScale(0.3);
        //my.sprite.babyBun.visible = false;

        //making the bird sprite
        //my.sprite.bird = this.add.follower(this.birdCurve, 10, 10, "bird", "parrot.png");
        //my.sprite.bird.setScale(0.3);
        //my.sprite.bird.visible = false;

        /*
        my.sprite.babyBun.x = this.bunnyCurve.points[0].x;
        my.sprite.babyBun.y = this.bunnyCurve.points[0].y;
        my.sprite.babyBun.visible = true;
        */

        /*
        my.sprite.bird.x = this.birdCurve.points[0].x;
        my.sprite.bird.y = this.birdCurve.points[0].y;
        my.sprite.bird.visible = true;

        
        my.sprite.babyBun.startFollow({
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
        

        my.sprite.bird.startFollow({
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
        */

        //making the score text

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Baby Bunny.js</h2><br>A: left // D: right' // "// Space: fire/emit // S: Next Scene"

        //my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + this.myScore);
        //my.text.time = this.add.bitmapText(290, 0, "rocketSquare", "Time " + this.myTime);

        //putting the text on screen
        this.add.text(10, 5,"Feed the bunnies!", {
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

    bunnySpawn(){
        let my = this.my;

        let bunnyFirstX = Math.random()*config.width;
        let bunnyLimitX = ((Math.random()*config.width) - bunnyFirstX) + bunnyFirstX;
        let bunnyPathY = Math.random()*(config.height/2);

        this.bunnyPoints = [
            bunnyFirstX, bunnyPathY,
            bunnyLimitX, bunnyPathY
        ];
        this.bunnyCurve = new Phaser.Curves.Spline(this.bunnyPoints);

        my.sprite.babyBun = this.add.follower(this.bunnyCurve, 10, 10, "roundAnimals", "rabbit.png");
        my.sprite.babyBun.setScale(0.3);
        my.sprite.babyBun.scorePoints = 50;

        my.sprite.babyBun.x = this.bunnyCurve.points[0].x;
        my.sprite.babyBun.y = this.bunnyCurve.points[0].y;
        my.sprite.babyBun.visible = true;
        
        my.sprite.babyBun.setPath(this.bunnyCurve);
        my.sprite.babyBun.startFollow({
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

        my.sprite.bunnryArray.push(my.sprite.babyBun);

        //return my.sprite.babyBun;
        
    }

    birdSpawn(){
        let my = this.my;

        //the bird paths limites
        let birdFirstY = Math.random()*(config.height/2);
        let birdLimitY = Math.random()*((config.height/2) + birdFirstY);
        let birdPathX = Math.random()*config.width;

        this.birdPoints = [
            birdPathX, birdFirstY,
            birdPathX, birdLimitY
        ];
        this.birdCurve = new Phaser.Curves.Spline(this.birdPoints);

        my.sprite.bird = this.add.follower(this.birdCurve, 10, 10, "roundAnimals", "parrot.png");
        my.sprite.bird.setScale(0.3);
        my.sprite.bird.scorePoints = 25;

        my.sprite.bird.x = this.birdCurve.points[0].x;
        my.sprite.bird.y = this.birdCurve.points[0].y;
        my.sprite.bird.visible = true;

        
        my.sprite.bird.startFollow({
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

        my.sprite.birdArray.push(my.sprite.bird);
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

        //check for collision of food for the bunnies
        for(let i of my.sprite.food){
            for(let k = my.sprite.bunnryArray.length - 1; k >= 0; k--){
                let bunny = my.sprite.bunnryArray[k];
                if (this.collides(bunny, i)){
                    //clear the food -- places y offscreen, gets reaped next update
                    i.y = -100;

                    //updateing the score
                    this.myScore += my.sprite.babyBun.scorePoints;
                    this.updateScore();

                    bunny.destroy();
                    my.sprite.bunnryArray.splice(k, 1);

                    this.sound.play("goodHit", {
                        volume: 0.5
                    });

                    //add a new bunny
                    if(my.sprite.bunnryArray.length < 4){
                        this.bunnySpawn();
                    }
                    
                }
            }

            for(let k = my.sprite.birdArray.length -1; k >=0; k--){
                let currBird = my.sprite.birdArray[k];
                if(this.collides(currBird,i)){
                    i.y = -100;

                    //updateing the score - the bird takes away from the score
                    this.myScore -= my.sprite.bird.scorePoints;
                    this.updateScore();

                    currBird.destroy();
                    my.sprite.birdArray.splice(k, 1);

                    this.sound.play("badHit", {
                        volume: 0.5
                    });

                    if(my.sprite.birdArray.length < 2){
                        this.birdSpawn();
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
            this.registry.set('highScore', this.myScore);
            this.scene.start("scoreRoundOne");
        }
    }
}