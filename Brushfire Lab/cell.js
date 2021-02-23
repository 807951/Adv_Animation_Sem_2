class Cell{
    
  constructor(ecosystem, row, col, occupied){
    this.ecosystem = ecosystem;
    // location in 2D array
    this.row = row;
    this.col = col;
    this.ctx1 = ecosystem.context1;
    this.width = ecosystem.cellWidth;
    this.height = ecosystem.cellHeight;
    // location according to pixels
    this.x = col * this.width+this.ecosystem.world.left;
    this.y = row * this.height+this.ecosystem.world.top;
    
    this.loc = new JSVector(this.x, this.y);

    this.neighbors = {};
    this.occupied = occupied;
    // finds dist from destination
    this.distFromDest = Math.sqrt(Math.pow(40 - this.col, 2) + Math.pow(40 - this.row, 2)); 
    this.distFromDest = Math.round((this.distFromDest + Number.EPSILON) * 100) / 100; // rounds to 2 decimal places
    
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
    ctx1.strokeStyle = "rgba(0, 0, 0)";
    ctx1.fillStyle = this.clr;
    ctx1.beginPath();
    ctx1.rect(this.loc.x, this.loc.y, this.width, this.height);
    ctx1.fill();
    ctx1.font = "20px serif";
    ctx1.strokeText("r = "+this.row, this.loc.x+5, this.loc.y+25);
    ctx1.strokeText("c = "+this.col, this.loc.x+5, this.loc.y+45);
    ctx1.strokeText("d = "+this.distFromDest, this.loc.x+5, this.loc.y+65);
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
      if(this.row > 0){ //north neighbor
        if(!cells[r-1][this.col].occupied){
          this.neighbors.n = cells[this.row-1][this.col];
        }
      }

      if(this.col < this.ecosystem.numCols - 1){ //east neighbor
        if(!cells[this.row][this.col+1].occupied){
          this.neighbors.e = cells[this.row][this.col+1];
        }
      }

      if(this.row < this.ecosystem.numRows - 1){ //south neighbor
        if(!cells[this.row+1][this.col].occupied){
          this.neighbors.s = cells[this.row+1][this.col];
        }
      }
      if(this.col > 0){ //west neigbbor
        if(!cells[this.row][this.col-1].occupied){
          this.neighbors.w = cells[this.row][this.col-1];
        }
      }
    }
  }
}