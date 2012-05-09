function Swarms(){

	this.interval = 20;//send every seconds

	var flyer_swarm = 
		[
			['Flyer', -50, 200],
			['Flyer', -70, 180],
			['Flyer', -30, 160],
			['Flyer', -110, 240],
			['Flyer', -120, 120],
			['Flyer', -190, 240],
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

	var swarms = {

		//First swarm
		0: flyer_swarm,
		1: flyer_swarm,
		2: flyer_swarm,
		3: bomber_swarm,
		4: bomber_swarm,
		5: flyer_swarm,
		6: bomber_swarm,
		7: flyer_swarm,

	};

	this.getSwarm = function(no){

console.log(no);
		var sno = no % 7;
		
console.log(sno);
		if(no > 7 && sno==0){
			console.log("srhink")
			this.interval = Math.round(this.interval*0.75);
		}
		return swarms[sno];

	}

}