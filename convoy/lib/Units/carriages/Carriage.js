function Carriage(scene,layer){

	Unit.call(this,scene,layer);

	//functional data
	this.name = 'Carriage';
	this.fireRate = 100;
	this.hp = 100;
	this.upgradeLevel = 1;
	this.cost = 200;
	this.level = 1;
	this.population = 0;

	//To impliment by child object
	this.create = function(){}
	this.updateLvl = function(lvl){}

	//Take damage
	this.hit = function(dmg){
		this.hp -= dmg;
		if(this.hp <= 0){
			//remove missile from our array
			this.destroy();
			engine.convoy.remove(this);
			//engine.badguys.splice(engine.badguys.indexOf(this),1);
			//controls.fund(this.win);
		}
		
	}	

	this.getRange = function(){
		return (typeof this.missile[this.level] != 'undefined') ? this.missile[this.level].range : 0;
	}

	this.reTarget = function(unit){
		if(getDistance(this, unit) < this.getRange()) this.target = unit;
	}

	this.findTarget = function(range){
		//If current target is 0
		if(this.target == null || this.target.hp <1 || getDistance(this, this.target) > range){
			//console.log("select new");
			if(engine.badguys.length > 0){
				this.target = engine.badguys[Math.floor(Math.random()*engine.badguys.length)];
				if(getDistance(this, this.target) > range) this.target = null;
			}else{
				this.target = null;
			}
		}
		
	}

	this.upgrade = function(){
		this.level++;

		var lvl = this.levels[this.level];
		if(typeof lvl == "undefined"){
			console.log("no level found?!");
		} else{
			var oldmax = this.maxhp;
			var oldpop = this.population;
			//update attrs
			for (var i in lvl) {
				this[i] = lvl[i];
			}
			//update hp
			var diff = this.maxhp/oldmax;
			this.hp = Math.floor(this.hp*diff);
			//Update total pop level
			controls.updatePopulation(this.population-oldpop); 

			this.updateLvl(this.level);
		}

	}

}	
Carriage.prototype = new Unit();