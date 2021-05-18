

class CovidGame {
  constructor() {
    //this.debug = true;
    //if (this.debug) this.level = new Level("DEBUG");

    this.level = new Level("testLevel");

    this.canvas1 = document.getElementById('cnv1');
    this.context1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('cnv2');
    this.context2 = this.canvas2.getContext('2d');
    this.infoCnv = document.getElementById('infoCnv');
    this.context3 = this.infoCnv.getContext('2d');
    this.canvas1Loc = new JSVector();
    this.mouseLoc = new JSVector();
    this.date = new Date();
    this.lerp = this.date.getTime();
    this.lerpTime = 750; // in milliseconds
    this.bounds = {
      top: -1500,
      left: -2000,
      bottom: 1500,
      right: 2000,
      width: 4000,
      height: 3000
    }
    this.img = new Image();
    this.img.src= "assets/lng 1.png";
    this.cash = new Image();
    this.cash.src="assets/cash_logo.png";
    this.liveLogo = new Image();
    this.liveLogo.src = "assets/buttonBackgrounds/sideButtonBackgrounds/heart.png";
    this.score=10; //Value of Score
    this.lives= 30;
    this.economy = 10; // Total Money





        this.canvas1 = document.getElementById('cnv1');
        this.context1 = this.canvas1.getContext('2d');
        this.canvas2 = document.getElementById('cnv2');
        this.context2 = this.canvas2.getContext('2d');
		this.canvas1Loc = new JSVector();
		this.mouseLoc = new JSVector();
		this.date = new Date();
		this.lerp = this.date.getTime();
		this.lerpTime = 750; // in milliseconds

        this.canvas1Loc = new JSVector();
        this.bounds = {
            top: -1500,
            left: -2000,
            bottom: 1500,
            right: 2000,
            width: 4000,
            height: 3000
        }


		//THIS BASICALLY SETS THE LEVEL.

		//this.debug = true;
		if(this.debug) { this.level = new Level("DEBUG",this); }
		else {

			this.level = new Level("testLevel",this); //THE FILE WITH THE NAME IN THE FIRST VARIABLE WILL BE CALLED.

		}

        //  set number of columns, rows and cell width-height
        this.numCols = this.level.getWidth(); //INTIALIZES THE GRID BASED ON LEVEL.
        this.cellWidth = this.bounds.width/this.numCols;
        this.numRows = this.level.getHeight();
        this.cellHeight = this.bounds.height/this.numRows;

        //  set number of cells in bounds
        this.cells = new Array(this.numRows);

        //  load a 2D array of Cell objects
        for(let r=0; r<this.cells.length; r++){
          this.cells[r] = new Array(this.numCols);
          for(let c=0; c<this.numCols; c++){
              this.cells[r][c] = new Cell(this, r, c, false);
          }
        }


		this.level.path = this.level.bake(this.level.rawPath,this);
		//BAKES THE ARRAY FROM OUR LEVEL INTO AN EASY TO WORK WITH TREE
		//THIS IS THE LEVEL PRELOADER
		//console.log(this.level.getPath());
		this.path = this.level.path;  //SETS THIS EASY TO WORK WTH TREE TO THE NEW PATH.

		this.level.compressedPath = this.level.path[0].flattenNode();




        //position canvas to start at first cell row and col
        this.canvas1Loc = new JSVector(this.cells[0][0].loc.x, this.cells[0][0].loc.y);
		    this.canvas1LocTarget = new JSVector(-this.canvas1.width/2, -this.canvas1.height/2);

        // canvas2 is scaled according to the ratio of its
        // height and width to the height and width of the bounds
        // so that the entire world fits within canvas2
        this.scaleX = this.canvas2.width / this.bounds.width;
        this.scaleY = this.canvas2.height / this.bounds.height;
        // add an event handler such that the a, s, w, d keys
        // will reposition the canvas within the bounds.




		//console.log(this.level.lineVectors);

        window.addEventListener("keypress", function (event) {
            switch (event.code) {
				case "KeyR": //This code simply prints all of the nodes made in the level editor
							 //Used for exporting levels
					if(covidGame.debug==true) {
						for(let i = 0; i < covidGame.path.length;i++) {

								console.log("['"+covidGame.path[i].editorName+"',",covidGame.path[i].gridLoc.x,","+covidGame.path[i].gridLoc.y,",'"+covidGame.path[i].editorOwner+"',20],");

						}

					}
                    break;
                case "KeyW":
                    if (covidGame.canvas1Loc.y + 100 > covidGame.bounds.top)
                    covidGame.canvas1LocTarget.y -= 40;
                    break;
                case "KeyS":
                    if (covidGame.canvas1Loc.y + covidGame.canvas1.height - 100 < covidGame.bounds.bottom)
                    covidGame.canvas1LocTarget.y += 40;
                    break;
                case "KeyA":
                    if (covidGame.canvas1Loc.x + 100 > covidGame.bounds.left)
                    covidGame.canvas1LocTarget.x -= 40;
                    break;
                case "KeyD":
                    if (covidGame.canvas1Loc.x + covidGame.canvas1.width - 100 < covidGame.bounds.right)
                    covidGame.canvas1LocTarget.x += 40;
                    break;
                    break;
            }
        }, false);



		this.editorNode = -1; //THIS IS USED DURING DEBUG TO KEEP TRACK OF WHAT S SELECTED
		//this.nodeNumber = 0;
        this.canvas1.addEventListener("click", function(cg){

          let c = Math.floor((cg.offsetX+covidGame.canvas1Loc.x-covidGame.bounds.left)/covidGame.cellWidth);
          let r = Math.floor((cg.offsetY+covidGame.canvas1Loc.y-covidGame.bounds.top)/covidGame.cellHeight);




		  if((c>=0 && c<covidGame.numCols) && (r>=0 && r<covidGame.numRows)){

			if(!covidGame.cells[r][c].occupied) {
				covidGame.cells[r][c].occupied = true; //SETS THE GRID SELECTED TO "OCCUPIED"


				covidGame.loadNeighbors();

				if(covidGame.debug){covidGame.path.push(new TreeNode(c,r,20,covidGame)); } //IF IN LEVEL EDITOR MODE, MAKES A NEW NODE
			}


			//THIS FEATURES ONLY TRIGGER WHEN DEBUG IS ON.
			else if (covidGame.editorNode == -1){ //IF NO NODE IS SELECTED, THEN IT SELECTS THE NODE CLICKED
				for(let i =0; i < covidGame.path.length; i++) {

					if((covidGame.path[i].gridLoc.x==c) && (covidGame.path[i].gridLoc.y==r)) {

						covidGame.path[i].mouseSelected=true;
						covidGame.editorNode = i;
					}
				}
			}
			else  { //IF A NODE IS SELECTED AND YOU CLCIK ON IT, IT DESELECTS
				let index = covidGame.editorNode
					loop:
					for(let i =0; i < covidGame.path.length; i++) {

						if((covidGame.path[index].gridLoc.x==c) && (covidGame.path[index].gridLoc.y==r)) {

							covidGame.path[index].mouseSelected=false;
							covidGame.editorNode = -1;
							break loop;
						}
					}
					loop: //IF A NODE IS SELECTED AND ANOTHER VALD NODE IS CLICKED, THEY ARE CONNECTED
					for(let i =0; i < covidGame.path.length; i++) {

						if((covidGame.path[i].gridLoc.x==c) && (covidGame.path[i].gridLoc.y==r)) {
							covidGame.path[i].editorOwner = covidGame.path[index].editorName;
							covidGame.path[index].children.push(covidGame.path[i]);
							covidGame.path[index].mouseSelected=false;
							covidGame.path[i].editorPrune = true;
							covidGame.editorNode = -1;
							break loop;
						}
					}

			}




          }
        });


			this.canvas2.addEventListener("click", function (event) {
			  getMouseLoc(event);
			});

			function getMouseLoc(e) {
			  // scales the minimap coords into the scale of the bounds
			  let tempX = covidGame.bounds.width * (e.offsetX / covidGame.canvas2.width);
			  let tempY = covidGame.bounds.height * (e.offsetY / covidGame.canvas2.height);

			  // translate by adding the top left of the bounds of the world
			  tempX += covidGame.bounds.left;
			  tempY += covidGame.bounds.top;

			  // We have the target for the center of canvas1 but we need
			  // the target to be the top left of canvas1
			  tempX -= covidGame.canvas1.width/2;
			  tempY -= covidGame.canvas1.height/2;

			  // now make that the target location
			  covidGame.canvas1LocTarget.x = tempX;
			  covidGame.canvas1LocTarget.y = tempY;

			}
		if(this.debug==false){this.level.borderCalculation(this,this.level.path);}



		//THIS JUST PUSHES SOME BASIC ENEMIES

		this.basicEnemies = [];
		//this.basicEnemies.push(new BasicEnemy(this));
    //this.basicEnemies.push(new InflammatoryEnemy(this));
		setInterval(this.incrementTimer,1000);
		this.gameClock = 0;
		this.wave = 0;
		this.timeToNextRound = 0;

		//console.log(this.level.compressedPath);

    }//  +++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

	incrementTimer(){
		covidGame.gameClock+=1;
		covidGame.timeToNextRound+=1;
		//console.log(covidGame.gameClock);
	}

    // function to run the game each animation cycle
    run() {
		this.lives = 0;

		if((this.timeToNextRound) > 10) {
			this.wave=this.wave*1.2+5;
			//console.log(this.wave);
			this.level.generateEnemies(this.wave*2);
			this.timeToNextRound=0;
		}
		//console.log(2.8-Math.log10(this.wave));
		for(let i = 0; i < this.level.finalNodes.length; i++) {
			let weight = 0;
			weight = Math.pow(2,this.wave*-0.025)+0.88
			if(weight > 0.99) { weight=0.999;}
			console.log(weight);
			if(this.level.finalNodes[i].health>0) {this.lives++;}


			else if (Math.random() > weight) {
				this.basicEnemies.push(new BasicEnemy(this,this.level.finalNodes[i])); //THIS DOES VIRUS REPLICATION, DO WHAT U WISH WITH IT
        this.basicEnemies.push(new InflammatoryEnemy(this,this.level.finalNodes[i]));
			}

		}
      let ctx1 = this.context1;
      let cnv1 = this.canvas1;
      let ctx2 = this.context2;
      let cnv2 = this.canvas2;
      ctx1.fillStyle = "#505050";
      ctx1.fillRect(0, 0, cnv1.width, cnv1.height);
      ctx2.fillStyle = "#505050";
      ctx2.fillRect(0, 0, cnv2.width, cnv2.height);


      ctx1.save();
      // translate according to the location of the canvas in the bounds
      ctx1.translate(-this.canvas1Loc.x, -this.canvas1Loc.y);
      // draw the bounds of the bounds in canvas1
      ctx1.beginPath();
      ctx1.strokeStyle = "white";
      ctx1.lineWidth = 2;
      ctx1.rect(this.bounds.left, this.bounds.top, this.bounds.width, this.bounds.height);
      ctx1.stroke();







      //  Render the cells in the 2D array

	    let seek = JSVector.subGetNew(this.canvas1LocTarget, this.canvas1Loc);
		// lerp towards the target using one tenth of the distance
		seek.multiply(1/10);
		this.canvas1Loc.add(seek);

		//ctx1.save();
		// canvas1 is translated according to its location in the bounds of the world

      let firstR = Math.floor((this.canvas1Loc.y-this.bounds.top)/this.cellHeight);
      if(firstR<0){
        firstR=0;
      }
      let lastR= Math.floor(firstR + (cnv1.height/this.cellHeight));
      if(lastR>=this.numRows){
        lastR = this.numRows-1;
      }
      let firstC = Math.floor((this.canvas1Loc.x-this.bounds.left)/this.cellWidth);
      if(firstC<0){
        firstC=0;
      }
      let lastC = Math.floor((this.canvas1Loc.x-this.bounds.left+cnv1.width)/this.cellWidth);
      if(lastC>=this.numCols){
        lastC = this.numCols-1;
      };


      ctx2.save();

      // scale canvas2 to contain the entire bounds
      ctx2.scale(this.scaleX, this.scaleY);
      // center the bounds in canvas2
      ctx2.translate(this.bounds.width / 2, this.bounds.height / 2);
      ctx2.drawImage(this.img,this.bounds.left,this.bounds.top);// Draws Background Image


      // draw the outline of canvas1 in canvas2
      let c1x = this.canvas1Loc.x;
      let c1y = this.canvas1Loc.y;
      ctx2.beginPath();
      ctx2.strokeStyle = "white";
      ctx2.lineWidth = 1 / this.scaleX;
      ctx2.rect(c1x, c1y, cnv1.width, cnv1.height);
      ctx2.stroke();
	  ctx1.drawImage(this.img,this.bounds.left,this.bounds.top);//Sets Background Image

      for(let r=firstR;r<=lastR; r++){
        for(let c=firstC; c<=lastC; c++){
              //this.cells[r][c].run();
          }
        }



	  if(this.debug==false){this.path[0].render(this);}
	  else {
		for(let i =0; i < this.path.length; i++) {
			this.path[i].render(this);



		}

      }

		  for(let i = 0; i < this.basicEnemies.length; i++){

			//try {
				if(this.lives>0) {
					this.basicEnemies[i].run();

					if(this.basicEnemies[i].markForRemoval==true) {
						this.basicEnemies.splice(i,1);
					}
				}
				else { this.basicEnemies[i].render(); }
			//}
			//catch(e) {this.basicEnemies.splice(i,1); }
		  }



      let infoCnv = this.context3;
	infoCnv.fillStyle="white";
	infoCnv.fillRect(0,0,400,400);
    infoCnv.font = "30px Comic Sans MS"; // SCORE FONT
    infoCnv.fillStyle = "black";
    infoCnv.fillText("Score:"+this.score, 0,50 ); //Score Placement

    infoCnv.font = "30px Comic Sans MS"; // Lives FONT
    infoCnv.fillStyle = "red";

    infoCnv.drawImage(this.liveLogo, 10, 80, 25,25);
    infoCnv.fillText(this.lives, 50,100 ); //Lives Placement
	infoCnv.fillText(this.gameClock, 50,200 );
    infoCnv.font = "30px Comic Sans MS"; // Economy FONT
    infoCnv.fillStyle = "green";



    infoCnv.drawImage(this.cash, 10, 130, 25,25);
    infoCnv.fillText(this.economy, 50,150 ); //Economy Placement


      ctx1.restore();
      ctx2.restore();
    }// ++++++++++++++++++++++++  end run()

    loadNeighbors(){
      for(let r=0; r<this.numRows;r++){
        for(let c=0; c<this.numCols;c++){
          this.cells[r][c].loadNeighbors();
        }
      }
    }
  //  ++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

  // function to run the game each animation cycle



  loadNeighbors() {
    for (let r = 0; r < this.numRows; r++)
      for (let c = 0; c < this.numCols; c++)
        this.cells[r][c].loadNeighbors();
  }
	addBasicEnemies(node){
     covidGame.basicEnemies.push(new BasicEnemy(covidGame,node));
	}
  addInflammatoryEnemies(){
    covidGame.basicEnemies.push(new InflammatoryEnemy(covidGame));
  }


}//  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Class
