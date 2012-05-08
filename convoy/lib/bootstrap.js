//Bootstap Game
var controls;
var bootstrap = function(){

	//Create new Sprite.js Scene (effectively the Canvas that sprite js draws on to)
	var scene = sjs.Scene({'useWebGL':false ,'w': window.innerWidth, 'h': 450});
	var layer = scene.Layer("world");
	var overlay = scene.Layer("overlay");
	
	//Load images needed to display
	scene.loadImages([
		//convoy base
		'assets/convoy/base_1.png',
		'assets/convoy/tracks_1.png',
		//accom
		'assets/convoy/accommodation_1.png',
		'assets/convoy/accommodation_2.png',
		'assets/convoy/accommodation_3.png',
		//cannon
		'assets/convoy/cannon_1.png',
		'assets/convoy/cannon_2.png',
		'assets/convoy/cannon_3.png',
		//turret
		'assets/convoy/turret_1.png',
		'assets/convoy/turret_2.png',
		'assets/convoy/turret_3.png',

		//general
		'assets/general/exp_smaller.png',
		'assets/general/exp2_0.png',
		'assets/general/fix.png',
		'assets/general/upgrade.png'
		//'slug.png',
		//'missile.png',
		 ], 
	 function() {
			//Create instance of Engine (class i'm using to run the game)
			engine = new Engine(scene, layer);
			//Setup game loop via Sprite.js's ticker (calls engine's run method)
			ticker = scene.Ticker(function() { engine.run(); });
			//Pass ticker to engine
			engine.setTicker(ticker);
			controls = new Controls(engine, overlay);
			engine.init();
			//Start the ticker
			ticker.run();
		});
}
//Bootstap Game (when page is loaded)
window.addEventListener("load", bootstrap, false);