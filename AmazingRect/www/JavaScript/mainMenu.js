class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'mainMenu'});
	}
	preload(){
		this.load.image('play','PNG/play.png');
		this.load.image('logo','PNG/logo.png');
	}
	create(){
		this.logo = this.add.sprite(config.width/2,config.height/2 - 150,'logo').setOrigin(0.5);
		this.start = this.add.sprite(config.width/2,config.height/2 + 50,'play').setOrigin(0.5)
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.start('gamePlay');
			});
		this.start.setScale(0.15);
		this.logo.setScale(0.6);
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
		this.scaleDirection = 0.001;
		// this.nameText = this.add.text(config.width/2,config.height/2 - 100 ,
		// 							 'Amazing Rect' , { fontSize: '34px', fill: '#000' }).setOrigin(0.5);
	}
	update(){
		if(this.start.scaleX > 0.2 && this.scaleDirection > 0){
			this.scaleDirection = -this.scaleDirection;
		}else if(this.start.scaleX < 0.15 && this.scaleDirection < 0){
			this.scaleDirection = -this.scaleDirection;
		}
		this.start.scaleX += this.scaleDirection;
		this.start.scaleY += this.scaleDirection;
		
		//Rotation
		//this.start.y +=this.startY;
		//if(this.start.y > 600){
		//	this.startY =-1;
		//}else if(this.start.y < 550){
		//	this.startY = 1;
		//}
	}
}
