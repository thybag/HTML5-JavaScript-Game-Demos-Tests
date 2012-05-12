function Swarms(game_width){

	this.interval = 20;//send every seconds

	var flyer_swarm = 
		[
			['Flyer', -50, 200],
			['Flyer', -70, 180],
			['Flyer', -30, 160],
			['Flyer', -110, 240],
			['Flyer', -120, 120],
			['Flyer', -190, 240],
			['Flyer', -60, 155],
			['Flyer', -210, 170]
		];

	var bomber_swarm =
		[
			['HevFlyer', -110, 110],
			['HevFlyer', -70, 80],
			['HevFlyer', -160, 70],
			['Flyer', -40, 240],
			['Flyer', -50, 200]
		];

	var strong_bomber = [
		['HevFlyer', -110, 110],
		['HevFlyer', -70, 80],
		['HevFlyer', -160, 70],
		['HevFlyer', -100, 125],
		['Decoy', -40, 120],
		['Decoy', -80, 130]
	];

	//var combo_swarm = flyer_swarm.concat(bomber_swarm);

	var swarms = {

		//First swarm
		0: [flyer_swarm,[['Decoy', -40, 120]]],
		1: [flyer_swarm],
		2: [bomber_swarm],
		3: [flyer_swarm],
		4: [bomber_swarm],
		5: [flyer_swarm,flyer_swarm],
		6: [bomber_swarm],
		7: [flyer_swarm,flyer_swarm,bomber_swarm],
		8: [flyer_swarm,flyer_swarm,flyer_swarm],
		9: [flyer_swarm,bomber_swarm,bomber_swarm],
		10: [flyer_swarm,bomber_swarm,bomber_swarm,bomber_swarm],
		11: [strong_bomber],
		12: [bomber_swarm,bomber_swarm,bomber_swarm,flyer_swarm,flyer_swarm,flyer_swarm,flyer_swarm,flyer_swarm],
		13: [strong_bomber,strong_bomber,flyer_swarm],
		14: [strong_bomber,strong_bomber,bomber_swarm,flyer_swarm,flyer_swarm,flyer_swarm,flyer_swarm,flyer_swarm,flyer_swarm],
	};




	this.makeSwarm = function(swarmset){
		var left;
		var offset = 0;
		var l_offset = 0;
		var r_offset = this.game_width+300;

		var swarm = [];
		
		swarmset.forEach(function(set){
			//get correct offset type
			if(_this.coinFlip()){
				left=true;
				offset = l_offset;
			}else{
				left=false;
				offset = r_offset;
			}
			if(_this.coinFlip()){h_offset = 25;}else{h_offset=0;}

			//Apply to swarmset
			set.forEach(function(unit){
				swarm.push([unit[0], offset+unit[1] ,unit[2]+h_offset]);
			});
			//Update offset bumps
			if(left) l_offset-=90;
			if(!left) r_offset+=90;
		});

        return swarm;
	}




	this.getSwarm = function(no){

		console.log("send swarm: " + no);

		var sno = no % 15;
	
		if(no > 14 && sno==0){
			console.log("srhink")
			this.interval = Math.round(this.interval*0.75);
		}


		return this.makeSwarm(swarms[sno]);

	}
	
	this.coinFlip = function(){
		return (Math.floor(Math.random()*2)==1);

	}



	


	//Construct
	this.game_width = game_width;
	var _this = this;

}