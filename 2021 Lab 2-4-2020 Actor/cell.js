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

    // this.r = Math.random()*50;
    // this.g = Math.random()*200+55;
    // this.b = Math.random()*200+55;
    // this.clr = "rgba(" + this.r + ", " + this.g + "," + this.b +")"
  }//  +++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

  run(){
      this.render();
      this.loadNeighbors(this.neighbors);
  }

  render(){
    if(this.occupied == true){
      this.clr = "red";
    }else{
      this.clr = "rgba(50, 150, 120, 0.2)";
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

//the neighbors array is filled so that above is neighbors[0], above and to the right
//is neighbors[1], to the right is neighbors[3], and so on in a clockwise motion up
//to neighbors[7]
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

  //   if(this.ecosystem.arrayLoaded){
  //     for(let row=0; row<this.ecosystem.numRows; row++){
  //       for(let col=0; col<this.ecosystem.numCols; col++){
  //         let cell = this.ecosystem.cells[row][col];
  //         if(row-1>=0){
  //           if(row == this.row-1 && col == this.col){//neighbor is above
  //             neighbors[0] = cell;
  //           }else if(row == this.row-1 && col == this.col+1){//neighbor is up and to the right
  //             neighbors[1] = cell;
  //           }else if(row == this.row-1 && col == this.col-1){//neighbor is up and to the left
  //             neighbors[7] = cell;
  //           }
  //         }
  //         if(row+1<this.ecosystem.numRows){
  //           if(row == this.row+1 && col == this.col){//neighbor is below
  //             neighbors[4] = cell;
  //           }else if(row == this.row+1 && col == this.col+1){//below and to the right
  //             neighbors[3] = cell;
  //           }else if(row==this.row+1 && col == this.col-1){//below and to the left
  //             neighbors[5] = cell;
  //           }
  //         }
  //         if(col-1>=0){
  //           if(row == this.row && col == this.col-1){//to the left
  //             neighbors[6] = cell;
  //           }
  //         }
  //         if(col+1<this.ecosystem.numCols){
  //           if(row == this.row && col == this.col+1){//to the right
  //             neighbors[2] = cell;
  //           }
  //         }
  //       }
  //     }
  //   }
   }
}//  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++  end Class