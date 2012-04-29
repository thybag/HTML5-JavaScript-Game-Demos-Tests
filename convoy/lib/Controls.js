var controls;
function Controls(eng){

	this.cash = 1000;

	this.buy = function(item){

		var unit = new window[item](eng.scene,eng.layer);

		if(this.cash >= unit.cost){
			this.charge(unit.cost);
			//if has enough money
			eng.convoy.add(unit );
			this.updateCash();
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

	this.updateCash = function(){
		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	this.updateOptions = function(){
		//Grey out / un grey out purchase optioons


		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	
}