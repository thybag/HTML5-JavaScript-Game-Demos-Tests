
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
		this.nodes[node].innerHTML = val;
	}
	this.update = function(){
		if(this.sprite != null){
			this.set('name',	this.sprite.name);
			this.set('hp', this.sprite.hp);//sprite.hp
			this.set('maxHp',	this.sprite.maxhp);

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
