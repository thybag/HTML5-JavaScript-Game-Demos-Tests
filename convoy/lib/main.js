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
	this.level = 0;

	this.dlg = new Dialog();

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
		this.dlg.update();
		
		if(this.inputs.mouse.click) {
			if(inWorld(this.inputs.mouse.position.x,this.inputs.mouse.position.y-20)){
				var sprite = this.convoy.getSelected(this.inputs.mouse.position.x,this.inputs.mouse.position.y-20);
				
				this.dlg.invoke(sprite);


				
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
		if(typeof m.range != 'undefined')mis.range  = m.range;
		if(typeof m.speed != 'undefined') mis.speed = m.speed;

		this.missiles.push(mis);	
	}

	this.createSwarm = function(tick){


		var next_wave_in = 10;

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

function Dialog(){
	this.visable = false;
	this.sprite = null;
	var _this = this;
	//Build dilaog
	this.node = document.getElementById('carriage_option');
	this.nodes = [];
	this.nodes.name = document.createElement('strong');

	this.nodes.health = document.createElement('div')
	this.nodes.hp = document.createElement('span');
	this.nodes.maxHp = document.createElement('span');

	this.nodes.rep = document.createElement('div');
	this.nodes.rep.className = 'opt';
	this.nodes.rep.innerHTML = 'Repair';
	this.nodes.upg = document.createElement('div');
	this.nodes.upg.className = 'opt';
	this.nodes.upg.innerHTML = 'Upgrade';


	this.node.appendChild(this.nodes.rep);
	this.node.appendChild(this.nodes.upg);

	this.node.appendChild(this.nodes.name);
	this.node.appendChild(document.createElement('br'));
	this.node.appendChild(this.nodes.health);
	

	this.nodes.health.innerHTML = 'HP: ';
	this.nodes.health.appendChild(this.nodes.hp);
	this.nodes.health.appendChild(document.createTextNode('/'));
	this.nodes.health.appendChild(this.nodes.maxHp);

	this.invoke = function(sprite){
		if(sprite==null){
			this.hide();
		}else{
			this.sprite = sprite;
			this.show(sprite.x);

			this.set('name',	sprite.name);
			this.set('hp', sprite.hp);//sprite.hp
			this.set('maxHp',	sprite.maxhp);

			//node.innerHTML = '<div class="opt">upgrade</div><div class="opt">Repair</div>';
			//node.innerHTML += '<strong>'+sprite.name+'</strong><br>';
			//node.innerHTML += 'HP: '+sprite.hp+'/'+sprite.maxhp;
		}

	}
	this.show = function(x){
		this.visable = true;

		this.node.style.display = 'block';
		this.node.style.top = '420px';
		this.node.style.left = x+'px';
	}
	this.hide = function(){
		this.node.style.display = 'none';
		this.visable = false;
	}

	this.set = function(node,val){
		console.log(this.nodes[node]);
		this.nodes[node].innerHTML = val;

	}
	this.update = function(){
		if(this.sprite != null){
			this.nodes.hp.innerHTML = this.sprite.hp;
			if(this.sprite.hp<1)this.hide();
		}

	}
	this.nodes.rep.onclick = function(){
		controls.repair(_this.sprite);
		//_this.show(_this.sprite.x);
	}
	this.nodes.upg.onclick = function(){
		controls.upgrade(_this.sprite);
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






