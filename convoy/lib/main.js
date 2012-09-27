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

	this.swarm = new Swarms(this.layer.w);

	this.level = 0;

	this.dlg = new Dialog();
	var _this = this;

	//Add set ticker method to Engine
	this.setTicker = function(ticker){
		this.ticker = ticker;
		this.ticker.realTick = 0;//add counter for real ticks
	}
	
	this.init = function(){
		this.convoy.add(new Tanker(scene, layer));
		setInterval(function(){_this.swarmTick(false);},1000);
		
	}
	
				
	//Create run method which will be called each time the 
	//game loop runs.
	this.run = function(){

		this.ticker.realTick++;
	
		//update world.
		world_x = this.ticker.realTick;
		if(world_x % 10 == 0)document.getElementById('trav').innerHTML = world_x/5;
		document.getElementById('world').style.backgroundPosition = world_x+'px 0px';
		//
		//this.createSwarm(world_x,false);


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
		if(typeof m.angle != 'undefined') mis.a = m.angle;
		mis.sprite.toBack();
		this.missiles.push(mis);	
	}

	this.swarmTick = function(activateByUser){
		if(this.ticker.paused) return;

		//Create swarm ticker.
		if(typeof this.swarmTicker == "undefined")this.swarmTicker=0;

		if(this.swarmTicker==this.swarm.interval || activateByUser){
			var swa = this.swarm.getSwarm(this.level);
			swa.forEach(function(s){
				var fl = new window[s[0]](scene, layer);
				fl.create(s[1],s[2]);
				_this.badguys.push(fl);
			});

			this.swarmTicker = 0;
			this.level++;
			document.getElementById('lvl').innerHTML = this.level;

		}
		document.getElementById('incom_tim').innerHTML = this.swarm.interval-this.swarmTicker;
		if(activateByUser){
			this.swarmTicker=0;
		}
		else{ 
			this.swarmTicker++;
		} 

	}
	/*
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
			
			

			var swa = this.swarm.getSwarm(lvl);
			swa.forEach(function(s){
				var fl = new window[s[0]](scene, layer);
				fl.create(offset-s[1],s[2]);
				_this.badguys.push(fl);
			});

			document.getElementById('lvl').innerHTML = lvl+1;

		}
		this.level = lvl;




	}*/
	
	
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






