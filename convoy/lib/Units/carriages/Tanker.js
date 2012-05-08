function Tanker (scene,layer){//inherits carrage
	
	//Init parent
	Carriage.call(this,scene,layer);

	//Visual
	this.img = 'assets/convoy/tanker.png';
	this.w = 144;
	this.h = 74;
	//functional data
	this.name = 'Tanker';
	this.hp = 500;
	this.maxhp = this.hp;
	//Set pop
	this.population = 20;
 	controls.updatePopulation(this.population); 


	this.levels = [];
	this.levels[2] = {
		cost:600,
		name:"Medium Tanker",
	 	maxhp: 800,
	 	population:30
	 	//missile: this.missile_2
	};
	this.levels[3] = {
		cost: 1000,
		name:"Heavy Tanker",
	 	maxhp: 1400,
	 	population:50
		//missile: this.missile_3
	};


	
	this.create = function(x,y){
		this.x = x;
		this.y = y;
 		var  spr = scene.Sprite(this.img,{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h 	//height of sprite.
		});
 		this.sprites.push(spr);
	}

	this.onDestroy = function(){
 		alert("Game over!");
 	}




}
Tanker.prototype = new Carriage();
