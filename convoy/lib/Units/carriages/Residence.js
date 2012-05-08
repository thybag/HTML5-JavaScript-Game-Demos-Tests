function Residence (scene,layer){//inherits carrage
	
	//Init parent
	Carriage.call(this,scene,layer);

	//functional
	this.name = 'Small Residence';
	this.hp = 200;
	this.maxhp = this.hp;
	this.cost = Residence.cost;
	this.population = 80;
	controls.updatePopulation(this.population);

	//Visual
	this.w = 128;
	this.h = 66;

	this.levels = [];
	this.levels[2] = {
		name: "Medium Residence",
		cost: 600,
		maxhp: 400,
		population:140
	}
	this.levels[3] = {
		name: "Large Residence",
		cost: 600,
		maxhp: 600,
		population:200
	}


	//Set pop
 	
	
 	this.onDestroy = function(){
 		controls.updatePopulation(-this.population);
 	}

	this.create = function(x,y){
		this.x = x;
		this.y = y+30;

		this.main = this.addSprite({
			img: "assets/convoy/accommodation_1.png",
			w: 128,
			h: 48,
			x: this.x+2,
			y: this.y-8
		});
		this.addSprite({
			img: "assets/convoy/tracks_1.png",
			w: 22,
			h: 12,
			x: this.x+14,
			y: this.y+32
		});
		this.addSprite({
			img: "assets/convoy/tracks_1.png",
			w: 22,
			h: 12,
			x: this.x+96,
			y: this.y+32
		});
	}

	this.updateLvl = function(lvl){

		this.sprites.splice(this.sprites.indexOf(this.main),1);

		//Remove old
		this.main.remove();
		delete this.main;
		//add new

		if(lvl==2){
			this.main = this.addSprite({
				img: "assets/convoy/accommodation_2.png",
				w: 128,
				h: 55,
				x: this.x+2,
				y: this.y-15
			});
		}else if(lvl == 3){
			this.main = this.addSprite({
				img: "assets/convoy/accommodation_3.png?dd2",
				w: 128,
				h: 63,
				x: this.x+2,
				y: this.y+33
			});

		}
		
		this.main.toBack();
	}




}
Residence.cost = 600;
Residence.prototype = new Carriage();