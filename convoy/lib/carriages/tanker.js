function Tanker (scene,layer){//inherits carrage
	this.hp = 500;

	this.img = 'tanker.png?_';
	this.w = 144;
	this.h = 74;

	this.create = function(x,y){
		this.x = x;
		this.y = y;
 		var  spr = scene.Sprite(this.img,{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x, 	//X position of sprite
			"y": y, 	//Y position of sprite
			"w": this.w, 	//width of sprite.
			"h": this.h 	//height of sprite.
		});
 		this.sprites.push(spr);
	}




}
Tanker.prototype = new Carriage;
