var config = {
	type: Phaser.AUTO,
	width:window.innerWidth,
	height:window.innerHeight,//1334,
	backgroundColor: '#FFFFFF',
	scene:[MainMenu,GamePlay,GameOver]
};

var game = new Phaser.Game(config);
