function CommandDrone (scene,layer){//inherits carrage

	BadGuy.call(this,scene,layer);

	this.hp = 2500;
	this.win = 100;

	this.img = 'assets/badguys/drone_commander.png';
	this.w = 85;
	this.h = 143;
	this.fireRate = 4;

	this.miss = {"img":"assets/general/missiles.png","xoffset":28 ,"w":7,"h":7, "dmg":10, speed:0.5, noTarget:true, angle:3.142, range:260};
	

	this.create = function(x,y){
		this.x = x;
		this.y = y;
 		this.addSprite({
 			"img": this.img,
			"layer": this.layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h 	//height of sprite.
		});	
	}

	//1 = left
	//2= right
	//0 = stop
	this.run = function(){

		this.findTarget(1000);
		if(this.target != null && (this.target.ident == "Tanker") && engine.convoy.length !=1){
			this.target = null;
		}



		if(this.target != null){	
			var target_x = this.target.centre().x;
			var self_x = this.centre().x;

			if(target_x < self_x)this.mode = 1;
			if(target_x > self_x)this.mode = 2;
			if (self_x == target_x){
				// set mode
				this.mode = 0;
				//Fire like a crazy
				var miss = SimpleClone(this.miss);
				var c =this.sprites[0].center();
				miss.x = c.x;
				miss.y = c.y;
				this.fire(this.target, miss);	
			}
		}

		var nx = 0;
			
		if(this.x < 40){
			this.mode = 2;
		} 
		if(this.x > this.layer.w-60){
			this.mode = 1;
		} 
		if(this.mode==1)nx -=1; 
		if(this.mode==2)nx +=1;

		this.position(this.x+nx, this.y);
		//console.log(this.mode);
	}

	this.slowLog = function(msg){
		if((engine.ticker.currentTick % 20)) console.log(msg);
	}



}
CommandDrone.prototype = new BadGuy();


