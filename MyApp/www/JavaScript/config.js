var config = {
	type: Phaser.AUTO,
	width:750,
	height:1334,
	backgroundColor: '#FFFFFF',
	scene:[MainMenu,GamePlay,GameOver]
};

var game = new Phaser.Game(config);
