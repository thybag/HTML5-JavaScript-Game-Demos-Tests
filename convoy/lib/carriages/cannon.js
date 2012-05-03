function Cannon (scene,layer){//inherits carrage
	
	this.scene = scene;
	this.layer = layer;
	this.ref_time = engine.ticker.currentTick;

	//visual
	this.w = 30;
	this.h = 60;
	this.sprites = [];
	//functional
	this.name = 'Pulse Cannon';
	this.hp = 100;
	this.maxhp = this.hp;
	this.cost = 250;
	this.fireRate = 100;
	this.f_angle = 0;

	this.levels = [];
	this.levels[2] = {
		cost:250,
		name:"Medium Pulse Cannon",
	 	fireRate:80, 
	 	maxhp: 200
	 	//missile: this.missile_2
	};
	this.levels[3] = {
		cost:500,
		fireRate:50,
		maxhp: 300,
		name: "Heavy Pulse Cannon"
		//missile: this.missile_3
	};

	//Weapons
	this.missile = [];
	this.missile[1] = {"img":"assets/c1.png","w":4,"h":4,"x":100,"y":100, "dmg":20, speed:2, noTarget:true, "range":400};
	this.missile[2] = {"img":"assets/c2.png","w":6,"h":6,"x":100,"y":100, "dmg":30, speed:2, noTarget:true, "range":450};
	this.missile[3] = {"img":"assets/c2.png","w":6,"h":6,"x":100,"y":100, "dmg":40, speed:3, noTarget:true, "range":550, "bulldose":true};

	this.create = function(x,y){
		this.x = x;
		this.y = y;

		this.aimer = this.addSprite({
			img: "assets/cannon_sm.png?",
			w: 30,
			h: 12,
			x: this.x+4,
			y: this.y+27
		});
		this.addSprite({
			img: "assets/base_sm.png?",
			w: 28,
			h: 37,
			x: this.x+2,
			y: this.y+30
			
		});
		this.addSprite({
			img: "assets/tracks_sm.png?1",
			w: 22,
			h: 12,
			x: this.x+5,
			y: this.y+61
		});
	}

	this.run = function(){

		var missile = this.missile[this.level];
		var range = missile.range;
		
		this.findTarget(range);

		if(this.target != null){
			this.f_angle = this.getAimAngle(this.aimer, this.target)
			this.aimer.setAngle(this.f_angle);
			var m_attr = SimpleClone(missile);
			m_attr.x = this.aimer.x;
			m_attr.y = this.aimer.y;

			this.fire(this.target, m_attr);
			
		}	

	}

	this.updateUI = function(lvl){

		this.sprites.splice(this.sprites.indexOf(this.aimer),1);

		//Remove old
		this.aimer.remove();
		//add new
		this.aimer = this.addSprite({
			img: "assets/cannon_sm2.png?",
			w: 30,
			h: 12,
			x: this.x+4,
			y: this.y+27
		});
		this.aimer.toBack();
	}




}
Cannon.prototype = new Carriage;