function Unit(scene,layer){

	//Base values
	this.sprites = [];
	this.scene = scene;
	this.layer = layer;
	this.tickerOffset = 0;
	this.fireRate = 100;

	//Default Data
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.angle = 0;
	this.type = "rectangle";

	//Everything should have one of these
	this.run = function(){}
	this.onDestroy = function(){}
	this.hit = function(dmg){};

	//Basic Methods
	//Position
	this.position = function(x,y){

		var x_diff = this.x - x;
		var y_diff = this.y - y;

		this.sprites.forEach(function(spr){
			spr.position(spr.x-x_diff,spr.y-y_diff);
		});

		this.x = x;
		this.y = y;
	}

	//Destroy
	this.destroy = function(){

		this.explode();

		this.onDestroy();
		this.sprites.forEach(function(spr){
			spr.remove();
		});
	}

	//update
	this.update = function(){

		this.run();
		this.sprites.forEach(function(spr){
			spr.update();
		});
	}

	//Add sprite
	this.addSprite = function(sp){
		var  spr = this.scene.Sprite(sp.img,{
			"layer": this.layer, //Layer tanks will be displayed in.
			"x": sp.x, 	//X position of sprite
			"y": sp.y, 	//Y position of sprite
			"w": sp.w, 	//width of sprite.
			"h": sp.h 	//height of sprite.
		});
 		this.sprites.push(spr);
 		return spr;
	}

	//Helper Methods

	//Get aim Angle
	this.getAimAngle = function(spr, target){
		return Math.atan2(
				(target.y
				-spr.y),
				(target.x
				-spr.x)
			 );//+1.571
	}

	//Fire wepeaon
	this.fire = function(target, missileData){
		if(((this.tickerOffset + engine.ticker.currentTick) % this.fireRate) == 0){
			engine.addMissile(target, missileData);
		} 
	}

	//Init obj
	this.init = function(){
		this.tickerOffset = engine.ticker.currentTick;
	}

	this.explode = function(){
		var c=this.centre();
		engine.explosions.create(c.x,c.y);
		/*
		console.log("bnag!");
		var c = ;
		spr = this.scene.Sprite("assets/explosions/exp2_0.png",{
			"layer": this.layer, //Layer tanks will be displayed in.
			"x": c.x, 	//X position of sprite
			"y": c.y, 	//Y position of sprite
			"w": 64, 	//width of sprite.
			"h": 64 	//height of sprite.
		});
		spr.update();*/
	}

	this.centre = function(){
		x = Math.round(this.x+(this.w/2));
		y = Math.round(this.y+(this.h/2));
		return {"x":x,"y":y};
	}

	this.coinFlip = function(){
		return (Math.floor(Math.random()*2)==1);
	}

	//Init object
	if(typeof engine != "undefined") this.init();
}