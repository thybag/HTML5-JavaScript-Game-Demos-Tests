//Bootstap Game
var bootstrap = function(){

	//Create new Sprite.js Scene (effectively the Canvas that sprite js draws on to)
	var scene = sjs.Scene({'useWebGL':false ,'w': window.innerWidth, 'h': 450});
	var layer = scene.Layer("world");
	
	//Load images needed to display
	scene.loadImages([
		//'tank.png',
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
			controls = new Controls(engine);
			//Start the ticker
			ticker.run();
		});
}
//Bootstap Game (when page is loaded)
window.addEventListener("load", bootstrap, false);