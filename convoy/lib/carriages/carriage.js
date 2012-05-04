function Carriage(scene,layer){

	//Globals?
	this.scene = scene;
	this.layer = layer;
	
	//Componets
	this.sprites = [];
	//Visual data
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.angle = 0;
	this.img ='';
	this.type = "rectangle";

	//functional data
	this.name = 'Carriage';
	this.fireRate = 100;
	this.hp = 100;
	this.upgradeLevel = 1;
	this.cost = 200;
	this.ref_time = 0;
	this.level = 1;
	


	this.create = function(){


	}
	this.fire = function(target,missileType){
		if(((this.ref_time+engine.ticker.currentTick) % this.fireRate) == 0) engine.addMissile(target,missileType);
	}

	this.hit = function(dmg){
		this.hp -= dmg;
		if(this.hp <= 0){
			//remove missile from our array
			this.destroy();
			engine.convoy.remove(this);
			//engine.badguys.splice(engine.badguys.indexOf(this),1);
			//controls.fund(this.win);
			console.log("BOOM!");
		}
		
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
	this.findTarget = function(range){
		//If current target is 0
		if(this.target == null || this.target.hp <0 || getDistance(this, this.target) > range){
			//console.log("select new");
			if(engine.badguys.length > 0){
				this.target = engine.badguys[Math.floor(Math.random()*engine.badguys.length)];
				if(getDistance(this, this.target) > range) this.target = null;
			}else{
				this.target = null;
			}
		}
		
	}

	this.position = function(x,y){
		var x_diff = this.x - x;
		var y_diff = this.y - y;

		this.sprites.forEach(function(spr){
			spr.position(spr.x-x_diff,spr.y-y_diff);
		});

		this.x = x;
		this.y = y;
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
		this.onDestroy();
		this.sprites.forEach(function(spr){
			spr.remove();
		});
	}

	this.onDestroy = function(){}
	
	this.update = function(){
		this.run();
		this.sprites.forEach(function(spr){
			spr.update();
		});
	}
	this.run = function(){}


	this.upgrade = function(){
		this.level++;

		var lvl = this.levels[this.level];
		if(typeof lvl == "undefined"){
			console.log("no level found?!");
		} else{
			var oldmax = this.maxhp;
			//update attrs
			for (var i in lvl) {
				this[i] = lvl[i];
			}
			//update hp
			var diff = this.maxhp/oldmax;
			this.hp = this.hp*diff;

			this.updateUI(this.level);
		}

	}
	this.updateUI = function(lvl){}

}