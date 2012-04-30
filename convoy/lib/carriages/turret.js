function Turret (scene,layer){//inherits carrage

	//Globals
	this.scene = scene;
	this.layer = layer;
	//visual
	this.img = 'turret.png?';
	this.w = 30;
	this.h = 60;

	//functional
	this.name = 'Missile Turret';
	this.fireRate = 10;
	this.hp = 100;
	this.maxhp = this.hp;
	this.cost = 300;
	this.doFire = 0;
	this.f_angle = 0;
	this.sprites = [];

	//Missile types
	this.missile_1 = {"img":"assets/m1.png?","w":2,"h":4,"x":100,"y":100, "dmg":4};

	this.create = function(x,y){
		this.x = x;
		this.y = y;

		this.aimer = this.addSprite({
			img: "assets/missiles_sm.png?",
			w: 23,
			h: 22,
			x: this.x+7,
			y: this.y+24
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

		if(this.target == null || this.target.hp <0){
			this.target = this.findTarget();
		} 

		if(this.target != null){
			this.f_angle= this.getAimAngle(this.aimer, this.target)
			this.aimer.setAngle(this.f_angle);

			this.doFire--;
			if((engine.ticker.currentTick % 100) == 0)this.doFire = 22;

			if(this.doFire > 0){
				var m_attr = SimpleClone(this.missile_1);
				m_attr.x = this.aimer.x;
				m_attr.y = this.aimer.y;
				this.fire(this.target, m_attr);

			}
			
		}	
	}


}
Turret.prototype = new Carriage;