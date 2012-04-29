function Engine(scene, layer){
	//store scene and layer for later
	this.scene = scene;
	this.layer = layer;
	this.inputs = scene.Input();
	//Var to keep track of missiles.
	this.missiles = [];
	this.badguys = [];
	this.convoy = new Convoy(scene,layer);
	this.level = 0;

	//Add set ticker method to Engine
	this.setTicker = function(ticker){
		this.ticker = ticker;
	}
	
	this.convoy.add(new Tanker(scene, layer));

	
				
	//Create run method which will be called each time the 
	//game loop runs.
	this.run = function(){
	
		//update world.
		world_x = this.ticker.currentTick;
		if(world_x % 10 == 0)document.getElementById('trav').innerHTML = world_x/5;
		document.getElementById('world').style.backgroundPosition = world_x+'px 0px';
		//
		this.createSwarm(world_x);


		//Update Badguys
		this.badguys.forEach(function(bg){bg.update();});
		//Update convoy
		this.convoy.update();
		//
		this.missiles.forEach(function(bg){bg.update();});

		if(this.inputs.mouse.click) {
			if(inWorld(this.inputs.mouse.position.x,this.inputs.mouse.position.y-30)){
				var s = this.convoy.getSelected(this.inputs.mouse.position.x,this.inputs.mouse.position.y-30);
				console.log(s);
			}
		}
		
	
	}


	this.addMissile = function(target, m){

		var mis = new Missile(target, this.scene.Sprite(m.img,{
						"layer": this.layer,
						"w":m.w,
						"h":m.h,
						"x":m.x,
						"y":m.y
					}));
		mis.dmg = m.dmg;
		mis.noTarget = m.speed;
		if(typeof m.speed != 'undefined') mis.speed = m.speed;

		this.missiles.push(mis);	
	}

	this.createSwarm = function(tick){


		var next_wave_in = 20;

		sec_tick = Math.round(tick/24) % next_wave_in;
		lvl = Math.round(tick/24)/next_wave_in;
		document.getElementById('incom_tim').innerHTML = next_wave_in-sec_tick;

		//if world_x == tickpoint for badguys % 500?
		//update level, releace level badguys
		if(sec_tick == '0' && lvl != this.level){
			
			var fl = new Flyer(scene, layer);
			fl.create(-50,200);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(-70,180);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(-30,160);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(-110,240);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(-120,120);
			this.badguys.push(fl);

			document.getElementById('lvl').innerHTML = lvl+1;

		}
		this.level = lvl;




	}
	
	
}

function SimpleClone(obj){
		object = {};
		//For every option in object, create it in the duplicate.
		for (var i in obj) {
			object[i] = obj[i];
		}
		return object;
}
function inWorld(x,y){

	return ((
				(x>0 && x < engine.layer.w) &&
				(y>0 && y < engine.layer.h)
				)
			);
}






