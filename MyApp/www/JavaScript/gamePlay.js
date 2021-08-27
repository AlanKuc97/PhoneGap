class GamePlay extends Phaser.Scene{
	constructor(){
		super({key : 'gamePlay'});
	}
	preload(){
	}
	gameOverCollaps(rectY, playerY){
		if (rectY <= playerY){
			if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
				localStorage.setItem("makeItHighScore", GamePlay.score);
			}
			this.scene.start('gameOver');
		}
	}
	gameScore(){
		if(GamePlay.redRect[0].y > config.height/2 && GamePlay.redScored == 0){
			GamePlay.redScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}else if(GamePlay.blueRect[0].y > config.height/2 && GamePlay.blueScored == 0){
			GamePlay.blueScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}else if(GamePlay.greenRect[0].y > config.height/2 && GamePlay.greenScored == 0){
			GamePlay.greenScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}
	}
	gameDownObsticles(rectY){
		GamePlay.redRect[0].y += rectY;
		GamePlay.redRect[1].y += rectY;
		GamePlay.blueRect[0].y += rectY;
		GamePlay.blueRect[1].y += rectY ;
		GamePlay.greenRect[0].y += rectY;
		GamePlay.greenRect[1].y += rectY;
	}

	create(){
		//Creating player, setting display size and interactive
		//GamePlay.player = new Phaser.Geom.Rectangle(config.width / 2,(config.height / 2)+100,16,16);
		GamePlay.player = this.add.rectangle(config.width / 2,(config.height / 2)+100,16,16, 0x000000);
		GamePlay.playerRotation = 0;
		GamePlay.spaceBetween = config.width / 100 * 30;
		GamePlay.obsticleHeight = 40;
		GamePlay.minVisibleObsticle = 10;
		GamePlay.MAX = 0 - GamePlay.spaceBetween - GamePlay.minVisibleObsticle;
		GamePlay.MIN = GamePlay.minVisibleObsticle - config.width;
		//Rectangle coordinates
		GamePlay.rectY = 1;
		GamePlay.rectX = 0;
		GamePlay.counter = 0;
		GamePlay.maxCounerValue = 30;
		GamePlay.xStep = 5;
		GamePlay.yStep = -8;
		//Rectangle config
		GamePlay.redRect = [new Phaser.Geom.Rectangle(
											Math.floor(
												Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN,215,
												config.width,GamePlay.obsticleHeight 
												), 
						new Phaser.Geom.Rectangle(550,215,config.width,GamePlay.obsticleHeight)];
		GamePlay.redRect[1].x = GamePlay.redRect[0].x + GamePlay.redRect[0].width + GamePlay.spaceBetween;
		GamePlay.blueRect = [new Phaser.Geom.Rectangle(
											Math.floor(
												Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN,-185,
												config.width,GamePlay.obsticleHeight 
												), 
						new Phaser.Geom.Rectangle(550,-185,config.width,GamePlay.obsticleHeight)];
		GamePlay.blueRect[1].x = GamePlay.blueRect[0].x + GamePlay.blueRect[0].width + GamePlay.spaceBetween;
		GamePlay.greenRect = [new Phaser.Geom.Rectangle(
											Math.floor(
												Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN,-585,
												config.width,GamePlay.obsticleHeight 
												), 
						  new Phaser.Geom.Rectangle(550,-585,config.width,GamePlay.obsticleHeight)];
		GamePlay.greenRect[1].x = GamePlay.greenRect[0].x + GamePlay.greenRect[0].width + GamePlay.spaceBetween;
		//Graphics config
		GamePlay.graphics = this.add.graphics({fillStyle: { color: 0xAF1A12} });
		//GamePlay.graphics.fillRectShape(GamePlay.redRect[0]);
		//GamePlay.graphics.fillRectShape(GamePlay.redRect[1]);
		
		//Score config
		GamePlay.score = 0;
		GamePlay.scoreText = this.add.text(10, 50, 'score: 0', { fontSize: '24px', fill: '#000' });
		GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		//Flags to notice if rectangles > 750 to score		
		GamePlay.redScored = 0;
		GamePlay.blueScored = 0;
		GamePlay.greenScored = 0;

	}

	update(){
		GamePlay.player.angle += GamePlay.playerRotation;
		//Clearing graphics data 
		GamePlay.graphics.clear();
		//Player movement X coordinate
		if(GamePlay.player.x > 0 && GamePlay.player.x < config.width){
			GamePlay.player.x += GamePlay.rectX;
		}else if(GamePlay.player.x >= config.width && GamePlay.rectX < 0){
			GamePlay.player.x += GamePlay.rectX;
		}else if(GamePlay.player.x <= 0 && GamePlay.rectX > 0){
			GamePlay.player.x += GamePlay.rectX;a
		}
		//Player movement Y coordinate
		if (GamePlay.player.y > config.height/2){
			GamePlay.player.y += GamePlay.rectY;
			if(GamePlay.player.y < config.height/2 + 50 && GamePlay.rectY > 0){
			 	this.gameDownObsticles(GamePlay.rectY);
			}
		}else if (GamePlay.player.y <= config.height/2 && GamePlay.rectY > 0){
			GamePlay.player.y += GamePlay.rectY;
		 	this.gameDownObsticles(GamePlay.rectY);
		}else{
		    this.gameDownObsticles(-GamePlay.rectY);
		}
		//Player direction
		if (GamePlay.rectX > 0) {
			GamePlay.rectX -= 1;
		}else if(GamePlay.rectX < 0){
			GamePlay.rectX += 1;
		}
		if (GamePlay.rectY < 4 && (GamePlay.counter < GamePlay.maxCounerValue/2 || 
								   GamePlay.counter > 0 - GamePlay.maxCounerValue/2)){
			GamePlay.rectY += 3;
		}
		//Fill
		GamePlay.graphics.fillRectShape(GamePlay.redRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.redRect[1]);
		GamePlay.graphics.fillStyle(0x0D71FD); 
		GamePlay.graphics.fillRectShape(GamePlay.blueRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.blueRect[1]);
		GamePlay.graphics.fillStyle(0x1A841A);
		GamePlay.graphics.fillRectShape(GamePlay.greenRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.greenRect[1]);
		
		//Check scored
		this.gameScore();

		//Rectangle Loop
		if(GamePlay.redRect[0].y > config.height){
			GamePlay.redRect[0].y = GamePlay.greenRect[0].y - 400;
			GamePlay.redRect[1].y = GamePlay.greenRect[0].y - 400;
			GamePlay.redRect[0].x = Math.floor(Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN;
			GamePlay.redRect[1].x = GamePlay.redRect[0].x + GamePlay.redRect[0].width + GamePlay.spaceBetween;
			GamePlay.redScored = 0;
		}else if(GamePlay.blueRect[0].y > config.height){
			GamePlay.blueRect[0].y = GamePlay.redRect[0].y - 400;
			GamePlay.blueRect[1].y = GamePlay.redRect[0].y - 400;
			GamePlay.blueRect[0].x = Math.floor(Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN;
			GamePlay.blueRect[1].x = GamePlay.blueRect[0].x + GamePlay.blueRect[0].width + GamePlay.spaceBetween;
			GamePlay.blueScored = 0;
		}else if(GamePlay.greenRect[0].y > config.height){
			GamePlay.greenRect[0].y = GamePlay.blueRect[0].y - 400;
			GamePlay.greenRect[1].y = GamePlay.blueRect[0].y - 400;
			GamePlay.greenRect[0].x = Math.floor(Math.random() * (GamePlay.MAX - GamePlay.MIN)) + GamePlay.MIN;
			GamePlay.greenRect[1].x = GamePlay.greenRect[0].x + GamePlay.greenRect[0].width + GamePlay.spaceBetween;
			GamePlay.greenScored = 0;
		}


		//Left Rectangle collapse
		if(GamePlay.player.y <= GamePlay.redRect[0].y+GamePlay.redRect[0].height+5 &&
			GamePlay.player.x <= GamePlay.redRect[0].x + GamePlay.redRect[0].width){
			this.gameOverCollaps(GamePlay.redRect[0].y,GamePlay.player.y);
		}
		if(GamePlay.player.y <= GamePlay.blueRect[0].y+GamePlay.blueRect[0].height+5 && 
			GamePlay.player.x <= GamePlay.blueRect[0].x + GamePlay.blueRect[0].width){
			this.gameOverCollaps(GamePlay.blueRect[0].y,GamePlay.player.y);
		}
		if(GamePlay.player.y <= GamePlay.greenRect[0].y+GamePlay.greenRect[0].height +5&& 
			GamePlay.player.x <= GamePlay.greenRect[0].x + GamePlay.greenRect[0].width){
			this.gameOverCollaps(GamePlay.greenRect[0].y,GamePlay.player.y);
		}
		//Right Rectangle collapse
		if(GamePlay.player.y <= GamePlay.redRect[1].y+GamePlay.redRect[1].height +5&& 
			GamePlay.player.x >= GamePlay.redRect[1].x){
			this.gameOverCollaps(GamePlay.redRect[1].y,GamePlay.player.y);
		}
		if(GamePlay.player.y <= GamePlay.blueRect[1].y+GamePlay.blueRect[1].height +5&& 
			GamePlay.player.x >= GamePlay.blueRect[1].x){
			this.gameOverCollaps(GamePlay.blueRect[1].y,GamePlay.player.y);
		}
		if(GamePlay.player.y <= GamePlay.greenRect[1].y+GamePlay.greenRect[1].height +5&& 
			GamePlay.player.x >= GamePlay.greenRect[1].x){
			this.gameOverCollaps(GamePlay.greenRect[1].y,GamePlay.player.y);
		}
		// End game 
		if (GamePlay.player.y > config.height){
			if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
				localStorage.setItem("makeItHighScore", GamePlay.score);
			}
			this.scene.start('gameOver');
		}
		//Player movement action
		this.input.on('pointerdown', function(pointer){
			if(pointer.x > config.width / 2){
				GamePlay.counter = 1;
			}else {
				GamePlay.counter = -1;
			}
 		});
 		//Movement
 		if(GamePlay.counter > 0 && GamePlay.counter < GamePlay.maxCounerValue/2){
 			GamePlay.rectX = GamePlay.xStep;
			GamePlay.rectY = GamePlay.yStep;
			GamePlay.playerRotation = 2;
			GamePlay.counter += 1;
 		}else if(GamePlay.counter > 0 && GamePlay.counter < GamePlay.maxCounerValue){
 			GamePlay.rectX = GamePlay.xStep;
 			GamePlay.playerRotation = 2;
			GamePlay.counter += 1;
 		}else if(GamePlay.counter < 0 && 
 				 GamePlay.counter > (GamePlay.maxCounerValue - (GamePlay.maxCounerValue * 2))/2){
 			GamePlay.rectX = -GamePlay.xStep;
			GamePlay.rectY = GamePlay.yStep;
			GamePlay.playerRotation = -2;
			GamePlay.counter -= 1;
 		}else if(GamePlay.counter < 0 && 
 				 GamePlay.counter > (GamePlay.maxCounerValue - (GamePlay.maxCounerValue * 2))){
 			GamePlay.rectX = -GamePlay.xStep;
 			GamePlay.playerRotation = -2;
			GamePlay.counter -= 1;
 		}else{
 			GamePlay.counter = 0;
 		}
	}

}
