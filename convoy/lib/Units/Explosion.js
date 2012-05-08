function Explosions(scene,layer) {

	this.explosions = [];
	var _this = this;

	this.update = function(){

		this.explosions.forEach(function(s){

			if(s.done){
				s.sprites[0].remove();
				_this.explosions.splice(_this.explosions.indexOf(s),1);
			}else{
				s.next().update();
			}	

		});
	}

	this.create = function(x,y,size){

		if(size==1){
			var bang = this.smallBang(x,y);
		}else{
			var bang = this.mediumBang(x,y);
		}
		

		this.explosions.push(bang);
	}

	this.mediumBang = function(x,y){
		var explosion = scene.Cycle([
						 [0, 0, 5],
                         [0, 64, 5],
                         [0, 128, 5],
                         [0, 192, 5],
                         ]);
		explosion.repeat=false;
		var sprite = scene.Sprite("assets/general/exp2_0.png",{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x-32, 	//X position of sprite
			"y": y-32, 	//Y position of sprite
			"w": 64, 	//width of sprite.
			"h": 64 	//height of sprite.
		});
		explosion.addSprite(sprite);
		return explosion;
	}

	this.smallBang = function(x,y){
		var explosion = scene.Cycle([
						 [0, 0, 3],
                         [0, 32, 3],
                         [0, 64, 3],
                         [0, 96, 3],
                         ]);
		explosion.repeat=false;
		var sprite = scene.Sprite("assets/general/exp_smaller.png",{
			"layer": layer, //Layer tanks will be displayed in.
			"x": x-16, 	//X position of sprite
			"y": y-16, 	//Y position of sprite
			"w": 32, 	//width of sprite.
			"h": 32 	//height of sprite.
		});
		explosion.addSprite(sprite);
		return explosion;
	}




}