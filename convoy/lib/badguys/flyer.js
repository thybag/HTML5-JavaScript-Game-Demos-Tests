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

	this.mode = 1;
	//1 = left
	//2= right
	//0 = stop
	this.run = function(){

		if(this.x < 40) this.mode = 2;
		if(this.x > this.layer.w-60) this.mode = 1;


		if(this.mode==1)this.x -=2; //this.sprite.position(this.sprite.x-2,this.sprite.y);
		if(this.mode==2)this.x +=2; //this.sprite.position(this.sprite.x+2,this.sprite.y);
	}



}
Flyer.prototype = new BadGuy();


