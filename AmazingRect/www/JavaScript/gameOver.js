class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameOver'});
	}
	preload(){
		this.load.image('over','PNG/gameOver.png');
	}
	create(){
		this.over = this.add.sprite(config.width/2,config.height/2,'over')
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.start('mainMenu');
			});
		this.over.setScale(0.5);
		if(((Math.floor(Math.random() * 10) + 1) % 3) === 0){
			let interstitial;
			document.addEventListener('deviceready', async () => {
				interstitial = new admob.InterstitialAd({
					adUnitId: 'ca-app-pub-6536582897404038/5509722293',
					autoShow:true
				});

				interstitial.on('load', (evt) => {});
				await interstitial.load();
				await interstitial.show();
			}, false);
		}
		
	}
	update(){
		
	}
}
