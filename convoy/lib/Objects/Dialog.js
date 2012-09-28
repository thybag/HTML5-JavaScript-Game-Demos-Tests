
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
	this.nodes.rep.className = 'opt rep';
	this.nodes.rep.innerHTML = 'Repair';
	this.nodes.upg = document.createElement('div');
	this.nodes.upg.className = 'opt upg';
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

		//Ensure dialog fits on screen
		if(x+290 > engine.scene.w) x = x-((x+290) % engine.scene.w)-15;

		this.node.style.display = 'block';
		this.node.style.top = '416px';
		this.node.style.left = x+'px';
	}
	this.hide = function(){
		this.node.style.display = 'none';
		this.visable = false;
	}

	this.set = function(node,val){
		this.nodes[node].innerHTML = val;
	}
	this.update = function(){

		if(this.sprite != null){

			var spr = this.sprite;

			
			this.set('name',	spr.name);
			this.set('hp', spr.hp);//sprite.hp
			this.set('maxHp',	spr.maxhp);

			if(spr.hp<1)this.hide();

			if(this.visable){

				
				var greenStyle = 'solid 2px #238E23';
				var redStyle = 'solid 2px #ff0000';

				//Update Repair data
				var r_cost = controls.getRepairCost(spr);
				if(controls.canRepair(spr)){
					if(spr.hp == spr.maxhp){
						this.nodes.rep.title = "Already at full health.";
						this.nodes.rep.style.border = redStyle;
					}else{
						this.nodes.rep.title = '$'+ r_cost ;
						this.nodes.rep.style.border = greenStyle;
					}
					
				}else{
					this.nodes.rep.title = 'Cannot afford to repair, need: $'+ r_cost;
					this.nodes.rep.style.border = redStyle;
				}
				//Update 

				var u_cost = controls.getUpgradeCost(spr);
				if(controls.canUpgrade(spr)){
					this.nodes.upg.title = '$'+ u_cost ;
					this.nodes.upg.style.border = greenStyle;	
				}else{
					this.nodes.upg.style.border = redStyle;
					this.nodes.upg.title = controls.getUpgradeIssue(spr);
				}

			}
			
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
