class GamePlay extends Phaser.Scene{
	constructor(){
		super({key : 'gamePlay'});
	}
	preload(){
		this.load.image('player','PNG/player.png');
		//GamePlay.load.image('columnBlue','PNG/column_blue.png');
		//GamePlay.load.image('columnGreen','PNG/column_green.png');
		//GamePlay.load.image('columnPurple','PNG/column_purple.png');
		//GamePlay.load.image('columnRed','PNG/column_red.png');
		//GamePlay.load.image('columnYellow','PNG/column_yellow.png');
		//GamePlay.load.image('arrow','PNG/arrow.png');
	}
	
	create(){
		//Creating player, setting display size and interactive
		GamePlay.player = this.add.sprite(375,750,'player').setInteractive();
		GamePlay.player.setDisplaySize(16,16);
		//Rectangle coordinates
		GamePlay.rectY = 1;
		GamePlay.rectX = 0;
		//Rectangle config
		GamePlay.redRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,215,500,50), 
						new Phaser.Geom.Rectangle(550,215,550,50)];
		GamePlay.redRect[1].x = GamePlay.redRect[0].x + GamePlay.redRect[0].width + 150;
		GamePlay.blueRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,-185,500,50), 
						new Phaser.Geom.Rectangle(550,-185,550,50)];
		GamePlay.blueRect[1].x = GamePlay.blueRect[0].x + GamePlay.blueRect[0].width + 150;
		GamePlay.greenRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,-585,500,50), 
						  new Phaser.Geom.Rectangle(550,-585,550,50)];
		GamePlay.greenRect[1].x = GamePlay.greenRect[0].x + GamePlay.greenRect[0].width + 150;
		//Graphics config
		GamePlay.graphics = this.add.graphics({fillStyle: { color: 0xff0000} });
		GamePlay.graphics.fillRectShape(GamePlay.redRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.redRect[1]);
		//Score config
		GamePlay.score = 0;
		GamePlay.scoreText = this.add.text(200, 300, 'score: 0', { fontSize: '32px', fill: '#000' });
		GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		//Flags to notice if rectangles > 750 to score		
		GamePlay.redScored = 0;
		GamePlay.blueScored = 0;
		GamePlay.greenScored = 0;
	}
	update(){
		//Clearing graphics data 
		GamePlay.graphics.clear();
		//Player movement X coordinate
		if(GamePlay.player.x > 0 && GamePlay.player.x < 750){
			GamePlay.player.x += GamePlay.rectX;
		}else if(GamePlay.player.x >= 750 && GamePlay.rectX < 0){
			GamePlay.player.x += GamePlay.rectX;
		}else if(GamePlay.player.x <= 0 && GamePlay.rectX > 0){
			GamePlay.player.x += GamePlay.rectX;
		}
		//Player movement Y coordinate
		if (GamePlay.player.y > 550){
			GamePlay.player.y += GamePlay.rectY;
			if(GamePlay.player.y < 600 && GamePlay.rectY > 0){
				GamePlay.redRect[0].y += GamePlay.rectY;
				GamePlay.redRect[1].y += GamePlay.rectY;
				GamePlay.blueRect[0].y += GamePlay.rectY;
				GamePlay.blueRect[1].y += GamePlay.rectY ;
				GamePlay.greenRect[0].y += GamePlay.rectY;
			    GamePlay.greenRect[1].y += GamePlay.rectY;
			}
		}else if (GamePlay.player.y <= 550 && GamePlay.rectY > 0){
			GamePlay.player.y += GamePlay.rectY;
			GamePlay.redRect[0].y += GamePlay.rectY;
			GamePlay.redRect[1].y += GamePlay.rectY;
			GamePlay.blueRect[0].y += GamePlay.rectY;
			GamePlay.blueRect[1].y += GamePlay.rectY;
			GamePlay.greenRect[0].y += GamePlay.rectY;
		    GamePlay.greenRect[1].y += GamePlay.rectY;
		}else{
			GamePlay.redRect[0].y -= GamePlay.rectY;
			GamePlay.redRect[1].y -= GamePlay.rectY;
			GamePlay.blueRect[0].y -= GamePlay.rectY;
			GamePlay.blueRect[1].y -= GamePlay.rectY;
			GamePlay.greenRect[0].y -= GamePlay.rectY;
		    GamePlay.greenRect[1].y -= GamePlay.rectY;
		}
		//Player direction
		if (GamePlay.rectX > 0) {
			GamePlay.rectX -= 1;
		}else if(GamePlay.rectX < 0){
			GamePlay.rectX += 1;
		}
		if (GamePlay.rectY < 3){
			GamePlay.rectY += 1;
		}
		//Y coordinates
		//GamePlay.redRect[0].y += GamePlay.rectY;
		//GamePlay.redRect[1].y += GamePlay.rectY;
		//GamePlay.blueRect[0].y += GamePlay.rectY;
		//GamePlay.blueRect[1].y += GamePlay.rectY;
		//GamePlay.greenRect[0].y += GamePlay.rectY;
		//GamePlay.greenRect[1].y += GamePlay.rectY;
		//Fill
		GamePlay.graphics.fillRectShape(GamePlay.redRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.redRect[1]);
		GamePlay.graphics.fillStyle(0x0000ff); 
		GamePlay.graphics.fillRectShape(GamePlay.blueRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.blueRect[1]);
		GamePlay.graphics.fillStyle(0x00ff00);
		GamePlay.graphics.fillRectShape(GamePlay.greenRect[0]);
		GamePlay.graphics.fillRectShape(GamePlay.greenRect[1]);
		//Score counting and speed increasing
		if(GamePlay.redRect[0].y > 750 && GamePlay.redScored == 0){
			GamePlay.redScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}else if(GamePlay.blueRect[0].y > 750 && GamePlay.blueScored == 0){
			GamePlay.blueScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}else if(GamePlay.greenRect[0].y > 750 && GamePlay.greenScored == 0){
			GamePlay.greenScored = 1;
			GamePlay.score += 10;
			GamePlay.scoreText.setText('Score: ' + GamePlay.score);
		}


		//Rectangle Loop
		if(GamePlay.redRect[0].y > 1100){
			GamePlay.redRect[0].y = GamePlay.greenRect[0].y - 400;
			GamePlay.redRect[1].y = GamePlay.greenRect[0].y - 400;
			GamePlay.redRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			GamePlay.redRect[1].x = GamePlay.redRect[0].x + GamePlay.redRect[0].width + 150;
			GamePlay.redScored = 0;
		}else if(GamePlay.blueRect[0].y > 1100){
			GamePlay.blueRect[0].y = GamePlay.redRect[0].y - 400;
			GamePlay.blueRect[1].y = GamePlay.redRect[0].y - 400;
			GamePlay.blueRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			GamePlay.blueRect[1].x = GamePlay.blueRect[0].x + GamePlay.blueRect[0].width + 150;
			GamePlay.blueScored = 0;
		}else if(GamePlay.greenRect[0].y > 1100){
			GamePlay.greenRect[0].y = GamePlay.blueRect[0].y - 400;
			GamePlay.greenRect[1].y = GamePlay.blueRect[0].y - 400;
			GamePlay.greenRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			GamePlay.greenRect[1].x = GamePlay.greenRect[0].x + GamePlay.greenRect[0].width + 150;
			GamePlay.greenScored = 0;
		}


		//Left Rectangle collapse
		if(GamePlay.player.y <= GamePlay.redRect[0].y+GamePlay.redRect[0].height && GamePlay.player.x <= GamePlay.redRect[0].x + GamePlay.redRect[0].width){
			if (GamePlay.redRect[0].y <= GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(GamePlay.player.y <= GamePlay.blueRect[0].y+GamePlay.blueRect[0].height && GamePlay.player.x <= GamePlay.blueRect[0].x + GamePlay.blueRect[0].width){
			if (GamePlay.blueRect[0].y <= GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(GamePlay.player.y <= GamePlay.greenRect[0].y+GamePlay.greenRect[0].height && GamePlay.player.x <= GamePlay.greenRect[0].x + GamePlay.greenRect[0].width){
			if (GamePlay.greenRect[0].y <= GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}
		//Right Rectangle collapse
		if(GamePlay.player.y <= GamePlay.redRect[1].y+GamePlay.redRect[1].height && GamePlay.player.x >= GamePlay.redRect[1].x){
			if (GamePlay.redRect[1].y <= GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(GamePlay.player.y <= GamePlay.blueRect[1].y+GamePlay.blueRect[1].height && GamePlay.player.x >= GamePlay.blueRect[1].x){
			if (GamePlay.blueRect[1].y <= GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(GamePlay.player.y <= GamePlay.greenRect[1].y+GamePlay.greenRect[1].height && GamePlay.player.x >= GamePlay.greenRect[1].x){
			if (GamePlay.greenRect[1].y < GamePlay.player.y){
				if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", GamePlay.score);
				}
				this.scene.start('gameOver');
			}
		}


		// End game 
		if (GamePlay.player.y > 1100){
			if(GamePlay.score > parseInt(localStorage.getItem("makeItHighScore"))){
				localStorage.setItem("makeItHighScore", GamePlay.score);
			}
			this.scene.start('gameOver');
		}
		
		//console.log(GamePlay.rectY );
		//Making player follow the mouse/touch pointer
		// if(GamePlay.input.activePointer.isDown && GamePlay.input.activePointer.x > 750 / 2){ 
			
		// }else if(GamePlay.input.activePointer.isDown && GamePlay.input.activePointer.x < 750 / 2){
			
		// }
		this.input.on('pointerdown', function(pointer){
			
			if(pointer.x > 750 / 2){
				//console.log(GamePlay.rectX);
				GamePlay.rectX = 10;
				GamePlay.rectY = -15;
			}else {
				GamePlay.rectX = -10;
				GamePlay.rectY = -15;
			}
 		});
 		console.log('GamePlay: ' + GamePlay.rectX);
	}

}
