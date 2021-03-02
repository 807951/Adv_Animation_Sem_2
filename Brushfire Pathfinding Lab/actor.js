class Actor {
    constructor(game, cell){
        this.game = game;
        this.currentCell = cell;
        this.loc = new JSVector(this.currentCell.loc.x + this.currentCell.width / 2, this.currentCell.loc.y + this.currentCell.height / 2);
        this.nextCell = this.currentCell;
        this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width / 2, this.nextCell.loc.y + this.nextCell.height / 2);
        this.lastCell = game.grid[game.numRows-1][game.numCols-1];
        this.vel = new JSVector(0,0);
        this.acc = new JSVector(0,0);
        this.maxSpeed = 1.5;
    }

    run() {
        this.update();
        this.render();
    }

    update(){
        if(this.currentCell!=this.lastCell){
          this.findNextCell();
          let d = this.loc.distance(this.target);
          this.acc = JSVector.subGetNew(this.target, this.loc);
          this.acc.normalize();
          this.acc.multiply(0.5);
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.loc.add(this.vel);

          if(d<=25){
            this.currentCell.clr = "yellow";
            this.currentCell = this.nextCell;
            this.currentCell.clr = "yellow";
            this.findNextCell();
          }
        }
        if(this.currentCell==this.lastCell){
          this.loc = this.lastCell.center;
          this.lastCell.clr = "red"
        }
      }

    render(){
        let ctx = game.ctx;
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 4.5, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }

    findNextCell(){
      for(let i=0; i<this.currentCell.neighbors.length; i++){
        if(this.currentCell.neighbors[i].dist<this.nextCell.dist){
          this.nextCell = this.currentCell.neighbors[i];
          this.target = new JSVector(this.nextCell.loc.x + this.nextCell.width/2, this.nextCell.loc.y + this.nextCell.height/2);
        }
      }
    }
}