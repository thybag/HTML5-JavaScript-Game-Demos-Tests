function Cannon (scene,layer){//inherits carrage
	
	//Init parent
	Carriage.call(this, scene, layer);

	//visual
	this.w = 30;
	this.h = 60;

	//functional
	this.name = 'Pulse Cannon';
	this.hp = 100;
	this.maxhp = this.hp;
	this.cost = Cannon.cost;
	this.fireRate = 100;
	this.f_angle = 0;


	this.levels = [];
	this.levels[2] = {
		cost:250,
		name:"Medium Pulse Cannon",
	 	fireRate:90, 
	 	maxhp: 200
	 	//missile: this.missile_2
	};
	this.levels[3] = {
		cost:500,
		fireRate:90,
		maxhp: 300,
		name: "Heavy Pulse Cannon"
		//missile: this.missile_3
	};

	this.showDmg = function(){
		if(this.hp < (this.maxhp/4)){ //Less than 25% health
			this.sprites[1].offset(0,37);
		}else{
			this.sprites[1].offset(0,0);
		}
	}


	//Weapons
	this.missile = [];

	this.missile[1] = {"img":"assets/general/missiles.png","xoffset":5 ,"w":5,"h":6, "dmg":20, speed:2, noTarget:true, "range":400};
	this.missile[2] = {"img":"assets/general/missiles.png","xoffset":5 ,"w":5,"h":6, "dmg":30, speed:2, noTarget:true, "range":450};
	this.missile[3] = {"img":"assets/general/missiles.png","xoffset":12 ,"w":7,"h":7, "dmg":40, speed:3, noTarget:true, "range":550, "bulldose":true};

	this.create = function(x,y){
		this.x = x;
		this.y = y+30;

		this.aimer = this.addSprite({
			img: "assets/convoy/cannon_1.png",
			w: 24,
			h: 9,
			x: this.x+7,
			y: this.y
		});
		this.addSprite({
			img: "assets/convoy/base_1.png",
			w: 28,
			h: 37,
			x: this.x+2,
			y: this.y
			
		});
		this.addSprite({
			img: "assets/convoy/tracks_1.png",
			w: 22,
			h: 12,
			x: this.x+5,
			y: this.y+31
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
			var pos = this.aimer.center();
			m_attr.x = pos.x;
			m_attr.y = pos.y;

			this.fire(this.target, m_attr);
			
		}	

	}

	this.updateLvl = function(lvl){

		this.sprites.splice(this.sprites.indexOf(this.aimer),1);

		//Remove old
		this.aimer.remove();

		if(lvl==2){
			//add new
			this.aimer = this.addSprite({
				img: "assets/convoy/cannon_2.png",
				w: 29,
				h: 10,
				x: this.x+4,
				y: this.y-1
			});
		}else if(lvl==3){
			this.aimer = this.addSprite({
				img: "assets/convoy/cannon_3.png?",
				w: 30,
				h: 12,
				x: this.x+4,
				y: this.y-3
			});
		}
		
		this.aimer.toBack();
	}




}
Cannon.cost = 250;
Cannon.prototype = new Carriage();