class GamePlay extends Phaser.Scene{
	constructor(){
		super({key : 'gamePlay'});
	}
	preload(){
	}
	gameOverCollaps(){
		if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
			localStorage.setItem("makeItHighScore", this.score);
		}
		this.scene.start('gameOver');
	}
	gameScore(){
		if(this.firstRect[0].y > config.height/2 && this.firstScored == 0){
			this.firstScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
		}else if(this.thirdRect[0].y > config.height/2 && this.thirdScored == 0){
			this.thirdScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
		}else if(this.secondRect[0].y > config.height/2 && this.secondScored == 0){
			this.secondScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
		}
	}
	gameDownObsticles(rectY){
		this.firstRect[0].y += rectY;
		this.firstRect[1].y += rectY;
		this.thirdRect[0].y += rectY;
		this.thirdRect[1].y += rectY ;
		this.secondRect[0].y += rectY;
		this.secondRect[1].y += rectY;
	}
    fillObsticles(){
		this.firstRect[0].setFillStyle(this.firstRect[2]);
		this.firstRect[1].setFillStyle(this.firstRect[2]);
		this.secondRect[0].setFillStyle(this.secondRect[2]);
		this.secondRect[1].setFillStyle(this.secondRect[2]);
		this.thirdRect[0].setFillStyle(this.thirdRect[2]);
		this.thirdRect[1].setFillStyle(this.thirdRect[2]);
	}
	playerMovement(){
		//Player movement X coordinate
		if(this.player.x > 0 && this.player.x < config.width){
			this.player.x += this.rectX;
		}else if(this.player.x >= config.width && this.rectX < 0){
			this.player.x += this.rectX;
		}else if(this.player.x <= 0 && this.rectX > 0){
			this.player.x += this.rectX;
		}
		//Player movement Y coordinate
		if (this.player.y > config.height/2){
			this.player.y += this.rectY;
			if(this.player.y < config.height/2 + 50 && this.rectY > 0){
			 	this.gameDownObsticles(this.rectY);
			}
		}else if (this.player.y <= config.height/2 && this.rectY > 0){
			this.player.y += this.rectY;
		 	this.gameDownObsticles(this.rectY);
		}else{
		    this.gameDownObsticles(-this.rectY);
		}
		//Player direction
		if (this.rectX > 0) {
			this.rectX -= 1;
		}else if(this.rectX < 0){
			this.rectX += 1;
		}
		if (this.rectY < 4 && (this.counter < this.maxCounerValue/2 || 
								   this.counter > 0 - this.maxCounerValue/2)){
			this.rectY += 3;
		}
		//Movement
		if(this.counter > 0 && this.counter < this.maxCounerValue/2){
			this.rectX = this.xStep;
		   this.rectY = this.yStep;
		   this.playerRotation = 2;
		   this.counter += 1;
		}else if(this.counter > 0 && this.counter < this.maxCounerValue){
			this.rectX = this.xStep;
			this.playerRotation = 2;
		   this.counter += 1;
		}else if(this.counter < 0 && 
				 this.counter > (this.maxCounerValue - (this.maxCounerValue * 2))/2){
			this.rectX = -this.xStep;
		   this.rectY = this.yStep;
		   this.playerRotation = -2;
		   this.counter -= 1;
		}else if(this.counter < 0 && 
				 this.counter > (this.maxCounerValue - (this.maxCounerValue * 2))){
			this.rectX = -this.xStep;
			this.playerRotation = -2;
		   this.counter -= 1;
		}else{
			this.counter = 0;
		}
	}
	rectangleLoop(){
		if(this.firstRect[0].y > config.height){
			this.firstRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
			this.firstRect[0].y = this.secondRect[0].y - 400;
			this.firstRect[1].y = this.secondRect[0].y - 400;
			this.firstRect[0].x = Math.floor(Math.random() * (this.MAX - this.MIN) + this.MIN);
			this.firstRect[1].x = this.firstRect[0].x + this.firstRect[0].width + this.spaceBetween;
			this.firstScored = 0;
		}else if(this.thirdRect[0].y > config.height){
			this.thirdRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
			this.thirdRect[0].y = this.firstRect[0].y - 400;
			this.thirdRect[1].y = this.firstRect[0].y - 400;
			this.thirdRect[0].x = Math.floor(Math.random() * (this.MAX - this.MIN) + this.MIN);
			this.thirdRect[1].x = this.thirdRect[0].x + this.thirdRect[0].width + this.spaceBetween;
			this.thirdScored = 0;
		}else if(this.secondRect[0].y > config.height){
			this.secondRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
			this.secondRect[0].y = this.thirdRect[0].y - 400;
			this.secondRect[1].y = this.thirdRect[0].y - 400;
			this.secondRect[0].x = Math.floor(Math.random() * (this.MAX - this.MIN) + this.MIN);
			this.secondRect[1].x = this.secondRect[0].x + this.secondRect[0].width + this.spaceBetween;
			this.secondScored = 0;
		}
	}
	create(){
		//Creating player, setting display size and interactive
		this.player = this.add.rectangle(config.width / 2,(config.height / 2)+100,16,16, 0x000000);
		this.playerRotation = 0;
		this.spaceBetween = config.width / 100 * 30;
		this.obsticleHeight = 40;
		this.minVisibleObsticle = 30;
		this.MAX = (config.width/2) - this.spaceBetween - this.minVisibleObsticle;
		this.MIN = this.minVisibleObsticle - (config.width/2);
		//Rectangle coordinates
		this.rectY = 1;
		this.rectX = 0;
		this.counter = 0;
		this.maxCounerValue = 30;
		this.xStep = 5;
		this.yStep = -8;
		//Rectangle config
		this.firstRect = [this.add.rectangle(
											Math.floor(
												Math.random() * (this.MAX - this.MIN) + this.MIN),215,
												config.width,this.obsticleHeight,0x000000 
												), 
						this.add.rectangle(550,215,config.width,this.obsticleHeight,0x000000),0x000000];
		this.firstRect[1].x = this.firstRect[0].x + this.firstRect[0].width + this.spaceBetween;
		this.thirdRect = [this.add.rectangle(
											Math.floor(
												Math.random() * (this.MAX - this.MIN) + this.MIN),-185,
												config.width,this.obsticleHeight,0x000000 
												), 
						this.add.rectangle(550,-185,config.width,this.obsticleHeight,0x000000),0x000000];
		this.thirdRect[1].x = this.thirdRect[0].x + this.thirdRect[0].width + this.spaceBetween;
		this.secondRect = [this.add.rectangle(
											Math.floor(
												Math.random() * (this.MAX - this.MIN) + this.MIN),-585,
												config.width,this.obsticleHeight,0x000000 
												), 
						  this.add.rectangle(550,-585,config.width,this.obsticleHeight,0x000000), 0x000000];
		this.secondRect[1].x = this.secondRect[0].x + this.secondRect[0].width + this.spaceBetween;
		//Graphics config
		this.colorArr = [0x0D71FD,0x1A841A,0xAF1A12,0x5ca858,0xd16b11,0x0035f5,0xf5ff3d];
		this.graphics = this.add.graphics();
		this.firstRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
		this.thirdRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
		this.secondRect[2] = this.colorArr[this.colorArr.length * Math.random() | 0];
		
		//Score config
		this.score = 0;
		this.scoreText = this.add.text(10, 50, 'score: 0', { fontSize: '24px', fill: '#000' });
		this.scoreText.setText('Score: ' + this.score);

		//Flags to notice if rectangles > 750 to score		
		this.firstScored = 0;
		this.secondScored = 0;
		this.thirdScored = 0;

		this.physics.add.existing(this.player);
		this.physics.add.existing(this.firstRect[0]);
		this.physics.add.existing(this.firstRect[1]);
		this.physics.add.existing(this.secondRect[0]);
		this.physics.add.existing(this.secondRect[1]);
		this.physics.add.existing(this.thirdRect[0]);
		this.physics.add.existing(this.thirdRect[1]);
	}

	update(){
		//Clearing graphics data 
		this.graphics.clear();
		//Collapse
		if( this.physics.collide(this.player, this.firstRect[0]) || 
			this.physics.collide(this.player, this.firstRect[1]) ||
			this.physics.collide(this.player, this.secondRect[0]) ||
			this.physics.collide(this.player, this.secondRect[1]) ||
			this.physics.collide(this.player, this.thirdRect[0]) ||
			this.physics.collide(this.player, this.thirdRect[1])){
			this.gameOverCollaps();
		}
		this.player.angle += this.playerRotation;

		//Movement
		this.playerMovement();

		//Fill 
		this.fillObsticles();
		
		//Check scored
		this.gameScore();

		//Rectangle Loop
		this.rectangleLoop();

		//Player movement action
		this.input.on('pointerdown', (pointer) =>{
			if(pointer.x > config.width / 2){
				this.counter = 1;
			}else {
				this.counter = -1;
			}
 		});
		 
		// End game 
		if (this.player.y > config.height){
			if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
				localStorage.setItem("makeItHighScore", this.score);
			}
			this.scene.start('gameOver');
		}
	}
}
