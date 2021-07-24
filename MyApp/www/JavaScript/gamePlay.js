class GamePlay extends Phaser.Scene{
	constructor(){
		super({key : 'gamePlay'});
	}
	preload(){
		this.load.image('player','PNG/player.png');
		//this.load.image('columnBlue','PNG/column_blue.png');
		//this.load.image('columnGreen','PNG/column_green.png');
		//this.load.image('columnPurple','PNG/column_purple.png');
		//this.load.image('columnRed','PNG/column_red.png');
		//this.load.image('columnYellow','PNG/column_yellow.png');
		//this.load.image('arrow','PNG/arrow.png');
	}
	
	create(){
		//Creating player, setting display size and interactive
		this.player = this.add.sprite(375,750,'player').setInteractive();
		this.player.setDisplaySize(16,16);
		//Rectangle coordinates
		this.rectY = 1;
		this.rectX = 0;
		//Rectangle config
		this.redRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,215,500,50), 
						new Phaser.Geom.Rectangle(550,215,550,50)];
		this.redRect[1].x = this.redRect[0].x + this.redRect[0].width + 150;
		this.blueRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,-185,500,50), 
						new Phaser.Geom.Rectangle(550,-185,550,50)];
		this.blueRect[1].x = this.blueRect[0].x + this.blueRect[0].width + 150;
		this.greenRect = [new Phaser.Geom.Rectangle(Math.floor(Math.random() * (-100 - -400)) + -400,-585,500,50), 
						  new Phaser.Geom.Rectangle(550,-585,550,50)];
		this.greenRect[1].x = this.greenRect[0].x + this.greenRect[0].width + 150;
		//Graphics config
		this.graphics = this.add.graphics({fillStyle: { color: 0xff0000} });
		this.graphics.fillRectShape(this.redRect[0]);
		this.graphics.fillRectShape(this.redRect[1]);
		//Score config
		this.score = 0;
		this.scoreText = this.add.text(200, 300, 'score: 0', { fontSize: '32px', fill: '#000' });
		this.scoreText.setText('Score: ' + this.score);
		//Flags to notice if rectangles > 750 to score		
		this.redScored = 0;
		this.blueScored = 0;
		this.greenScored = 0;
	}
	update(){
		//Clearing graphics data 
		this.graphics.clear();
		//Player movement
		this.player.x += this.rectX;
		if (this.player.y >= 550){
			this.player.y += this.rectY;
		}else if (this.player.y < 550 && this.rectY > 0){
			this.player.y += this.rectY;
		}
		//Player direction
		if (this.rectX > 0) {
			this.rectX -= 1;
		}else if(this.rectX < 0){
			this.rectX += 1;
		}
		if (this.rectY < 1){
			this.rectY += 1;
		}
		//Y coordinates
		//this.redRect[0].y += this.rectY;
		//this.redRect[1].y += this.rectY;
		//this.blueRect[0].y += this.rectY;
		//this.blueRect[1].y += this.rectY;
		//this.greenRect[0].y += this.rectY;
		//this.greenRect[1].y += this.rectY;
		//Fill
		this.graphics.fillRectShape(this.redRect[0]);
		this.graphics.fillRectShape(this.redRect[1]);
		this.graphics.fillStyle(0x0000ff); 
		this.graphics.fillRectShape(this.blueRect[0]);
		this.graphics.fillRectShape(this.blueRect[1]);
		this.graphics.fillStyle(0x00ff00);
		this.graphics.fillRectShape(this.greenRect[0]);
		this.graphics.fillRectShape(this.greenRect[1]);
		//Score counting and speed increasing
		if(this.redRect[0].y > 750 && this.redScored == 0){
			this.redScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
			console.log(this.score);
			//Increasing speed
			//if(this.rectY <12){
			//	this.rectY +=2;
			//}
		}else if(this.blueRect[0].y > 750 && this.blueScored == 0){
			this.blueScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
			console.log(this.score);
			//Increasing speed
			//if(this.rectY <12){
			//	this.rectY +=2;
			//}
		}else if(this.greenRect[0].y > 750 && this.greenScored == 0){
			this.greenScored = 1;
			this.score += 10;
			this.scoreText.setText('Score: ' + this.score);
			console.log(this.score);
			//Increasing speed
			//if(this.rectY <12){
			//	this.rectY +=2;
			//}
		}
		//Rectangle Loop
		if(this.redRect[0].y > 1100){
			this.redRect[0].y = this.greenRect[0].y - 400;
			this.redRect[1].y = this.greenRect[0].y - 400;
			this.redRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			this.redRect[1].x = this.redRect[0].x + this.redRect[0].width + 150;
			this.redScored = 0;
		}else if(this.blueRect[0].y > 1100){
			this.blueRect[0].y = this.redRect[0].y - 400;
			this.blueRect[1].y = this.redRect[0].y - 400;
			this.blueRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			this.blueRect[1].x = this.blueRect[0].x + this.blueRect[0].width + 150;
			this.blueScored = 0;
		}else if(this.greenRect[0].y > 1100){
			this.greenRect[0].y = this.blueRect[0].y - 400;
			this.greenRect[1].y = this.blueRect[0].y - 400;
			this.greenRect[0].x = Math.floor(Math.random() * (-100 - -400)) + -400;
			this.greenRect[1].x = this.greenRect[0].x + this.greenRect[0].width + 150;
			this.greenScored = 0;
		}
		//Left Rectangle collapse
		if(this.player.y <= this.redRect[0].y+this.redRect[0].height && this.player.x <= this.redRect[0].x + this.redRect[0].width){
			if (this.redRect[0].y <= this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(this.player.y <= this.blueRect[0].y+this.blueRect[0].height && this.player.x <= this.blueRect[0].x + this.blueRect[0].width){
			if (this.blueRect[0].y <= this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(this.player.y <= this.greenRect[0].y+this.greenRect[0].height && this.player.x <= this.greenRect[0].x + this.greenRect[0].width){
			if (this.greenRect[0].y <= this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		//Right Rectangle collapse
		if(this.player.y <= this.redRect[1].y+this.redRect[1].height && this.player.x >= this.redRect[1].x){
			if (this.redRect[1].y <= this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(this.player.y <= this.blueRect[1].y+this.blueRect[1].height && this.player.x >= this.blueRect[1].x){
			if (this.blueRect[1].y <= this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		if(this.player.y <= this.greenRect[1].y+this.greenRect[1].height && this.player.x >= this.greenRect[1].x){
			if (this.greenRect[1].y < this.player.y){
				if(this.score > parseInt(localStorage.getItem("makeItHighScore"))){
					localStorage.setItem("makeItHighScore", this.score);
				}
				this.scene.start('gameOver');
			}
		}
		
		
		//console.log(this.rectY );
		//Making player follow the mouse/touch pointer
		if(this.input.activePointer.isDown && this.input.activePointer.x > 750 / 2){ 
			//this.rectX = 3;
			this.rectY = -5;
		}else if(this.input.activePointer.isDown && this.input.activePointer.x < 750 / 2){
			//this.rectX = -3;
			this.rectY = -5;
		}
		
	}
}
