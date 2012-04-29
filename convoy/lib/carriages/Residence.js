function Residence (scene,layer){//inherits carrage
	this.hp = 100;

	this.img = 'accom.png';
	this.w = 134;
	this.h = 66;
	this.cost = 600;

	this.create = function(x,y){
		this.x = x;
		this.y = y;
 		var  spr = scene.Sprite(this.img,{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y+10, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h, 	//height of sprite.
			//"scale": 0.8
		});
 		this.sprites.push(spr);
	}




}
Residence.prototype = new Carriage;