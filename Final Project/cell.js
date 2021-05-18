class Cell {
  constructor(cg, row, col, occ) {
    this.cg = cg;
    this.col = col;
    this.row = row;
    this.ctx1 = cg.context1;
    this.ctx2 = cg.context2;
    this.width = cg.cellWidth;
    this.height = cg.cellHeight;
    this.xCoor = col * this.width + this.cg.bounds.left;
    this.yCoor = row * this.height + this.cg.bounds.top;
    this.loc = new JSVector(this.xCoor, this.yCoor);
    this.occupied = occ;
    this.path = false;

    this.neighbors = {
      n: null,
      ne: null,
      e: null,
      se: null,
      s: null,
      sw: null,
      w: null,
      nw: null,
    }

  }//  +++++++++  end constructor

  run() {
    this.render();
    // this.loadNeighbors();
  }

    render() {
	  /*if(this.path == true){
        //this.clr = "orange"
      }
      if(this.occupied == true){
        //this.clr = "red"
      }

      else{
        //this.clr = "rgba(50, 150, 120, 0.2)"
      }*/
	  this.clr = "darkgray"
	  if(this.occupied == true){
        this.clr = "red"
      }
      let ctx1 = this.ctx1;
      ctx1.save();
      ctx1.strokestyle = "rgba(0,0,0,1)";
      ctx1.fillStyle = this.clr;
      ctx1.beginPath();
      ctx1.rect(this.loc.x, this.loc.y, this.width, this.height);
      //ctx1.fill();
      //ctx1.font = "20px serif";
      //ctx1.strokeText("c = "+ this.col, this.loc.x+5, this.loc.y+20);
      //ctx1.strokeText("r = "+ this.row, this.loc.x+5, this.loc.y+50);
      ctx1.stroke();
      ctx1.restore();
    }

  loadNeighbors() {
    if (this.row > 0 && !this.cg.cells[this.row - 1][this.col].occupied) {//north
      this.neighbors.n = this.cg.cells[this.row - 1][this.col];
    }
    if (this.col > 0 && !this.cg.cells[this.row][this.col - 1].occupied) {//west
      this.neighbors.w = this.cg.cells[this.row][this.col - 1];
    }
    if (this.row < this.cg.numRows - 1 && !this.cg.cells[this.row + 1][this.col].occupied) {//south
      this.neighbors.s = this.cg.cells[this.row + 1][this.col];
    }
    if (this.col < this.cg.numCols - 1 && !this.cg.cells[this.row][this.col + 1].occupied) {//east
      this.neighbors.e = this.cg.cells[this.row][this.col + 1];
    }
    if (this.row > 0 && this.col > 0 && !this.cg.cells[this.row - 1][this.col - 1].occupied) {//nw
      this.neighbors.nw = this.cg.cells[this.row - 1][this.col - 1];
    }
    if (this.row > 0 && this.col < this.cg.numCols - 1 && !this.cg.cells[this.row - 1][this.col + 1].occupied) {//ne
      this.neighbors.ne = this.cg.cells[this.row - 1][this.col + 1];
    }
    if (this.row < this.cg.numRows - 1 && this.col > 0 && !this.cg.cells[this.row + 1][this.col - 1].occupied) {//sw
      this.neighbors.sw = this.cg.cells[this.row + 1][this.col - 1];
    }
    if (this.row < this.cg.numRows - 1 && this.col < this.cg.numCols - 1 && !this.cg.cells[this.row + 1][this.col + 1].occupied) {//se
      this.neighbors.se = this.cg.cells[this.row + 1][this.col + 1];
    }
  }

}//+++++++++++++++++++++  end of Cell class
