class InflammatoryEnemy {
    constructor(game,firstNode){
		//Hello to all the people doing enemies
		//This is just a template that demonstrates how to work with the new level system.
		//The level system is a tree, so each path node has children with other path Nodes.
		//In order to accomodate this, change this following code


        this.game = game; //INTIALZE THIS.GAME BEFORE THIS CODE AS BASED OFF OF COVIDGAME


        // COPY AND PASTE THE FOLLOWING LINES OF CODE

		//**************************************
      if(firstNode!=null) {
        //this.startingIndex=firstnode;
        //console.log('hi');
        this.currentNode=firstNode;
        this.nextNode = this.currentNode.ancestor;
      }
      else {
        this.startingIndex = Math.floor(Math.random()*this.game.level.path.length); //THIS will pick randomly between theb eginning paths
        this.currentNode = this.game.level.path[this.startingIndex];
        this.nextNode = this.game.level.path[this.startingIndex].children[Math.floor(Math.random()*this.currentNode.children.length)];
      } // end of the path
        // position the actor initially in the center of the first Node


		//*************************************
		//END THE COPY AND PASTE. REPLACE YOUR CURRENT TARGET, NEXT Node, CURRENT Node, AND PATH INDEX
		//MORE CHANGES WILL HAVE TO BE DONE BEFORE, SCROLL DOWN

		//REMEMBER TO IN
        this.loc = new JSVector(this.currentNode.loc.x,
                                this.currentNode.loc.y);
        this.target = new JSVector(this.nextNode.loc.x,
                                  this.nextNode.loc.y);
        this.lastNode = this.game.path[this.game.path.length-1];
        console.log(this.loc);

        this.vel = new JSVector(0,0);   // velocity
        this.acc = new JSVector(0,0);   //steering acceleration
        this.pulser = new JSVector(0,0);
        this.maxSpeed = 4;
        this.clr="rgba(171, 183, 183, 0.7)";
        this.rad=5;
        this.closeT;
        this.caught = 0;

        ////new code
        this.orbitAngle = Math.random()*Math.PI;
        this.orbiters = [];
        this.numOrbs = 3;

        //this.frozen = false;
        //this.timer = 0;

        //create all orbiters
         for(let i = 0; i<this.numOrbs; i++){
           let a = i*(Math.PI*2)/this.numOrbs + this.orbitAngle;
           let angleVel = this.numOrbs*0.01;
           this.orbiters.push(new Orbiter(this, 2, 10, a, angleVel, "rgba(240, 52, 52, 1)"));
         }
    }

    run() {
        this.update();
        this.render();

        ////new code
        //update and render orbiters
        for(let i=0; i<this.orbiters.length;i++){
          let orb = this.orbiters[i];
          orb.update();
          orb.render();
        }
    }

    update(){

		this.followPath();

  }

    render(){
        let ctx = covidGame.context1;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();

    }

    followPath(){

      let d = this.loc.distance(this.target);
      this.acc = JSVector.subGetNew(this.target, this.loc);
      this.acc.normalize();
      this.acc.multiply(4);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);

		//ALTERNATIVELY, YOU CAN USE PATHFIND.JS
		//THIS CODE TRIGGERS ONCE THE ACTOR HAS REACHED THE NODE IT WANTS TO GO TO.
		// THIS WILL MAKE YOUR NEXT Node ALGORITHM WORK PROPERLY. REPLACE IT WITH THE FOLLOWING CODE.

		//*****************************************
    if(d<=25){
      let ancestorNode = this.currentNode.ancestor;
      let previousNode=this.currentNode;
      this.currentNode=this.nextNode;

      this.validTargets = [];


      if(this.currentNode.health==-999) { this.validTargets.push(ancestorNode) }
      else {
        for(let i = 0; i < this.currentNode.children.length; i++) {
          if(this.currentNode.children[i].health>0) {
            //console.log('hi');
            this.validTargets.push(this.currentNode.children[i]);
          }
        }
      }





      if(this.validTargets.length==0) {
        if(this.currentNode.children.length==0) { //IF THIS IS A FINAL NODE

          this.deliverDamage(this.currentNode);
          return;

        }

        else {

          this.currentNode.health = -999
          if(previousNode.health > 0 ) {
            this.nextNode = previousNode;
            if(this.nextNode==null) {
              this.markForRemoval = true;
              return;
            }
            this.target = new JSVector((this.nextNode.loc.x+(Math.random()*20-10)),
            this.nextNode.loc.y+(Math.random()*20-10));
          }
          else {
            this.nextNode = ancestorNode;
            if(this.nextNode==null) {
              this.markForRemoval = true;
              return;
            }
            this.target = new JSVector((this.nextNode.loc.x+(Math.random()*20-10)),
            this.nextNode.loc.y+(Math.random()*20-10));
          }

        }



      }
      else{

        this.nextNode = this.validTargets[Math.floor(Math.random()*this.validTargets.length)];
        if(this.nextNode==null) {
          this.markForRemoval = true;
          return;
        }
        this.target = new JSVector((this.nextNode.loc.x+(Math.random()*20-10)),
        this.nextNode.loc.y+(Math.random()*20-10));


      }



    }
    }

    deliverDamage(node) {
      node.health-=200;

      this.markForRemoval = true;



    }

		//******************************************
		//STOP THE COPY AND PASTE.
      //}

	//Congratulations, your tower will now work with the new level system.
	//If you have any problems, feel free to contact me on slack and I'll get back to you.

    findCloseTower(){
      let minD = 50000;
      for(let i=0; i<this.game.towers1.length;i++){
        let towerLoc = this.game.towers1[i].location;
        let d = this.loc.distance(towerLoc);
        if(d<minD){
          minD = d;
          this.closeT = this.game.towers1[i];
        }
      }
    }

}
