function Missile(target, sprite){

	this.dmg = 0;
	this.sprite = sprite;
	this.noTarget = false;
	this.a = null //

	this.targetArray = (target instanceof BadGuy) ? engine.badguys : engine.convoy.carrages;

	this.update = function(){

		if(target.hp<0) this.noTarget = true;

		var m = this.sprite;
		if(!this.noTarget || this.a==null) this.a = this.getAngle(m, target);

		var x = m.x+ (4 * Math.sin(this.a));
		var y = m.y+ (4 * Math.cos(this.a))*-1
		//Update sprite
		m.position(x,y);

		if(m!==null)m.update();


		col = m.collidesWithArray(this.targetArray);
		if(col !== false){ //false means there were no collisions
			col.hit(this.dmg);
			//remove missile
			this.explode();
		}

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
			
		
	}

	this.explode = function(){
		this.sprite.remove();
		//remove missile from our array
		engine.missiles.splice(engine.missiles.indexOf(this),1);
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