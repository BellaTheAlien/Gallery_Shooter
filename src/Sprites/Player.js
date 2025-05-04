class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed){
        super(scene, x, y, texture, frame);

        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }

    update(){
        //Moving left
        if (this.left.isDown){
            //check to make sure the sprite can move to the left
            if (this.x > (this.displayWidth/2)){
                this.x -= this.playerSpeed;
            }
        }

        //movement for the right
        if (this.right.isDown){
            //check that the player can move
            if (this.x < (game.config.width - (this.displayWidth/2))){
                this.x += this.playerSpeed;
            }
        }
    }
}