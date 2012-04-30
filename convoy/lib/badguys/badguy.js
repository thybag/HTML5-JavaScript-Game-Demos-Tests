function BadGuy(scene,layer){

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
	//functional data
	this.hp = 50;
	this.win = 50;
	this.fireRate = 150;
	//Componets
	this.sprite = null;

	this.hit = function(dmg){
		this.hp -= dmg;
		if(this.hp < 0){
			//remove missile from our array
			this.sprite.remove();
			engine.badguys.splice(engine.badguys.indexOf(this),1);
			controls.fund(this.win);

		}

	}

	this.fire = function(target, missileType){
		if((engine.ticker.currentTick % this.fireRate) == 0) engine.addMissile(target,missileType);
	}

	this.findTarget = function(spr){
		if(engine.convoy.carrages.length > 0){
			return engine.convoy.carrages[Math.floor(Math.random()*engine.convoy.carrages.length)];
		}else{
			return null;
		}
	}


	this.create = function(x,y){
		this.x = x;
		this.y = y;
 		this.sprite = this.scene.Sprite(this.img,{
			"layer": this.layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h 	//height of sprite.
		});
	}
	this.position = function(x,y){
		this.sprite.position(x,y);
	}
	this.scale = function(sca){}
	this.destroy = function(){
		this.sprite.remove();;
	}

	this.update = function(){
		this.run();
		this.sprite.position(this.x,this.y);
		this.sprite.update();
	}

	this.run = function(){
		//move/think code
	}

}