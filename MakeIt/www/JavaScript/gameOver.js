class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameOver'});
	}
	preload(){
		this.load.image('over','PNG/gameOver.png');
	}
	create(){
		this.over = this.add.sprite(380,600,'over');
		this.over.setScale(0.3);
		this.input.once('pointerdown', function (event) {
            this.scene.start('mainMenu');
        }, this);
	}
	update(){
		
	}
}
