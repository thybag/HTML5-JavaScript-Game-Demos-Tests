function Controls(eng, overlay){

	this.cash = 1000;
	this.population = 0;


	overlay.dom.addEventListener("click",function(){
		var x = eng.inputs.mouse.position.x; 
		var y = eng.inputs.mouse.position.y;

		var sprite = eng.convoy.getSelected(x,y);
		eng.dlg.invoke(sprite);

		//If we didnt get a carrage, see if we targeted a bad guy!
		if(sprite === null){
			eng.badguys.forEach(function(unit){
				if(sjs.collision.isPointInRectangle(x,y,unit)){
					unit.makeTarget();
					return;
				}
			});
		}
	});

	//Show quick message to player
	this.flash = function(msg){

		document.getElementById('flash_message').innerHTML = msg;
		document.getElementById('flash_message').style.display = 'block';

		setTimeout(function(){
			document.getElementById('flash_message').style.display = 'none';
		},800);
	}


	this.setUpAudio = function(){
		var audio = document.createElement('div');
		audio.innerHTML = 'Music: On';
		audio.id = 'audio_controls';
		document.body.appendChild(audio);
		audio.addEventListener("click",function(){
			if(audio.innerHTML == 'Music: On'){
				audio.innerHTML = 'Music: Off';
				document.getElementById('audio').pause();
			}else{
				audio.innerHTML = 'Music: On';
				document.getElementById('audio').play();
			}
		},false);
	}

	//Sync audio with puase, to try and stop & start it again depending on the users settings
	this.syncAudio = function(){

		var a = document.getElementById('audio');
		//Ensure music pauses while the game is paused (if audio is enabled!)
		if(engine.ticker.paused){
			if(!a.paused){ a.pause(); } 
		}else{
			//If audio is pausedbut controls say is enabled, we want to renable after a pause
			if(a.paused && document.getElementById('audio_controls').innerHTML == 'Music: On'){
				a.play();
			} 
		}


	}


	this.buy = function(item){

		var cost = window[item].cost;

		if(this.cash >= cost){
			this.charge(cost);
			//if has enough money
			eng.convoy.add(new window[item](eng.scene,eng.layer));
			this.updateCash();
		}else{
			this.flash("You cannot afford to buy this vehicle");
		}
	}

	this.repair = function(sp){

		if(this.canRepair(sp)){

			var cost = this.getRepairCost(sp);
			if(cost == 0){
				this.flash("This vehicle is already at maxium health");
			}else{
				this.charge(cost);
				sp.hp = sp.maxhp;
				sp.showDmg();
			}
		}else{
			console.log("no");
			this.flash("You do not have enough cash to repair this vehicle");
		}
	}
	this.canRepair = function(sp){
		return (this.cash >= this.getRepairCost(sp));
	}
	this.getRepairCost = function(sp){
		return (sp.maxhp-sp.hp)*2;
	}




	this.upgrade = function(sp){
		if(this.canUpgrade(sp)){
			this.charge(this.getUpgradeCost(sp));
			sp.upgrade();
		}else{
			this.flash("Cannot afford to upgrade vehicle at this time");
		}
	}
	this.canUpgrade = function(sp){
		if(sp.level==1 && this.population < 100) return false;
		if(sp.level==2 && this.population < 300) return false;
		if(sp.level==3) return false;
		return (this.cash >= this.getUpgradeCost(sp));
	}
	this.getUpgradeCost = function(sp){
		var lvl = sp.level+1;
		if(lvl==4) return -1;
		return sp.levels[lvl].cost;
	}
	this.getUpgradeIssue = function (sp){
		var lvl = sp.level+1;
		if(lvl==2 && this.population < 100) return "Need a population of 100 to use level two strutures.";
		if(lvl==3 && this.population < 300) return "Need a population of 300 to use level three strutures.";
		if(lvl==4) return "This vehicle is already fully upgraded.";
		if(this.cash < this.getUpgradeCost(sp)){
			return "Cannot afford upgrade, cost: $"+this.getUpgradeCost(sp);
		}
	}






	this.charge = function(cost){
		this.cash -= cost;
		this.updateOptions();
	}
	this.fund = function(cost){
		this.cash += cost;
		this.updateOptions();
	}

	this.updatePopulation = function(change){
		this.population += change;

		document.getElementById('pop').innerHTML = this.population;
	}


	this.updateCash = function(){
		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	this.updateOptions = function(){
		//Grey out / un grey out purchase optioons

		var greenStyle = 'solid 2px #238E23';
		var redStyle = 'solid 2px #ff0000'

		var res = document.getElementById('buyresidence');
		(Residence.cost <= this.cash) ? res.style.border = greenStyle : res.style.border = redStyle;
		
		var can = document.getElementById('buycannon');
		(Cannon.cost <= this.cash) ? can.style.border = greenStyle : can.style.border = redStyle;
		
		var tur = document.getElementById('buyturret');
		(Turret.cost <= this.cash) ? tur.style.border = greenStyle : tur.style.border = redStyle;


		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	
}