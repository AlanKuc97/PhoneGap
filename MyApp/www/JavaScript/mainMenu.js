class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'mainMenu'});
	}
	preload(){
		this.load.image('play','PNG/startBtn.png');
	}
	create(){
		this.start = this.add.sprite(config.width/2,config.height/2,'play');
		this.start.setScale(0.8);
		this.startY = 1;
		//highScore
		this.highScore =0;
		if (localStorage.getItem("makeItHighScore") !== null) {
			this.highScore = parseInt(localStorage.getItem("makeItHighScore"));
		}else{
			localStorage.setItem("makeItHighScore", this.highScore);
		}
		this.highScoreText = this.add.text(10, 50, 'score:', { fontSize: '24px', fill: '#000' });
		this.highScoreText.setText('High Score:' + this.highScore);
		//
		this.input.once('pointerdown', function (event) {
           		this.scene.start('gamePlay');
        	}, this);
	}
	update(){
		//Rotation
		//this.start.y +=this.startY;
		//if(this.start.y > 600){
		//	this.startY =-1;
		//}else if(this.start.y < 550){
		//	this.startY = 1;
		//}
	}
}
