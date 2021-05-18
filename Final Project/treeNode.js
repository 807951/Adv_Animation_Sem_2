class TreeNode {
	
	constructor(x,y,dilate,game,type) {
		this.gridLoc = new JSVector(x,y); //This is its location IN THE GRID
		this.children = []; //This is all the nodes this node will lead to
		this.dialate = dilate; //This is a legacy feature that could be useful so I will keep it. It basically controls the width of the path.
		this.editorName = Math.random(0,10000000000); //This is its ID it generates for the level editor
		this.mouseSelected = false; //This has to do with the editor, if it is selected
		this.ancestor = null;
		this.editorOwner = null; //This is to keep track who owns it in the editor
		let realX = game.cellWidth*x+game.bounds.left+game.cellWidth/2; //This is its REAL X LOCATION
        let realY = game.cellHeight*y+game.bounds.top+game.cellHeight/2; //This is its real Y LOCATION
		this.loc = new JSVector(realX,realY); //This is the vector of the real location
		if(this.type==null) { this.type="GENERIC"; }
		this.type=type;
		this.health = 255;
		
		//console.log(this.type);
		
	}
	
	findLastNode(node) {
		let nodes = [];
		if(this.children.length==0) { return this; }
		for(let i = 0; i < this.children.length; i++) {
			nodes.push(this.children[i].findLastNode(nodes));
			
		}
		//console.log(nodes);
		return nodes;
		
	}
	
	flattenNode(node) {
		let nodes = [];
		//if(this.children.length==0) { return this; }
		for(let i = 0; i < this.children.length; i++) {
			nodes.push(this.children[i].flattenNode(nodes));
			
		}
		//console.log(nodes);
		nodes.push(this);
		return nodes.flat(Infinity);
		
		
	}
	
	render(game) {
		let ctx = game.context1;
		let ctx2 = game.context2;
		
		if(this.children.length==0) {
			ctx.beginPath();
			ctx.strokeStyle = "blue";
			ctx.fillStyle = "rgb("+this.health+", "+this.health+", "+this.health+")";
			ctx.arc(this.loc.x, this.loc.y, 40, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();
			
			
			ctx2.strokeStyle = "blue";
			ctx2.fillStyle = "blue";
			ctx2.beginPath();
			ctx2.arc(this.loc.x, this.loc.y, 40, 0, 2 * Math.PI, false);
			ctx2.fill();
			ctx2.stroke();
			return;
		}
		
		for(let i = 0; i < this.children.length; i++) {
			this.children[i].render(game);
		}
		
		/*//This is just the rendering function, there isn't much to it
		let ctx = game.context1;
		let ctx2 = game.context2;

		ctx.beginPath();

		ctx.lineWidth=50;

		
		if(this.children.length==0) {
			//console.log('hi');
			ctx.strokeStyle = "rgb(122, 122, 255)";
			ctx.fillStyle = "rgb(122, 122, 255)";
			ctx.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI, false);
			
		}
		
		ctx.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI, false);
		if(this.mouseSelected) { ctx.fillStyle = "rgb(0, 0, 255)"; }
		else { ctx.fillStyle = "rgb(0, 255, 255)"; }
		ctx.fill();

		//console.log(this.type);
		
		//Renders all the lines plus the children nodes.
		ctx.strokeStyle = "rgb(0, 0, 255)";
		ctx.lineWidth = 20;
		ctx2.strokeStyle = "rgb(0, 0, 255)";
		ctx2.lineWidth = 20;
		for(let i = 0; i < this.children.length; i++) {
			ctx.beginPath();
			ctx.moveTo(this.loc.x, this.loc.y);
			ctx.lineTo(this.children[i].loc.x, this.children[i].loc.y);
			ctx.stroke();

			// draw on map canvas
			ctx2.beginPath();
			ctx2.moveTo(this.loc.x, this.loc.y);
			ctx2.lineTo(this.children[i].loc.x, this.children[i].loc.y);
			ctx2.stroke();

		this.children[i].render(game);}*/
		
	}
	//This has to do with making the lines inbetween the nodes for rendering and collision,
	//Don't worry about this too much, it basically just recursively goes through the tree
	//And makes lines between all the connections
	recursiveBorderInit(game,path) {
		for(let i = 0; i < this.children.length; i++) {
			let val = [];
			
			val.push(this.loc.copy().multiply(game.cellWidth));
			val.push(this.children[i].loc.copy().multiply(game.cellHeight));
			//console.log(val);
			val.push(this.dialate);
			path.lineVectors.push(val);
			this.children[i].recursiveBorderInit(game,path);
			
		}
		
	}
	
	gridToNode(locationVector) {
		
		let distances = [];
		//let distance = this.gridLoc.distanceSquared(locationVector);
		
		let compressed = [];
		compressed.push(this.gridLoc.distanceSquared(locationVector));
		compressed.push(this);
		
		distances.push(compressed);
		for(let i = 0; i < this.children.length; i++) {
			distances.push(this.children[i].gridToNode(locationVector));
			
		}
		
		console.log(distances);
		
		
	}
}