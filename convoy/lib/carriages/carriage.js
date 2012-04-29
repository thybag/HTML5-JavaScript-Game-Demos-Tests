function Carriage(scene,layer){

	//Globals?
	this.scene = scene;
	this.layer = layer;

	//Visual data
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.angle = 0;
	this.img ='';
	this.type = "rectangle";

	this.fireRate = 100;
	//functional data
	this.hp = 100;
	this.upgradeLevel = 1;
	this.cost = 200;
	//Componets
	this.sprites = [];


	this.create = function(){


	}
	this.fire = function(target,missileType){

		if((engine.ticker.currentTick % this.fireRate) == 0) engine.addMissile(target,missileType);


	}
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

	this.getAimAngle = function(spr, target){
		return Math.atan2(
				(target.y
				-spr.y),
				(target.x
				-spr.x)
			 );//+1.571
	}
	this.findTarget = function(spr){
		if(engine.badguys.length > 0){
			return engine.badguys[Math.floor(Math.random()*engine.badguys.length)];
		}else{
			return null;
		}
	}
	this.position = function(x,y){
		/*	this.sprites.forEach(function(spr){
			spr.position(x,y);
			console.log(spr);
			});
		*/
	}
	this.scale = function(sca){
		/*this.sprites.forEach(function(spr){
			spr.scale(sca);
			spr.update();
			this.w = spr.w;
			this.h = spr.h;
		});	*/
	}
	this.destroy = function(){
		this.sprites.forEach(function(spr){
			spr.remove();
		});
	}

	this.update = function(){
		this.run();
		this.sprites.forEach(function(spr){
			spr.update();
		});
	}
	this.run = function(){}

}