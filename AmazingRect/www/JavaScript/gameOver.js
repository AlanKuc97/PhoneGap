class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameOver'});
	}
	preload(){
		this.load.image('over','PNG/gameOver.png');
	}
	create(){
		this.over = this.add.sprite(config.width/2,config.height/2,'over');
		this.over.setScale(0.3);
		this.input.once('pointerdown', function (event) {
            this.scene.start('mainMenu');
        }, this);

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
	update(){
		
	}
}
