class Cell{
       constructor(ecosystem, row, col, occupied){
         this.ecosystem = ecosystem;
         this.row = row;
         this.col = col;
         this.ctx1 = ecosystem.context1;
         this.width = ecosystem.cellWidth;
         this.height = ecosystem.cellHeight;
         this.x = col*this.width+this.ecosystem.world.left;
         this.y = row*this.height+this.ecosystem.world.top;
         this.loc = new JSVector(this.x, this.y);

    this.neighbors = [];
    this.neighbors.length = 8;
    this.occupied = occupied;
  }

  run(){
      this.render();
      this.loadNeighbors(this.neighbors);
  }

  render(){
    if(this.occupied == true){
      this.clr = "grey";
    }else{
      this.clr = "white";
    }
    let ctx1 = this.ctx1;
    ctx1.save();
    ctx1.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx1.fillStyle = this.clr;
    ctx1.beginPath();
    ctx1.rect(this.loc.x, this.loc.y, this.width, this.height);
    ctx1.fill();
    ctx1.font = "20px serif";
    ctx1.strokeText("r = "+this.row, this.loc.x+5, this.loc.y+20);
    ctx1.strokeText("c = "+this.col, this.loc.x+5, this.loc.y+50);
    ctx1.stroke();
    ctx1.restore();
  }

  loadNeighbors(neighbors){
    let cells = this.ecosystem.cells;
    let r = this.row;
    let c = this.col;
    if(!this.occupied){
      if(r > 0){ //north
        if(!cells[r-1][c].occupied){
          neighbors.n = cells[r-1][c];
        }
      }

      if(c < this.ecosystem.numCols - 1){ //east
        if(!cells[r][c+1].occupied){
          neighbors.e = cells[r][c+1];
        }
      }

      if(r < this.ecosystem.numRows - 1){ //south
        if(!cells[r+1][c].occupied){
          neighbors.s = cells[r+1][c];
        }
      }

      if(c > 0){ //west
        if(!cells[r][c-1].occupied){
          neighbors.w = cells[r][c-1];
        }
      }

      if(r > 0 && c < this.ecosystem.numCols - 1){ //northeast
        if(!cells[r-1][c+1].occupied){
          neighbors.ne = cells[r-1][c+1];
        }
      }

      if(r < this.ecosystem.numRows - 1 && c < this.ecosystem.numCols - 1){ //southeast
        if(!cells[r+1][c+1].occupied){
          neighbors.se = cells[r+1][c+1];
        }
      }

      if(r < this.ecosystem.numRows - 1 && c > 0){ //southwest
        if(!cells[r+1][c-1].occupied){
          neighbors.sw = cells[r+1][c-1];
        }
      }

      if(r > 0 && c > 0){ //northwest
        if(!cells[r-1][c-1].occupied){
          neighbors.nw = cells[r-1][c-1];
        }
      }
    }
   }
}