function Flyer (scene,layer){//inherits carrage
	this.hp = 20;
	this.win = 50;

	this.img = 'flyer.png';
	this.w = 40;
	this.h = 46;
	this.angle = 0;

	//Globals?
	this.scene = scene;
	this.layer = layer;

	this.target = null;

	this.mode = 1;

	this.miss = {"img":"assets/c1.png","w":4,"h":4,"x":100,"y":100, "dmg":5, speed:2, noTarget:true};
	//1 = left
	//2= right
	//0 = stop
	this.run = function(){


		if(this.target == null || this.target.hp <0){
			this.target = this.findTarget();
		} 

		if(this.target != null){
			if (this.x == this.target.x-80) this.mode = 0;

			var miss = SimpleClone(this.miss);
			miss.x = this.x;
			miss.y = this.y;
			this.fire(this.target, miss);
		}
			
		if(this.x < 40) this.mode = 2;
		if(this.x > this.layer.w-60) this.mode = 1;

		if(this.mode==0){if(Math.floor(Math.random()*100)==10)this.mode=2;}
		if(this.mode==1)this.x -=2; //this.sprite.position(this.sprite.x-2,this.sprite.y);
		if(this.mode==2)this.x +=2;




		 //this.sprite.position(this.sprite.x+2,this.sprite.y);
	}



}
Flyer.prototype = new BadGuy();


