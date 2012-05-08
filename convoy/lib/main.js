function Engine(scene, layer){
	//store scene and layer for later
	this.scene = scene;
	this.layer = layer;
	this.inputs = scene.Input();
	//Var to keep track of missiles.
	this.missiles = [];
	this.badguys = [];
	this.dead = [];
	this.convoy = new Convoy(scene,layer);
	this.explosions = new Explosions(scene,layer);

	this.level = 0;

	this.dlg = new Dialog();


	//Add set ticker method to Engine
	this.setTicker = function(ticker){
		this.ticker = ticker;
	}
	
	this.init = function(){
		this.convoy.add(new Tanker(scene, layer));
		
	}
	

	
				
	//Create run method which will be called each time the 
	//game loop runs.
	this.run = function(){
	
		//update world.
		world_x = this.ticker.currentTick;
		if(world_x % 10 == 0)document.getElementById('trav').innerHTML = world_x/5;
		document.getElementById('world').style.backgroundPosition = world_x+'px 0px';
		//
		this.createSwarm(world_x,false);


		//Update Badguys
		this.badguys.forEach(function(bg){bg.update();});
		//Update convoy
		this.convoy.update();
		this.explosions.update();

		//update missiles
		this.missiles.forEach(function(bg){bg.update();});
		//update dialogs
		this.dlg.update();
		
		
	
	
	}


	this.addMissile = function(target, m){

		var mis = new Missile(target, this.scene.Sprite(m.img,{
						"layer": this.layer,
						"w":m.w,
						"h":m.h,
						"x":m.x,
						"y":m.y,
						"xoffset": (m.xoffset) ? m.xoffset : 0,
						"yoffset": (m.yoffset) ? m.yoffset : 0,
					}));
		mis.dmg = m.dmg;
		mis.noTarget = m.speed;
		if(typeof m.bulldose != 'undefined')mis.bulldose = m.bulldose;
		if(typeof m.range != 'undefined')mis.range  = m.range;
		if(typeof m.speed != 'undefined') mis.speed = m.speed;
		mis.sprite.toBack();
		this.missiles.push(mis);	
	}

	this.createSwarm = function(tick, sendnow){

		if(typeof this.waveoffset == "undefined")this.waveoffset=0;
		if(sendnow == true){
			this.level++;
			
			this.waveoffset++;
		}

		var next_wave_in = 20;

		sec_tick = Math.round(tick/24) % next_wave_in;
		lvl = (Math.round(tick/24)/next_wave_in)+this.waveoffset;
		document.getElementById('incom_tim').innerHTML = next_wave_in-sec_tick;

		//if world_x == tickpoint for badguys % 500?
		//update level, releace level badguys
		if((sec_tick == '0' && lvl != this.level) || sendnow){
			
			var offset = (Math.floor(Math.random()*2)==1) ? this.layer.w+300 : 0;

			var fl = new Flyer(scene, layer);
			fl.create(offset-50,200);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(offset-70,180);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(offset-30,160);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(offset-110,240);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(offset-120,120);
			this.badguys.push(fl);

			var fl = new Flyer(scene, layer);
			fl.create(offset-190,240);
			this.badguys.push(fl);
			var fl = new Flyer(scene, layer);
			fl.create(offset-210,120);
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
function getDistance( point1, point2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}
function inWorld(x,y){

	return ((
				(x>0 && x < engine.layer.w) &&
				(y>0 && y < engine.layer.h)
				)
			);
}






