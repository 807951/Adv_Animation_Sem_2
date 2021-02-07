class Cell{
  constructor(ecosystem, row, col, occupied){
    this.ecosystem = ecosystem;
    this.row = row;
    this.col = col;
    
    this.ctx1 = ecosystem.context1;
    this.width = ecosystem.cellWidth;
    this.height = ecosystem.cellHeight;
    this.x = col * this.width + this.ecosystem.world.left;
    this.y = row * this.height + this.ecosystem.world.top;
    this.loc = new JSVector(this.x, this.y);

    this.neighbors = {};
    this.occupied = occupied;
    this.distFromDest = Math.sqrt(Math.pow(40-this.col, 2) + Math.pow(40-this.row, 2));
    this.distFromDest = Math.round((this.distFromDest + Number.EPSILON) * 100) / 100;
    
    // console.log("row: " + this.row + " col: " + this.col + " distFromDest: " + this.distFromDest);
  }
  run(){
      this.render();
  }
  render(){
    if(this.occupied == true){
      this.clr = "grey";
    }else{
      this.clr = "white";
    }
    let ctx1 = this.ctx1;
    ctx1.save();
    ctx1.strokeStyle = "black";
    ctx1.fillStyle = this.clr;
    ctx1.beginPath();
    ctx1.rect(this.loc.x, this.loc.y, this.width, this.height);
    ctx1.fill();
    ctx1.font = "15px serif";
    ctx1.strokeText("r = " +this.row, this.loc.x+5, this.loc.y+20);
    ctx1.strokeText("c = " +this.col, this.loc.x+5, this.loc.y+40);
    ctx1.strokeText("d = " + this.distFromDest, this.loc.x+5, this.loc.y+60);
    ctx1.stroke();
    ctx1.restore();
  }
  loadNeighbors(){
    this.neighbors = {
      n: null,
      e: null,
      s: null,
      w: null
    };
    let cells = this.ecosystem.cells;
    let r = this.row;
    let c = this.col;
    if(!this.occupied){
      if(r > 0){ // north neighbor
        if(!cells[r-1][c].occupied){
          this.neighbors.n = cells[r-1][c];
          //console.log(this.neighbors.n.distFromDest);
        }
      }
      if(c < this.ecosystem.numCols - 1){ // east neighbor
        if(!cells[r][c+1].occupied){
          this.neighbors.e = cells[r][c+1];
          //console.log(this.neighbors.e.distFromDest);
        }
      }
      if(r < this.ecosystem.numRows - 1){ // south neighbor
        if(!cells[r+1][c].occupied){
          this.neighbors.s = cells[r+1][c];
          //console.log(this.neighbors.s.distFromDest);
        }
      }
      if(c > 0){ // west neighbor
        if(!cells[r][c-1].occupied){
          this.neighbors.w = cells[r][c-1];
          //console.log(this.neighbors.w.distFromDest);
        }
      }
    }
    //console.log(this.neighbors);
    
  }
  closestNeighbor(){
   /*  console.log("inside the closestNeighbor function");
    console.log(this.neighbors.n.distFromDest);
    console.log(this.neighbors.e.distFromDest);
    console.log(this.neighbors.s.distFromDest);
    console.log(this.neighbors.w.distFromDest); */
    let nextCell = this;
    if((this.neighbors.n != null) && (this.distFromDest > this.neighbors.n.distFromDest)){
      console.log("inside the north neighbor if statement");
      nextCell = this.neighbors.n;
    }
    if((this.neighbors.e != null) && (this.distFromDest > this.neighbors.e.distFromDest)){
      console.log("inside the east neighbor if statement");
      nextCell = this.neighbors.e;
    }
    if((this.neighbors.s != null) && (this.distFromDest > this.neighbors.s.distFromDest)){
      console.log("inside the south neighbor if statement");
      nextCell = this.neighbors.s;
    }
    if((this.neighbors.w != null) && (this.distFromDest > this.neighbors.w.distFromDest)){
      console.log("inside the west neighbor if statement");
      nextCell = this.neighbors.w;
    }
    //console.log(nextCell.distFromDest);
    return nextCell;
  }
}








