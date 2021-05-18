// Actor class.  Each actor starts life at the beginning of a path
// and follows that path to the end where it dies.

class Actor {
    constructor(game) {
        // start off the actor in the first cell of the path
        this.pathIndex = 0;
        this.currentCell = game.path[this.pathIndex];
        this.nextCell = game.path[this.pathIndex + 1];   // next in the path of cells
        // where this actor should aim -- the center of the next cell in the path
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width / 2,
            this.nextCell.loc.y + this.nextCell.height / 2);
        this.lastCell = game.path[game.path.length - 1];  // end of the path
        // position the actor initially in the center of the first cell
        this.loc = new JSVector(this.currentCell.loc.x + this.currentCell.width / 2,
            this.currentCell.loc.y + this.currentCell.height / 2);
        this.vel = new JSVector(0, 0);   // velocity
        this.acc = new JSVector(0, 0);
        this.radius = 12;
        this.clr = "red";
        this.angle;
        this.images =[];
        for(var i=0; i<7; i++){
          this.images[i]= new Image();
          this.images[i].src = "Virus/v"+i+".png";
        }
        this.currentImage=0;
        this.someVar=0;
    }


    run() {
        this.update();
        this.render();
    }

    update() {
        let distToLastCenter = this.loc.distance(game.path[game.path.length - 1].center);
        //  keep advancing until 5 units away from center of last cell
        if (distToLastCenter > 5) {
            let d1 = this.loc.distance(this.currentCell.center);
            let d2 = this.loc.distance(this.nextCell.center);
            // if closer to center of next than center of current
            // update pathIndex, current and next
            if (d1 > d2) {
                this.pathIndex++;
                this.currentCell = game.path[this.pathIndex];
                // don't find next if in last cell in path
                if (this.pathIndex < game.path.length - 1) {
                    this.nextCell = game.path[this.pathIndex + 1];
                    this.target = this.nextCell.center;
                }
            }
            // center of target becomes an attractor
            this.acc = JSVector.subGetNew(this.target, this.loc);
            this.acc.normalize();
            this.acc.multiply(0.1);
            this.vel.add(this.acc);
            this.vel.limit(1.5)
            this.loc.add(this.vel);
            this.angle = this.vel.getDirection() + Math.PI / 2;
        } else {
            // now in the last cell o0f path
            this.clr = "green"
            this.angle += 0.1;// spin at end of run
        }


    }

    render() {
        let ctx = game.ctx;
        ctx.strokeStyle = "black";
        ctx.fillStyle = this.clr;
        let img = this.images[this.currentImage]
        ctx.drawImage(img,this.loc.x-img.width/2,this.loc.y-img.height/2)// IDEA: ].height/2);
        this.someVar++;
        if(this.someVar%6===0){
          this.currentImage++;
        }

          if(this.currentImage>=7){
            this.currentImage=0;
          }

        //ctx.fill();
        //ctx.stroke();
        //ctx.strokeStyle = "black";
        //ctx.fillStyle = "yellow";
        //ctx.arc(0, 0, 6, 0, Math.PI * 2);

    }
}
