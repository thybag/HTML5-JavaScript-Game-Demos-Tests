function HevFlyer (scene,layer){//inherits carrage

	BadGuy.call(this,scene,layer);

	this.hp = 50;
	this.win = 50;

	this.img = 'assets/badguys/hev_flyer.png';
	this.w = 80;
	this.h = 35;
	this.fireRate = 120;

	this.miss = {"img":"assets/general/missiles.png","xoffset":28 ,"w":7,"h":7, "dmg":15, speed:0.5, noTarget:true, angle:3.142, range:260};
	

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

		//this.findTarget(this.miss.range);
			
		var nx = 0;

		//if(this.target != null){
			//if (this.x == this.target.x-80) this.mode = 0;
			//if (this.x == this.target.x+80) this.mode = 0;
			
			var miss = SimpleClone(this.miss);
			var c =this.sprites[0].center();
			miss.x = c.x;
			miss.y = c.y;
			this.fire(this.target, miss);
		//}
			
		if(this.x < 40){
			this.mode = 2;
			//this.sprites[0].setXOffset(0);
		} 
		if(this.x > this.layer.w-60){
			this.mode = 1;
			//this.sprites[0].setXOffset(40);
		} 

		//if(this.mode==0){if(Math.floor(Math.random()*150)==10)this.mode=2;}
		if(this.mode==1)nx -=1; //this.sprite.position(this.sprite.x-2,this.sprite.y);
		if(this.mode==2)nx +=1;

		this.position(this.x+nx, this.y);
	}



}
HevFlyer.prototype = new BadGuy();


