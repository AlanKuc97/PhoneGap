class MainMenu extends Phaser.Scene{
	constructor(){
		super({key:'mainMenu'});
	}
	preload(){
		this.load.image('play','PNG/startBtn.png');
		this.load.image('redBall','PNG/bgRed.png');
		this.load.image('greenBall','PNG/bgGreen.png');
		this.load.image('blueBall','PNG/bgBlue.png');
	}
	create(){
		this.start = this.add.sprite(375,550,'play');
		this.start.setScale(0.1);
		this.startY = 1;
		this.redBall = this.add.sprite(200,300,'redBall').setInteractive();
		this.directionRedX = 2;
		this.directionRedY = 2;
		this.greenBall = this.add.sprite(500,600,'greenBall').setInteractive();
		this.directionGreenX = -2;
		this.directionGreenY = -2;
		this.blueBall = this.add.sprite(350,1000,'blueBall').setInteractive();
		this.directionBlueX = 2;
		this.directionBlueY = -2;
		//highScore
		this.highScore =0;
		if (localStorage.getItem("makeItHighScore") !== null) {
			this.highScore = parseInt(localStorage.getItem("makeItHighScore"));
		}else{
			localStorage.setItem("makeItHighScore", this.highScore);
		}
		this.highScoreText = this.add.text(255, 480, 'score:', { fontSize: '32px', fill: '#000' });
		this.highScoreText.setText('High Score:' + this.highScore);
		//
		this.input.once('pointerdown', function (event) {
           		this.scene.start('gamePlay');
        	}, this);
	}
	update(){
		//console.log(window.innerWidth);
		//console.log(window.innerHeight);
		////Animation IF 
		//Red Ball
		if(this.redBall.x > 730){
			this.directionRedX = -2;
			//this.start.setScale(1);
		}else if(this.redBall.x < 20){
			this.directionRedX = 2; 
		}
		if(this.redBall.y > 1114){
			this.directionRedY = -2;
		}else if(this.redBall.y < 215){
			this.directionRedY = 2; 
		}
		//Green Ball
		if(this.greenBall.x > 730){
			this.directionGreenX = -2;
		}else if(this.greenBall.x < 20){
			this.directionGreenX = 2; 
		}
		if(this.greenBall.y > 1114){
			this.directionGreenY = -2;
		}else if(this.greenBall.y < 215){
			this.directionGreenY = 2;
			//this.start.setScale(1.5);
		}
		//Blue Ball
		if(this.blueBall.x > 730){
			this.directionBlueX = -2;
		}else if(this.blueBall.x < 20){
			this.directionBlueX = 2; 
		}
		if(this.blueBall.y > 1114){
			this.directionBlueY = -2;
			//this.start.setScale(2);
		}else if(this.blueBall.y < 215){
			this.directionBlueY = 2; 
		}
		/////
		this.redBall.x += this.directionRedX;
		this.redBall.y += this.directionRedY;
		this.greenBall.x += this.directionGreenX;
		this.greenBall.y += this.directionGreenY;
		this.blueBall.x += this.directionBlueX;
		this.blueBall.y += this.directionBlueY;
		//Rotation
		//this.start.angle += 2;
		//Collapse the start button
		this.start.y +=this.startY;
		if(this.start.y > 600){
			this.startY =-1;
		}else if(this.start.y < 550){
			this.startY = 1;
		}
	}
}
