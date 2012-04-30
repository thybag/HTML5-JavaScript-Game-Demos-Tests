function Convoy(scene,layer){ // collection of carrages
	this.length = 0;
	this.px_len = 0; //len in pix
	this.gap_len = -5;
	this.pos = {x:60,y:310};

	this.carrages = [];
	
	this.add = function(unit){
		unit.create(this.pos.x+this.px_len,this.pos.y)	
		this.px_len += unit.w;
		//unit.dom.addEventListener('click', function(e) { console.log(this); });
		//unit.dom.addEventListener('mouseover',function(e) { console.log(this); });
		this.carrages.push(unit);
	}
	
	this.remove = function(unit){
		this.carrages.splice(this.carrages.indexOf(unit),1);
		this.reshuffle();
	}
	
	this.update = function(){
		this.carrages.forEach(function(car){
			car.update();
		});
	}

	this.setScale = function(sca){
		var nx = this.pos.x;
		this.carrages.forEach(function(car){
			car.scale(sca);
			car.position(nx, car.y);
			
			nx += car.w;
		});

	}

	this.getSelected = function(x,y){
		var carriage = null;
		this.carrages.forEach(function(car){
			if(sjs.collision.isPointInRectangle(x,y,car)){
				carriage = car;
			}
		});
		return carriage;
	}
	
	this.reshuffle = function(){
		var nx = this.pos.x;
		this.carrages.forEach(function(car){
			console.log(car.x);
			car.position(nx, car.y);
			nx += car.w;
		});
		this.px_len = nx-this.pos.x;
		console.log("set new pxlen");
	}

}