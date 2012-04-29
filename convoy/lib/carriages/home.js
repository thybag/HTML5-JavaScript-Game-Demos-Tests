function Residence (scene,layer){//inherits carrage
	this.hp = 100;

	this.img = 'accom.png?';
	this.w = 160;
	this.h = 75;

	this.create = function(x,y){

 		var  spr = scene.Sprite(this.img,{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y+18, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h 	//height of sprite.
		});
 		this.sprites.push(spr);
	}




}
Residence.prototype = new Carriage;