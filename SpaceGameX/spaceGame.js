/**
* Space Game X (name still needed)
*
* Proper Comments coming soon, at the moment i'm just hacking away at things to see what i can get to work :p
* @author Carl Saggs
* @version 0.1.2
*/

/*
## Change Log


## Version 0.1.4
* Missions now Queue
* BlueDart ship type added (Ship types abastracted futher)
* New spawning function
* New startup dialog
* Improved AI

## Version 0.1.3
* Keeps track of stats (kills, missiles fired)
* More enimy spawn option
* HUD messages
* Ship to ship collisions now take place
* Bug fix to missile launch position
* Added local High Score
* Score + highScore Display.

## Version 0.1.2
* Atroids like physicis to ship
* fixed bug in Collison detection algrothum (still needs a propper rewrite - its done terribily)
* Added spaceObject which is inherited by missiles and badguys
* Basic Hud (health)
* Player can take damage
* Game over can happen

## Version 0.1.1
* Object Collisions implimented
* Bad guys can take damage
* Bug fix to starfeild generator
* increased badguy spawn rate
* added missile profiles to define params

*/
//Global Varibles
var game, ship, worldX, worldY;
//Controls
var fwd = false,left = false,right = false,bkw = false,fire = false;

var framerate = 24; //frames per second

//Quick way to make functions inherit others
Function.prototype.inherits = function(p){
	this.prototype = new p;
	this.prototype.constructor = this;
}

/**
 * Space Object
 * Defines an object that movies through the games world.
 * Space objects can both move and be destroyed
 */
function spaceObject(){

	/**
	 * Explode
	 * Called when the ship is destryed. Removes dom node and trigers blast animation
	 */
	this.explode = function(){
		this.ref.parentNode.removeChild(this.ref);
		this.exploded = true;
		new this.blastAnimation(this.x,this.y,(this.ref.height+5),100);
	}
	/**
	 * Move
	 * Moves the ship to a new position
	 *
	 */
	this.move = function(){

		nx = this.speed * Math.sin(this.angle*(Math.PI/180));
		ny = this.speed * Math.cos(this.angle*(Math.PI/180));
		ny = ny*-1;
		
		this.x = this.x + nx;
		this.y = this.y + ny;
		this.ref.style.left = this.x + 'px';
		this.ref.style.top = this.y + 'px';
		
	}
	/**
	 * RotateObj
	 * Rotates the provided object to x degrees
	 * @param x Amount of rotation to apply to object
	 * @param obj Dom node to apply rotation too
	 */
	this.rotateObj = function(x,obj){
		obj.style.MozTransform="rotate("+x+"deg)";
		obj.style.WebkitTransform="rotate("+x+"deg)";
		obj.style.OTransform="rotate("+x+"deg)";
		obj.style.Transform="rotate("+x+"deg)";
	}
	/**
	 * Displays animation of explosion
	 *
	 * @param x coord of x axis position
	 * @param y coord of y axis position
	 * @param blastsize, size of explosion
	 * @param timeDelay speed of animation
	 */
	this.blastAnimation = function(x,y,blastsize,timeDelay){
		
		this.animationLen = 5;
		this.animationTick =0;
		this.timeDelay = timeDelay;
		
		this.bang = document.createElement('canvas');
		
		this.bang.style.position = 'absolute';
		this.bang.style.left = x-(blastsize/2) + 'px';
		this.bang.style.top = y-(blastsize/2) + 'px';
		this.bang.width = blastsize*2;
		this.bang.height = blastsize*2;
		
		document.getElementById('zone').appendChild(this.bang);
		
		this.canvas = this.bang.getContext("2d");
		this.canvas.beginPath();
		this.canvas.arc(blastsize, blastsize, blastsize, 0, Math.PI*2, true); 
		this.canvas.closePath();
		this.canvas.fillStyle = "rgb(255,255,0)";
		this.canvas.fill();
		var h = this;
		
		this.animate = function(){
			if(this.animationTick > this.animationLen){
				document.getElementById('zone').removeChild(this.bang);
			}else{
				setTimeout(function(){
					if((h.animationTick % 2)==1){
						h.canvas.fillStyle = "rgb(255,255,0)";
						h.canvas.fill();
					}else{
						h.canvas.fillStyle = "rgb(255,0,0)";
						h.canvas.fill();
					}
					h.animate();
				},this.timeDelay);
				this.animationTick++;
			}
		}
		
		this.animate();
	}
}




/**
 * HUD
 * Heads up display, shows messages from the game, health and maybe other stuff
 *
 */
function HUD(game){
	this.game = game;
	this.hp = null;
	this.mission = null;
	this.hudDisplay= null;
	this.score = null;
	var self = this;
	this.kills = null;
	this.dmgCritical = false;
	this.missionQueue = Array();
	
	
	this.create = function(){
		e = document.createElement('div');
		e.style.position = 'absolute';
		e.style.top = '0px';
		e.style.right = '0px';
		e.style.width = '250px';
		e.style.color = 'green';
		e.style.padding = '10px';
		e.innerHTML = 'HP: ';
		
		hpCon = document.createElement('div');
		hpCon.style.float = 'right';
		hpCon.style.width = '210px';
		hpCon.style.padding = '1px';
		
		hp = document.createElement('div');
		hp.style.float = 'left';
		hp.style.width = game.ship.hp + 'px';
		hp.style.height = '15px';
		hp.style.background = 'green';
		hpCon.appendChild(hp);
		e.appendChild(hpCon);
		
		m = document.createElement('div');
		m.style.position = 'absolute';
		m.style.bottom = '0px';
		m.style.right = '0px';
		m.style.width = '600px';
		m.style.height = '30px';
		m.style.color = 'green';
		m.style.padding = '10px';
		m.style.fontSize = '18px';
		m.style.textAlign = 'right';
		
		m.innerHTML = '';
		this.mission = m;
		document.getElementById('world').appendChild(m);
		
		this.hp = hp;
		
		this.kills = document.createElement('div');
		this.kills.innerHTML = 'Kills: 0 <br/> Missiles Fired: 0';
		e.appendChild(this.kills);
		document.getElementById('world').appendChild(e);
		
		s = document.createElement('div');
		s.style.position = 'absolute';
		s.style.top = '0px';
		s.style.left = '0px';
		s.style.width = '200px';
		s.style.height = '30px';
		s.style.color = 'green';
		s.style.padding = '10px';
		s.style.fontSize = '22px';
		s.innerHTML = 'Score: '
		this.score = document.createElement('span')
		this.score.innerHTML = 0;
		s.appendChild(this.score);
		
		if(!window.localStorage.highScore) window.localStorage.highScore = 0;
		
		hs = document.createElement('div')
		hs.innerHTML = 'High Score:'+ window.localStorage.highScore;
		hs.style.fontSize = '12px';
		s.appendChild(hs);
		document.getElementById('world').appendChild(s);
		
		
	}
	
	this.checkMissionBacklog = function(){
		if((this.missionQueue.length != 0) && (this.hudDisplay == null || this.hudDisplay.done)){
			this.hudDisplay = new this.missionDisplay(this.missionQueue.shift(),this.mission);
		}
	}
	this.displayMission = function(missionText,queue){
		// dont display new hud message if one is already up
		if(this.hudDisplay == null || this.hudDisplay.done){ 
			this.hudDisplay = new this.missionDisplay(missionText,this.mission);
		}else{
			if(queue != 0){
				this.missionQueue.push(missionText);
			}
		}
		
		
		/*
			this.mission.innerHTML = mission;
			
		  
			setTimeout(function(){
				self.mission.innerHTML = '';	
			},5000);
	*/
	}
	this.missionDisplay = function(mission,container){
		this.mission = mission;
		this.step =0;
		this.len = mission.length;
		this.container = container;
		this.done = false;
		var self = this;
		
		this.type = function(){
			if(this.step < this.len){
				setTimeout(function(){
					self.container.innerHTML += self.mission.charAt(self.step);	
					self.step++;
					self.type();
				},60);
			}else{
				//
				setTimeout(function(){
					self.container.innerHTML = '';
					self.done =true;
				},1500);
			}
		}
		
		this.type();
	
	}
	
	
	this.update = function(){
		this.kills.innerHTML = 'Kills: '+ this.game.killcount + '<br/> Missiles Fired: ' + this.game.missilecount;
		
		this.score.innerHTML  = (this.game.killcount*100)+(this.game.hitcount-this.game.missilecount);
		
		this.displayHP(game.ship.hp);
		
		this.checkMissionBacklog();
		//
	}
	this.displayHP = function(newHp){
		this.hp.style.width = newHp+'px';
		if(newHp < 50){
			this.hp.style.background = 'yellow';
		}
		if(newHp < 10){
			//display warning
			if(this.dmgCritical == false){
				game.hud.displayMission("Critical damage has been detected. Advise immediate disengagement.");
			}
			this.dmgCritical =true;
			this.hp.style.background = 'red';
			
		}
	}
	this.create();
}
/**
 *
 *
 *
 */
function Engine(){
		//Create Zoneing object (kinda a mapper)
		this.a = new Zone(0,0);
		//Create the ship the user will be flying
		this.ship = new Ship('ship');
		this.missiles = Array();
		this.enemies = Array();
		this.hud = new HUD(this);
		this.playing = true;
		this.killcount = 0;
		this.missilecount =0;
		this.hitcount=0;
		
		/**
		* Run
		* Called by the main game loop, handles figureing out what buttons are being pressed, moving the ship
		* and eventually will probably call all the colision detection and animation stuff too.
		*/
		this.run = function(){
			if(this.playing == false) return;
			//do player move
			this.move();
			//do Missile moves
			this.missileRun();
			//Do Bad guy Moves
			this.runEnemies();
			//Update HUB
			this.hud.update();
			
			//Controls
			if(fwd){ this.ship.accelerate(); }else{ this.ship.slow();}
			
			if(bkw){ this.ship.sbreak(); }
			if(right){	this.ship.turn('right'); }
			if(left){	this.ship.turn('left'); }
			
			if(fire){	this.ship.fire(); }
		}
		
		//Move the ship (or as is actually happening, move the world!)
		this.move = function(){
		
					/*
					xSpeed += thrust*Math.sin(_rotation*(Math.PI/180));
					ySpeed += thrust*Math.cos(_rotation*(Math.PI/180));
					*/
		
		
			//Use the current speed and angle to work out ships new position
				//nx = this.ship.speed * Math.sin(this.ship.rotation*(Math.PI/180));
				//ny = this.ship.speed * Math.cos(this.ship.rotation*(Math.PI/180));
				nx = this.ship.xSpeed;
				ny = this.ship.ySpeed;
			//Invert it, since its the world thats moving
			//this.ship.x = this.ship.x+nx;
			//this.ship.y = this.ship.y+(-1*ny);
			
			
			
			nx= Math.floor(nx*-1);
			ny= Math.floor(ny*-1);
			
			
			this.ship.x = (this.ship.x - nx);
			this.ship.y = (this.ship.y + ny);
			
			
			//Apply it to the world (the px that come up from style values are kinda annoying :[ )
			this.a.ref.style.top = (parseInt(this.a.ref.style.top) - ny) + 'px';
			this.a.ref.style.left = (parseInt(this.a.ref.style.left) + nx) + 'px';
			//Check if we need to render any new space on the map (or remove unused space)
			this.a.renderCheck();
		}
		
		
		//Enimies
		this.createEnemy = function(x,y,angle,type){
			if(type == 'bdart'){
				bg = new BlueDart(x,y,angle); 
			}else{
				bg = new BigRed(x,y,angle); 
			}
			this.enemies.push(bg);
		}
		this.runEnemies = function(){
			if(this.enemies.length == 0) return;
			
			for(var e in this.enemies)
			{
				//if this returns false, missile has exploded
				if(this.enemies[e].run() == false){
					delete(this.enemies[e]);
					this.enemies.splice(e,1);
				}else{
					this.shipCollisonTestMe(this.enemies[e],this.enemies[e].x,this.enemies[e].y);
				}
				
				
				
			}
		}
		
		//Missiles
		this.createMissile = function(x,y,angle,profile){
			m = new Missile(x, y, angle, profile);
			this.missiles.push(m);
		}
		this.missileRun = function(){
			if(this.missiles.length == 0) return;
			for(var m in this.missiles)
			{
				//if this returns false, missile has exploded
				if(this.missiles[m].run() == false){
					delete(this.missiles[m]);
					this.missiles.splice(m,1);
				}else{
					if(this.missiles[m].armed){
						this.collisionTestEnemies(this.missiles[m],this.missiles[m].x,this.missiles[m].y);
						this.collisonTestMe(this.missiles[m],this.missiles[m].x,this.missiles[m].y);
					}
				}
			}
		}
		
		this.shipCollisonTestMe = function(enemy,x,y){
		
				shipX = this.ship.x;
				shipY = this.ship.y;
		
				xdiff = x - shipX;//200 100 = 100 200 150 = 50 (-200 -60 = -240
				ydiff = y - shipY;
				if((xdiff < 100 && xdiff > -100 )&& (ydiff < 100 && ydiff > -100)){
				
					a = this.ship.angle % 180;
					if(a > 45 && a < 135){
						xadd=30;yadd=20;
					}else{
						xadd=20;yadd=30;
					}	
					b = enemy.angle % 180;
					if(b > 45 && b < 135){
						e_xadd=80;e_yadd=40;
					}else{
						e_xadd=40;e_yadd=80;
					}	
					
					if (shipX < x+e_xadd && 
						shipX+xadd > x &&
						shipY < y+e_yadd && 
						shipY+yadd > y){
						
							game.hud.displayMission('Collision with enemy ship detected. Please watch where you are flying.');
							this.ship.damage(25);
							enemy.damage(25);
							
						}
				
				}
				
		}
		this.collisonTestMe = function(missile,x,y){
			
				shipX = this.ship.x;
				shipY = this.ship.y;
		
				xdiff = x - shipX;//200 100 = 100 200 150 = 50 (-200 -60 = -240
				ydiff = y - shipY;
				//console.log(xdiff +'*'+ydiff);
				if((xdiff < 100 && xdiff > -100 )&& (ydiff < 100 && ydiff > -100)){
				
				
					a = this.ship.angle % 180;
					if(a > 45 && a < 135){
						xadd=30;yadd=20;
					}else{
						xadd=20;yadd=30;
					}		
					
					
					if (shipX < x+5 && 
						shipX+xadd > x &&
						shipY < y+5 && 
						shipY+yadd > y){
						
							console.log('You dun been hit');
							this.ship.damage(missile.damage);
							missile.explode();
						}
				
				}
		
		
		}
		//Collision detection hurts me brain, need to find a bettr solution for this bit.
		this.collisionTestEnemies = function(missile,x,y){
		
		
			for(var e in this.enemies)
			{	
				xdiff = x - this.enemies[e].x;//200 100 = 100 200 150 = 50 (-200 -60 = -240
				ydiff = y - this.enemies[e].y;
				//console.log(xdiff +'*'+ydiff);
				if((xdiff < 100 && xdiff > -100 )&& (ydiff < 100 && ydiff > -100)){
					//console.log(xdiff +'*'+ydiff);
					//console.log('in range');
					
					tmpX = this.enemies[e].x;
					tmpY = this.enemies[e].y;
					
					
					a = this.enemies[e].angle % 180;
					if(a > 45 && a < 135){
						xadd=80;yadd=40;
					}else{
						xadd=40;yadd=80;
					}			
					//console.log(a);
					//isPointInPath()
					if (tmpX < x+5 && 
						tmpX+xadd > x &&
						tmpY < y+5 && 
						tmpY+yadd > y){
						
						
						/*
						http://www.ragestorm.net/tutorial?id=22
						dx1 = Left-A.x; dx2 = Right-A.x; // Calculate difference
	ext1 = A.y;
	// If A.x is within x=Left and x=Right, this is the exterimity,
	// otherwise, it will be used to calculate dy (= A.y-B.y or A.y-(-B.y) = ext-B.y or ext+B.y).

	if (dx1*dx2 > 0)
	{
	 dx = A.x;
         // dx = (A.x-B.x),    dy = (A.y-B.y),    dx1 = (Right-A.x)
	 if (dx1 < 0) { dx -= B.x; ext1 -= B.y; dx1 = dx2; }
         // dx = (A.x-(-B.x)), dy = (A.y-(-B.y))  dx1 = (Left-A.x)
	 else         { dx += B.x; ext1 += B.y; }
         // ext1 = A.y + (dy/dx)*dx1
	 ext1 *= dx1; ext1 /= dx; ext1 += A.y;
	}
	
	
	*/
						
						this.enemies[e].damage(missile.damage);
						missile.explode();
						this.hitcount++;
							//console.log(tmpX+ '*'+ tmpY);
							//console.log(tmpX+xadd+ '*'+ (tmpY+yadd));
							//console.log(x+ '-'+ y);
						
							//console.log('BANG!');
							
							/*
							f = document.createElement('div');
							f.style.width = xadd+'px';
							f.style.height = yadd+'px';
							f.style.background ='#ff0000';
							f.style.position = 'absolute';
							f.style.top = Math.round(this.enemies[e].y) +'px';
							f.style.left = Math.round(this.enemies[e].x) +'px'
							document.getElementById('zone').appendChild(f);
							*/
						}
					
					
				}

				
			}
		}
	
		this.hud.displayMission("Initializing command uplink.");
		this.hud.displayMission("Connection to Frontier patrol grid established.");
		this.hud.displayMission("Fly safe Commander.");
	}
	/**
	* StarField
	* Creates a randomly generated starfield of a given size at provided coordinates
	*
	*/
	function StarField(zone,size){
			//Save provied values
			this.x = size.x;
			this.y = size.y;
			//Settings and place holders
			this.zone = null;
			this.maxSize = 28;
			this.minSize = 6;
			this.zone = zone;
			this.starCache = null;

			
			//Make some stars
			this.render = function(amount,tile){
			
			
			
				if(this.starCache != null){ 
					a = this.starCache.cloneNode(true);
					a.id = 'z'+tile.x+'.'+tile.y;
					a.style.top =  (tile.y*this.y)+'px';
					a.style.left = (tile.x*this.x) +'px'
					this.zone.appendChild(a); 
					return;
				}
			
				var temp;
				//Create div for this starfield
				z = document.createElement('div');
				z.id = 'z'+tile.x+'.'+tile.y;
				z.style.position ='absolute';
				z.className = 'starTile';
				z.style.top =  (tile.y*this.y)+'px';
				z.style.left = (tile.x*this.x) +'px';
				z.style.height = this.y+'px';
				z.style.width = this.x+'px'
				
				this.zone.appendChild(z);
				//work out how much bigger than the min the star can get
				starSize = this.maxSize - this.minSize;
				//Create the amount of stars ask for
				for(i = 0; i < amount;i++){
					temp = document.createElement('div');
					temp.innerHTML = '.';
					temp.className ='star';
					temp.style.left = this.rand(this.x)+'px';
					temp.style.top = this.rand(this.y)+'px';
					temp.style.fontSize = this.minSize + this.rand(starSize) +'px';
					//Add created star to starfeild div
					z.appendChild(temp);
					
				}	
				this.starCache = z;				
			}	
			//Slightly nicer rand function
			this.rand = function(max){
				return Math.floor(Math.random()*(max+1));
			}
	}
	
	/**
	* Zone
	* Controls the world in which the game takes place
	* Loading and unloading starfeilds etc
	*
	*/
	function Zone(x,y){
		//Setup the zones varibles
		this.stars = null;
		this.ref = null;
		this.zoneSizeX = worldX;
		this.zoneSizeY = worldY;
		this.cache = new ZoneCache(12);
		this.starsPerZone = 200;
		this.rdone = Array();	
		
		//Init the arrays
		for (var i=0; i < 2000; i++) {
			this.rdone[i] = new Array();
		}

		this.cacheTileX =0;
		this.cacheTileY =0;
		//create the zone
		var z = document.createElement('div');
		z.className = 'zone';
		z.id = 'zone';
		z.style.top = y +'px'; 
		z.style.left = x +'px';
		//z.style.height = worldY+'px';
		//z.style.width = worldX+'px'
		//Add missiles zone
		m = document.createElement('div');
		m.id = 'missiles';
		z.appendChild(m);
		e = document.createElement('div');
		e.id = 'enemies';
		z.appendChild(e);
		
		
		//setup starfeild generator
		this.stars = new StarField(z,new Coord(this.zoneSizeX,this.zoneSizeY));
		
		document.getElementById('world').appendChild(z);
		this.ref = z;
			
		this.renderArea = function(xtile,ytile){
			if(this.rdone[xtile+1000][ytile+1000] != true){
				console.log('rendering for  X:' + xtile + ' Y:' + ytile);
				this.stars.render(this.starsPerZone ,new Coord(xtile, ytile));
				this.rdone[xtile+1000][ytile+1000] = true;
				this.cache.addZone(new Coord(xtile,ytile));
				this.spawnGameItems(xtile,ytile);
			}
		}


		this.spawnGameItems = function(xTile,yTile){
			//spawns
			x_coord = xTile*this.zoneSizeX;
			y_coord = yTile*this.zoneSizeY;
			
			r = this.rand(100);
			
			if(r == 48){
				game.createEnemy(x_coord,y_coord,0);
				game.createEnemy((x_coord+200),(y_coord+200),0);
				game.createEnemy((x_coord+400),(y_coord ),0);
				game.createEnemy((x_coord+600),(y_coord ),0);
				game.createEnemy((x_coord+800),(y_coord ),0);
				game.createEnemy((x_coord+800),(y_coord+800),180);
				game.createEnemy((x_coord+500),(y_coord+800),180);
				//MSG
				game.hud.displayMission("Warning. Muliple hostile's detected!");
			}else if(r==85 || r==86 || r == 3){
				game.createEnemy((x_coord+20),(y_coord+20),180);
				//MSG
				game.hud.displayMission("Warning. Scout detected.");
			}else if(r==30){
				game.createEnemy((x_coord+20),(y_coord+20),180);
				game.createEnemy((x_coord+400),(y_coord+20),180);
				game.createEnemy((x_coord+800),(y_coord+20),180);
				//MSG
				game.hud.displayMission("Warning. Hostile's detected.");
			}else if(r==99){
				game.createEnemy((x_coord+20),(y_coord+20),180,'bdart');
				game.createEnemy((x_coord+800),(y_coord+800),180,'bdart');
				game.hud.displayMission("Warning. Hostiles apporching at high speed.");
			}
			
			
			
		}		
		this.renderCheck = function(){

				//work out which tile the user is in.
				xtile = Math.round(-parseInt(this.ref.style.left)/this.zoneSizeX);
				ytile = Math.round(-parseInt(this.ref.style.top)/this.zoneSizeY);
				
				//render self
				this.renderArea(xtile,ytile);
				
				//render any ajacent
				this.renderArea(xtile+1,ytile);
				this.renderArea(xtile-1,ytile);
				this.renderArea(xtile,ytile+1);
				this.renderArea(xtile,ytile-1);
				this.renderArea(xtile+1,ytile+1);
				this.renderArea(xtile-1,ytile-1);
				this.renderArea(xtile+1,ytile-1);
				this.renderArea(xtile-1,ytile+1);
				
				//Unrender any unused.
				toRemove = this.cache.getZonesToRemove();
				if(toRemove != false){
					this.removeZones(toRemove);
				}
		
		}
		
		this.removeZones = function(toRemove){
			parent = document.getElementById('zone');
			for(var z in toRemove)
			{
				parent.removeChild(document.getElementById('z'+toRemove[z].x+'.'+toRemove[z].y));
				console.log('Removing Tile X:' + toRemove[z].x + ' Y:' + toRemove[z].y);
				this.rdone[toRemove[z].x+1000][toRemove[z].y+1000] = false;
			}
		}

		this.rand = function(max){
			return Math.floor(Math.random()*(max+1));
		}		
			

	}
	
	function ZoneCache(size){
		
		this.cacheAmount = size; // zones to cache
		this.zones = Array();
		this.oldestItem = 0;
		
		this.addZone = function(coord){
			this.zones.push(coord);
		}
		
		this.getZonesToRemove = function(){
			if((this.zones.length-this.oldestItem) > this.cacheAmount){
				from = this.oldestItem;
				this.oldestItem = (this.zones.length-this.cacheAmount);
				return this.zones.slice(from,this.zones.length-this.cacheAmount);
			}else{
				return false;
			}
		}			
	}
	/**
	 * Cooord
	 * Defines a coordinate in a zone
	 * @param x position on x axis
	 * @param y position on y axis
	 */
	function Coord(x,y){
		this.x = x;
		this.y = y;
	}
	
	/**
	 * Missile Profile
	 * Defines a missiles specs (speed, damage, color etc
	 *
	 */
	function MissileProfile(startSpeed,maxSpeed,distance,color,damage,armafter){
		this.speed = startSpeed;
		this.maxSpeed = maxSpeed;
		this.distance = distance;
		this.color = color;
		this.damage = damage;
		this.armafter = armafter;
	}
	
	/**
	 * Ship
	 * This is the player themselves
	 *
	 */
	function Ship(shipName) {
		
		//nature
		this.dragPower = 0.99;
		
		//Ship power
		this.maxSpeed = 40;
		this.breakPower = 0.9;
		this.accelPower = 2;
		this.rotateSpeed = 10;
		this.xSpeed =0;
		this.ySpeed = 0;
		//Objects
		this.flame = null;
		this.flameFlip = 0;
		//Weapon limits
		this.weaponLimiter = new Date();
		this.fireRate = 150; //In miliseconds
		this.hp = 100;
		
		this.x = (worldX/2);
		this.y = (worldY/2);
		this.rotate = function(x){
		
			this.rotation = this.rotation + x;
			this.rotateObj(this.rotation,this.ship)

		}
		this.rotateObj = function(x,obj){
			obj.style.MozTransform="rotate("+x+"deg)";
			obj.style.WebkitTransform="rotate("+x+"deg)";
			obj.style.OTransform="rotate("+x+"deg)";
			obj.style.Transform="rotate("+x+"deg)";
		}
		
		
		this.sbreak = function(){
		
		//console.log(this.xSpeed +'*' + this.ySpeed);
			if((this.xSpeed < 0.8 && this.xSpeed > -0.8) && (this.ySpeed < 0.8 && this.ySpeed > -0.8)){
				this.xSpeed = 0;
				this.ySpeed = 0;
			}else{
				this.xSpeed = (this.xSpeed*this.breakPower);
				this.ySpeed = (this.ySpeed*this.breakPower);
			}
			/*
			if(this.speed > 0){
				if((this.speed - this.breakPower) < 0){
					this.speed = 0;
				}else{
					this.speed = this.speed - this.breakPower;
				}
			}
			*/
		}
		
		
		this.accelerate = function(){
			    this.animateBoost();
				//if(((this.xSpeed + this.ySpeed) < this.maxSpeed) && ((this.xSpeed + this.ySpeed) > -this.maxSpeed)){
					//if(this.xSpeed < this.maxSpeed && this.xSpeed > -this.maxSpeed){
					//	this.xSpeed +
					//}
					nx = this.accelPower*Math.sin(this.rotation*(Math.PI/180));
					ny = this.accelPower*Math.cos(this.rotation*(Math.PI/180));
					//right
					if((nx > 0) && this.xSpeed < this.maxSpeed){
						this.xSpeed += nx;
					}
					//left
					if((nx < 0) && this.xSpeed > -this.maxSpeed){
						this.xSpeed += nx;
					}
					//up
					if((ny > 0) && this.ySpeed < this.maxSpeed){
						this.ySpeed += ny;
					}
					//down
					if((ny < 0) && this.ySpeed > -this.maxSpeed){
						this.ySpeed += ny;
					}
					
					
				//}
			/*
			if(this.speed < this.maxSpeed){
				this.speed = this.speed + this.accelPower;
				//astroids style
			
			}
			*/
		}
		this.slow = function(){
			if((this.xSpeed < 0.8 && this.xSpeed > -0.8) && (this.ySpeed < 0.8 && this.ySpeed > -0.8)){
				this.xSpeed = 0;
				this.ySpeed = 0;
			}else{
				this.xSpeed = (this.xSpeed*this.dragPower);
				this.ySpeed = (this.ySpeed*this.dragPower);
			}
			if(this.flame != null) this.flame.style.display = 'none';
		/*
			if(this.speed > 0){
				if((this.speed - this.dragPower) < 0){
					this.speed = 0;
				}else{
					this.speed = this.speed - this.dragPower;
				}
			}
			if(this.flame != null) this.flame.style.display = 'none';
			*/
		}
		
		
		this.animateBoost = function(){
		
			if(this.flame == null){
				var flame = document.createElement('canvas');
				flame.id = 'flame';
				flame.width ='20'; // setting widths and heights in css breaks canvas scaling it seems.
				flame.height = '50';
				flame.style.left = this.x + 'px';
				flame.style.top = this.y +'px';
				flame.style.position = 'absolute';
			
				canvas = flame.getContext("2d")
				
				canvas.beginPath();
				canvas.moveTo(4, 31);
				canvas.lineTo(10, 46);
				canvas.lineTo(16, 31);
				canvas.lineTo(4, 31);
				
				//canvas.moveTo(6, 1); // give the (x,y) coordinates
				//canvas.lineTo(0, 20);
				//canvas.lineTo(12, 20);
				//canvas.lineTo(6, 1);
				
				canvas.fillStyle = "rgb(255,0,0)";
				canvas.fill();
				
				document.getElementById('world').appendChild(flame);
				this.flame = flame;
			}
			this.flame.style.display = 'block';
			
		//	nx = 20 * Math.sin(ship.rotation*(Math.PI/180));
		//	ny = 20 * Math.cos(ship.rotation*(Math.PI/180));
			
			this.rotateObj(this.rotation,this.flame);
			
			if(this.flameFlip > 4) {this.flameFlip = 0; } 
			this.flameFlip++;
			
			if(this.flameFlip <= 2){
				this.flame.getContext("2d").fillStyle = "rgb(255,255,0)";
				this.flame.getContext("2d").fill();
			}else{
				this.flame.getContext("2d").fillStyle = "rgb(255,0,0)";
				this.flame.getContext("2d").fill();
			}
			
		}
		
		this.damage = function(dmg){
		
			this.hp -= dmg;
		
			if(this.hp < 1){
				score = (game.killcount*100)-game.missilecount;
				store = window.localStorage;
				if(!store.highScore) store.highScore = 0;
				if(store.highScore < score) store.highScore = score;
				document.body.innerHTML = '<div style="color:#fff;text-align:center;margin:100px;"><h1>Game over :(</h1><br/><br/>Score: '+score + '<br/>High Score: '+ store.highScore + '</div>';
				game.playing = false;
			}
		}
		
		this.fire = function(){
			//rate limit
			if((new Date()-this.weaponLimiter) > this.fireRate){
				game.createMissile(this.x+5,this.y+20,this.rotation,new MissileProfile(50,60,100,'green',5,2));
				//game.createMissile(-parseInt(game.a.ref.style.left)+(worldX/2),-parseInt(game.a.ref.style.top)+(worldY/2),this.rotation,new MissileProfile(40,60,100,'green',5,1));
				this.weaponLimiter = new Date();
				game.missilecount++;
			}
		}
		
		
		
		
		
		
		this.turn = function(direction){
			if(direction == 'right'){
				this.rotate(this.rotateSpeed);
			}else{
				this.rotate(-this.rotateSpeed);
			}
		}
		
		this.create = function() {
			if(this.ship != null) return;
			
			
			//create the Object
			var shipObj = document.createElement('canvas');
			shipObj.id = shipName;
			
			shipObj.style.position = 'absolute';
			shipObj.style.left = (worldX/2) + 'px';
			shipObj.style.top = (worldY/2) + 'px';
			shipObj.width = '20';
			shipObj.height = '50';
			shipObj.style.zIndex ='100';
			
			//Add it to the page
			document.getElementById('world').appendChild(shipObj);
			//Draw the ship
			canvas = shipObj.getContext("2d");
			
			//canvas.translate(60, 10);
			//canvas.rotate(40 * Math.PI / 180);
			canvas.beginPath();
			canvas.moveTo(10, 1); // give the (x,y) coordinates
			canvas.lineTo(0, 30);
			canvas.lineTo(20, 30);
			canvas.lineTo(10, 1);
			
			canvas.fillStyle = "rgb(50,50,50)";
			canvas.fill();
			canvas.strokeStyle = "rgb(255,255,255)";
			canvas.stroke();
			
			
			//return reference to object
			return shipObj;
		}
		
		
		this.speed = 0;
		this.ship = this.create();
		this.shipName = shipName;
		this.rotation = 0;
	}
	
	

	/**
	 * Bad Guy
	 * Don't trust em, their bad
	 *
	 */
	function BadGuy(){
		//create basic ship vars
		this.init = function(x,y,angle){
			this.x = x;
			this.y = y;
			this.angle = angle;
			this.limiter = new Date();
			this.exploded = false;
		}
		//default AI
		this.run = function(){
		
			if(this.exploded) return false;
			//Really stupid AI (but with good aim)
			playerFromMeAngle = Math.atan2((game.ship.y-this.y), game.ship.x-this.x)*(180/Math.PI)+90;
			playerDistance = (game.ship.y-this.y) + (game.ship.x-this.x);
			
			
			if(playerDistance  < 0){ playerDistance = -playerDistance;}
			
			
			if(playerDistance > 180){
				if(playerFromMeAngle > this.angle){
					this.angle = this.angle + this.turnSpeed;
				}else{
					this.angle = this.angle - this.turnSpeed;
				}
			}else{
					this.angle = this.angle + this.turnSpeed+1;
			}
			this.rotateObj(this.angle,this.ref);
			this.move();
			
			//fire at us
			this.fire(playerFromMeAngle);
		}
		//We be hiT!
		this.damage = function(dmg){
			this.hp = this.hp - dmg;
			
			if(this.hp < 1){
				this.explode();
				game.killcount++;
				game.hud.displayMission("Enemy combatant destroyed.",0);
				
			}
		}
		//Fire capin'
		this.fire = function(dir){
			//console.log(this.playerDistance);
			if((new Date()-this.limiter) > this.fireRate){
				a = game.createMissile(this.x, this.y, dir+(Math.floor(Math.random()*11)), this.missileType);
				this.limiter = new Date();
			}
		} 
		
	}
	BadGuy.inherits(spaceObject);
	
	/**
	 * Missile
	 * Projectiles fired by ship's
	 * 
	 */
	function Missile(x,y,angle,profile){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.damage =  profile.damage;
		
		this.speed = profile.speed;
		this.maxSpeed = profile.maxSpeed;
		
		this.armed = false;
		this.exploded = false;
		this.ref = null;
		this.maxDistance = profile.distance;
		this.distanceCovered = 0;
		
		var self = this;
		
		this.run = function run(){
		
			if(this.exploded) return false;
			
			if(this.speed < this.maxSpeed){
				this.speed = this.speed+1;
			}
			this.move();
			 
			this.distanceCovered++;
			
			if(this.distanceCovered >  profile.armafter){ this.armed = true; }
			
			if(this.distanceCovered > this.maxDistance){
				this.explode();
				return false;
			}else{
				return true;
			}
			
		}
		
		
		this.create = function(){
			var m = document.createElement('canvas');
			m.className = 'missle';
			

			
			m.style.position = 'absolute';
			m.style.top = this.y +'px'; 
			m.style.left = this.x +'px';
			m.height = '5';
			m.width = '5';
			//m.style.color = profile.color;//'#00ff00';
			this.ref = m;	
			document.getElementById('missiles').appendChild(m);
			c  = m.getContext("2d");
			c.fillStyle = profile.color;
			c.fillRect(0, 0, 5, 5);
			
		}
		this.create();
	
	}
    Missile.inherits(spaceObject);

	
	
	function BigRed(x,y,angle){
	
		this.init(x,y,angle);
		this.maxspeed = 10;
		this.speed = 2;
		this.hp = 25;
		this.fireRate = 1000;
		this.turnSpeed = 1;
		
		this.missileType = new MissileProfile(10,25,80,'red',2,6);
		this.create = function(){
			badguy = document.createElement('canvas');
			
			badguy.style.position = 'absolute';
			badguy.style.left = this.x + 'px';
			badguy.style.top = this.y + 'px';
			badguy.width = '40';
			badguy.height = '80';
			badguy.style.zIndex ='100';
			
			document.getElementById('enemies').appendChild(badguy);
			
			canvas = badguy.getContext("2d");
			
			//canvas.translate(60, 10);
			//canvas.rotate(40 * Math.PI / 180);
			canvas.beginPath();
			canvas.moveTo(20, 0); // give the (x,y) coordinates
			canvas.lineTo(0, 80);
			canvas.lineTo(40, 80);
			canvas.lineTo(20, 0);
			
			canvas.fillStyle = "rgb(255,0,0)";
			canvas.fill();
			
			//Add it to the page
			
			//Draw the ship
			return badguy;
		}
		
		this.ref = this.create();
	
	}
	BigRed.inherits(BadGuy);
	
	function BlueDart(x,y,angle){
		this.init(x,y,angle);
		this.maxspeed = 25;
		this.speed = 15;
		this.hp = 15;
		this.fireRate = 800;
		this.turnSpeed = 3;
		this.missileType = new MissileProfile(25,30,80,'blue',10,5);
		
		this.create = function(){
			badguy = document.createElement('canvas');
			
			badguy.style.position = 'absolute';
			badguy.style.left = this.x + 'px';
			badguy.style.top = this.y + 'px';
			badguy.width = '36';
			badguy.height = '60';
			badguy.style.zIndex ='100';
			
			document.getElementById('enemies').appendChild(badguy);
			
			canvas = badguy.getContext("2d");
			
			//canvas.translate(60, 10);
			//canvas.rotate(40 * Math.PI / 180);
			
			canvas.beginPath();
			canvas.moveTo(18, 0); // give the (x,y) coordinates
			canvas.lineTo(0, 55);
			canvas.lineTo(36, 55);
			canvas.lineTo(18, 0);
			canvas.fillStyle = "rgb(255,255,0)";
			canvas.fill();
			
			canvas.beginPath();
			canvas.moveTo(18, 2); // give the (x,y) coordinates
			canvas.lineTo(7, 55);
			canvas.lineTo(18, 60);
			canvas.lineTo(29, 55);
			canvas.lineTo(18, 2);
			
			canvas.fillStyle = "rgb(0,0,255)";
			canvas.fill();
			
			//Add it to the page
			
			//Draw the ship
			return badguy;
		}
	
		this.ref = this.create();
	}
	BlueDart.inherits(BadGuy);
	
	
	
/**
* Initialize Game
* 
* Setup basic divs, globals etc and start the game running :p
*
*/
 function initialize(){
	//remove welcome div
	document.body.removeChild(document.getElementById('velcome'));
	//set globals
	worldX = window.innerWidth-20;
	worldY = window.innerHeight-20;
	//Create world Div
	world = document.createElement('div');
	world.id ='world';
	world.style.height = worldY+'px';
	world.style.width = worldX+'px';
	document.body.appendChild(world);
	//Start Game Engine
	game = new Engine();
	window.setInterval('game.run()', 80);

	//Map Keys
	document.onkeydown = function(e){
		if(e.keyCode == 38 || e.keyCode == 87){
			fwd = true;
		}
		if(e.keyCode == 39 || e.keyCode == 68){
			right = true;
		}
		if(e.keyCode == 37 || e.keyCode == 65){
			left = true;
		}
		if(e.keyCode == 40 || e.keyCode == 83){
			bkw = true;
		}
		
		//fire!
		if(e.keyCode == 32){
			fire = true;
		}

	}
	document.onkeyup = function(e){
		if(e.keyCode == 38 || e.keyCode == 87){
			fwd = false;
		}
		if(e.keyCode == 39 || e.keyCode == 68){
			right = false;
		}
		if(e.keyCode == 37 || e.keyCode == 65){
			left = false;
		}
		if(e.keyCode == 40 || e.keyCode == 83){
			bkw = false;
		}
		//fire!
		if(e.keyCode == 32){
			fire = false;
		}
	}


 }