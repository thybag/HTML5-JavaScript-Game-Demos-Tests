function BadGuy(scene,layer){

	//Setup basics
	Unit.call(this,scene,layer);

	//functional data
	this.hp = 50;
	this.win = 50;
	this.fireRate = 150;
	this.target = null;

	this.hit = function(dmg){
		this.hp -= dmg;
		if(this.hp < 1){
			//remove missile from our array
			this.destroy();
			engine.badguys.splice(engine.badguys.indexOf(this),1);
			controls.fund(this.win);
		}
	}


	this.findTarget = function(range){

		if(this.target == null || this.target.hp <1 || getDistance(this, this.target) > range){
			if(engine.convoy.carrages.length > 0){
				this.target = engine.convoy.carrages[Math.floor(Math.random()*engine.convoy.carrages.length)];
				if(getDistance(this, this.target) > range) this.target = null;
			}else{
				this.target = null;
			}
		}
	}

	this.makeTarget = function(){
		this.select();
		engine.convoy.reTarget(this);
		
	}

	this.select = function(){
		var s = this.sprites[0].dom;

		s.style.border = 'dotted 1px red';

		setTimeout(function(){ s.style.border='' },200);
	}


	this.create = function(x,y){}

}
BadGuy.prototype = new Unit();