function Controls(eng){

	this.cash = 1000;
	this.population = 0;

	this.buy = function(item){

		var unit = new window[item](eng.scene,eng.layer);

		if(this.cash >= unit.cost){
			this.charge(unit.cost);
			//if has enough money
			eng.convoy.add(unit );
			this.updateCash();
		}
	}

	this.repair = function(sp){
		var hp_to_rep = sp.maxhp-sp.hp;
		var cost = hp_to_rep*2;

		if(this.cash >= cost){
			this.charge(cost);
			sp.hp = sp.maxhp;
		}else{
			console.log("cant afford");
		}

	}


	this.upgrade = function(sp){
		console.log(sp);
		var cur_lvl = sp.level;


		if(cur_lvl==1 && this.population < 120){
			console.log("you need a higher population to upgrade to level 2 structures.");
			return;
		}
		if(cur_lvl==2 && this.population < 300){
			console.log("you need a higher population to upgrade to level 3 structures.");
			return;
		}


		if(cur_lvl==3){
			console.log("at max level already");
			return false;
		}
		var cost = sp.levels[cur_lvl+1].cost;

		if(this.cash >= cost){
			this.charge(cost);
			sp.upgrade();
		}else{
			console.log("cant afford");
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


		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	
}