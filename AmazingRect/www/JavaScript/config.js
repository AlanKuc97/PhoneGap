let config = {
	type: Phaser.AUTO,
	width:window.innerWidth,
	height:window.innerHeight,//1334,
	backgroundColor: '#FFFFFF',
	physics: {
		default: "arcade"
	},
	scene:[MainMenu,GamePlay,GameOver]
};

let game = new Phaser.Game(config);
