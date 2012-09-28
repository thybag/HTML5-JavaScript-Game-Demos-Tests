function Turret (scene,layer){//inherits carrage

	//Init parent
	Carriage.call(this,scene,layer);

	//visual
	this.w = 30;
	this.h = 60;

	//functional
	this.name = 'Light Missile Turret';
	this.fireRate = 9;
	this.hp = 100;
	this.maxhp = this.hp;
	this.cost = Turret.cost;
	this.doFire = 0;
	this.f_angle = 0;
	this.sprites = [];
	this.sustainFireTime = 22;

	this.levels = [];
	this.levels[2] = {
		cost:300,
		name:"Medium Missile Turret",
	 	sustainFireTime: 30,
	 	fireRate:8,
	 	maxhp: 200
	 	//missile: this.missile_2
	};
	this.levels[3] = {
		cost:300,
		sustainFireTime: 50,
		maxhp: 300,
		fireRate:8,
		name: "Heavy Missile Turret"
		//missile: this.missile_3
	};

	this.showDmg = function(){
		if(this.hp < (this.maxhp/4)){ //Less than 25% health
			this.sprites[1].offset(0,37);
		}else{
			this.sprites[1].offset(0,0);
		}
	}
	
	//Weapons /Missile types
	this.missile = [];
	this.missile[1] = {"img":"assets/general/missiles.png", "xoffset":"20" ,"w":2, "h":2, "dmg":7, "range":300};
	this.missile[2] = {"img":"assets/general/missiles.png", "xoffset":"20" ,"w":2, "h":2, "dmg":10, "range":400};
	this.missile[3] = {"img":"assets/general/missiles.png", "xoffset":"20" ,"w":2, "h":2, "dmg":14, "range":550};



	

	this.create = function(x,y){
		this.x = x;
		this.y = y+25;

		this.aimer = this.addSprite({
			img: "assets/convoy/turret_1.png",
			w: 23,
			h: 14,
			x: this.x+7,
			y: this.y+2
		});
		this.addSprite({
			img: "assets/convoy/base_1.png",
			w: 28,
			h: 37,
			x: this.x+2,
			y: this.y+5
			
		});
		this.addSprite({
			img: "assets/convoy/tracks_1.png",
			w: 22,
			h: 12,
			x: this.x+5,
			y: this.y+36
		});
		
	}
	this.run = function(){

		var missile = this.missile[this.level];
		var range = missile.range;

		this.findTarget(range);
		
		if(this.target != null){
			this.f_angle= this.getAimAngle(this.aimer, this.target)
			this.aimer.setAngle(this.f_angle);

			this.doFire--;
			if((engine.ticker.currentTick % 100) == 0) this.doFire = this.sustainFireTime;

			if(this.doFire > 0){
				var m_attr = SimpleClone(missile);
				var c = this.aimer.center();
				m_attr.x = c.x;
				m_attr.y = c.y;
				this.fire(this.target, m_attr);

			}
			
		}	
	}

	this.updateLvl = function(lvl){

		this.sprites.splice(this.sprites.indexOf(this.aimer),1);

		//Remove old
		this.aimer.remove();
		delete this.aimer;
		//add new

		if(lvl==2){
			this.aimer = this.addSprite({
				img: "assets/convoy/turret_2.png",
				w: 23,
				h: 18,
				x: this.x+7,
				y: this.y+1
			});
		}else if(lvl == 3){
			this.aimer = this.addSprite({
				img: "assets/convoy/turret_3.png",
				w: 23,
				h: 22,
				x: this.x+7,
				y: this.y-1
			});

		}

		
		this.aimer.toBack();
	}


}
Turret.cost = 300;
Turret.prototype = new Carriage();