function Missile(target, sprite){

	this.dmg = 0;
	this.sprite = sprite;
	this.noTarget = false;
	this.a = null //
	this.range = 100;
	this.bulldose = false;

	this.dead = false;
	this.targetArray = (target instanceof BadGuy) ? engine.badguys : engine.convoy.carrages;

	this.update = function(){

		if(target.hp<0) this.noTarget = true;

		var m = this.sprite;
		if(!this.noTarget || this.a==null){
			this.a = this.getAngle(m, target);
		} 

		var x = m.x+ (4 * Math.sin(this.a));
		var y = m.y+ (4 * Math.cos(this.a))*-1

		this.range -= 4;

		//Update sprite
		m.position(x,y);

		col = m.collidesWithArray(this.targetArray);
		if(col !== false){ //false means there were no collisions
			col.hit(this.dmg);
			//remove missile (unless bulldose mode is one)
			if(!(this.bulldose && col.hp<this.dmg)) this.explode();
		}

		if(this.range < 0) this.explode();

		if(m.layer != null){ 
			if(!(
				(m.x>0 && m.x < m.layer.w) &&
				(m.y>0 && m.y < m.layer.h)
				)
			){
				this.explode();
				console.log("autokill");
			}

		}


		if(m.layer!==null) m.update();	
		
	}

	this.explode = function(){

		if(this.sprite.layer){
			this.sprite.remove();
			this.sprite.killedbyme = true;
			//remove missile from our array
			engine.missiles.splice(engine.missiles.indexOf(this),1);
		}else{
			console.log("bad remove");
			//engine.dead.push(this);
		}
		
	}

	this.getAngle = function(spr, target){
		return Math.atan2(
				((target.y+target.h/2)
				-spr.y),
				((target.x+target.w/2)
				-spr.x)
			 )+1.571;
	}
}