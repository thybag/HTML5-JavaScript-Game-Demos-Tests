function Residence (scene,layer){//inherits carrage
	
	//Globals?
	this.scene = scene;
	this.layer = layer;

	//functional
	this.name = 'Residence';
	this.hp = 200;
	this.maxhp = this.hp;
	this.cost = 600;

	//Visual
	this.w = 128;
	this.h = 66;
	

	this.create = function(x,y){
		this.x = x;
		this.y = y;

		this.aimer = this.addSprite({
			img: "assets/accom_sm.png",
			w: 128,
			h: 62,
			x: this.x+2,
			y: this.y+7
		});
		this.addSprite({
			img: "assets/tracks_sm.png?1",
			w: 22,
			h: 12,
			x: this.x+14,
			y: this.y+62
		});
		this.addSprite({
			img: "assets/tracks_sm.png?1",
			w: 22,
			h: 12,
			x: this.x+96,
			y: this.y+62
		});


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