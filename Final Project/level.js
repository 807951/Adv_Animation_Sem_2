
class Level {

    constructor(gridFile,game) {

		if(gridFile=="DEBUG") { //THIS INITIALIZES A DEFAULT DEBUG LEVEL.
			this.path =[];
			this.width=200;
			this.height=150;
			this.image="images/debug.png";
			this.rawPath=[];
			this.lineVectors=[];
			return;
		}
		
		gridFile = window[gridFile]; //We are converting the string of the level name to the variable we can acess
		this.game = game;
		this.image = gridFile.image; //Getting the background image from a predefined file specified in gridfile
		this.width = gridFile.width; //Getting the grid with from a predefined file specified in gridfile
		this.height = gridFile.height; //Getting the grd height from a predefined file specified in gridfile
		this.rawPath = gridFile.path; //Getting the RAW 2d ARRAY of the path from the gridfile.
		this.compressedPath = [];
		this.finalNodes = [];
		this.lineVectors = []; //Legacy feature, but may be useful one day so I will keep it for a couple updates
		this.waveTimes = gridFile.waveTime;
		
		//THE LEVEL FILE WILL BAKE THE PATH INTO AN EASY TO READ TREE VARIABLE OF WHICH WILL BE USED, but some intiializition needs to happen firstChild
		//So we will wait for bake to be called
		
		
		
		
    }
	
	generateEnemies(difficulty) {
		let enemyCode = [];
		enemyCode.push(difficulty);
		for(let i = 0; i < (difficulty/6); i++) {
			enemyCode.push(new BasicEnemy(this.game));
			
		}
		this.spawnEnemies(enemyCode);
		//return enemyCode;
		
	}

	spawnEnemies = async function(enemyList) {
		let timer = (6500-1830*Math.log(0.1*enemyList[0]));
		if(timer<50) {timer = 50;} 
		console.log(timer);
		if (timer>2000) {timer=2000;}
		//console.log(timer);
		for(let i = 1; i < enemyList.length; i++) {
			//console.log(i);
			this.game.basicEnemies.push(enemyList[i]);
			await this.sleep(timer);
		}
		
		
	}
	
	sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	borderCalculation(game,path) {this.path[0].recursiveBorderInit(game,this);} //Legayc feature, may be useful so keeping it
	
	bake(rawlist,game) { //This converts the 2d array gridfile into a tree variable we can use in the game
		//console.log(game);
		let tree = [];
		let nodes = {};
		for(let i = 0; i < rawlist.length; i++) {
			nodes[rawlist[i][0]] = new TreeNode(rawlist[i][1],rawlist[i][2],rawlist[i][4],game,rawlist[i][5]);
			
			let parent = nodes[rawlist[i][3]];
			nodes[rawlist[i][0]].ancestor=parent;
			if(i==0) { tree.push(nodes[rawlist[i][0]]); }
			else{
				if(parent!=null){parent.children.push(nodes[rawlist[i][0]]);}
			}
		}
		
		this.finalNodes = tree[0].findLastNode();
		this.finalNodes = this.finalNodes.flat(Infinity);
		
		//console.log(this.finalNodes);
		return tree;
	}
	
	
	
	
	
	dist(point, x, y) //Calculates distance from a point to a point
    {
        var dx = x - point.x;
        var dy = y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
	
	distToSegment(point, segmentA, segmentB) //Calculates distance from a line to a point (cloest)
    {
		

        var dx = segmentA.x - segmentB.x;
        var dy = segmentA.y - segmentB.y;
        var l2 = dx * dx + dy * dy;
        
        if (l2 == 0)
            return this.dist(point, segmentB.x, segmentB.y);

        var t = ((point.x - segmentB.x) * dx + (point.y - segmentB.y) * dy) / l2;
        t = Math.max(0, Math.min(1, t));

        return this.dist(point, segmentB.x + t * dx, segmentB.y + t * dy);
    }
	

	getCollision(locationVector) { //You can use this if you want, with a vision I had for the game this would be useful but not so much anymore
	//Basically, it just gets wether you are intersecting the path or not. Go and create any feature you want with this, or not.
	
		
		

		for(let i = 0; i < this.lineVectors.length; i++) {

			let distance = this.distToSegment(locationVector, this.lineVectors[i][0],this.lineVectors[i][1]);

			if(distance < this.lineVectors[i][2]) { return true; }
		}
		
		return false;
		
	}
	
	
	
	getImage() { return this.image; } //Just returns its variables
	getPathLength() { return this.path.length; }
	getWidth() { return this.width; }
	getHeight() { return this.height; }
	getPath()  { return this.path; }
	getHealth() { return this.health; }
	
	render(ctx) {
		//Just renders the path, will be gutted later.
		for(let i = 0; i < this.lineVectors.length; i++) {
			ctx.strokeStyle = "rgb(255, 0, 255)";
		
			ctx.lineWidth = this.lineVectors[i][2];
			ctx.lineCap = "round"
			ctx.beginPath();
			ctx.moveTo(this.lineVectors[i][0].x, this.lineVectors[i][0].y);
			ctx.lineTo(this.lineVectors[i][1].x, this.lineVectors[i][1].y);
			ctx.stroke();
		}
		
		
		
	}
	debug() { //just for debugging, so you can see what all these variables are set to. Not actively used.
		console.log(this.getImage());
		console.log(this.getWidth());	
		console.log(this.getHeight());
		console.log(this.getPath());
	}

 }
    
  

