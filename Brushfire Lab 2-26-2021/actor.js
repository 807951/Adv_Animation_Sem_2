class Actor{
  constructor(){
      // location based on pixels
    this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellHeight/2);
    
    
    // location based on 2D array
    this.currentCell = ecoSystem.cells[0][0];
    this.nextCell = null;
    this.lastCell = ecoSystem.cells[ecoSystem.numRows-1][ecoSystem.numCols-1];
    
    this.clr = "blue";
    this.path = [];
    this.pathIndex = 0;
    
    
    for(let i = 0; i < 10; i++){
      this.dir = "";
      this.min = 100;
      if(this.currentCell.n != null){
        if(this.currentCell.n.distFromDest < this.min){
          this.dir = "n";
          this.min = this.currentCell.n.distFromDest;
        }
      }
      else if(this.currentCell.e != null){
        if(this.currentCell.e.distFromDest < this.min){
          this.dir = "e";
          this.min = this.currentCell.e.distFromDest;
        }
      }
      else if(this.currentCell.s != null){
        if(this.currentCell.s.distFromDest < this.min){
          this.dir = "s";
          this.min = this.currentCell.s.distFromDest;
        }
      }
      else if(this.currentCell.w != null){
        if(this.currentCell.w.distFromDest < this.min){
          this.dir = "w";
          this.min = this.currentCell.w.distFromDest;
        }
      }
      else{
        console.log("no path found");
      }
      
      console.log("dir:  " + this.dir + "  min:  " + this.min);
      
      //console.log(this.dir.localeCompare("e"));
      
      
      if(this.dir.localeCompare("n") == 0){
        this.path.push(this.currentCell.n);
      }
      else if(this.dir.localeCompare("e") == 0){
        this.path.push(this.currentCell.e);
      }
      else if(this.dir.localeCompare("s") == 0){
        this.path.push(this.currentCell.s);
      }
      else if(this.dir.localeCompare("n") == 0){
        this.path.push(this.currentCell.n);
      }
      
      console.log(this.path);
      
      this.currentCell = this.path[this.pathIndex];
      this.pathIndex++;
      console.log("pathindex:  " + this.pathIndex);
      console.log("currentCell:  " + this.currentCell); 
      
      
    
      
      console.log(this.path);
      
      this.min = 100;
      this.dir = "";
    }
    
    
    this.currentCell = ecoSystem.cells[0][0];
    
    
    
    
    
    
    
    
    
    // allows user to move actor around the grid
    window.addEventListener("keypress", function (event) {
      let actor = ecoSystem.actor;
      switch (event.code) {
        case "KeyW": //move up
            if(actor.currentCell.n != null){
              actor.loc.y-=ecoSystem.cellHeight;
              actor.currentCell = ecoSystem.cells[actor.currentCell.row-1][actor.currentCell.col];
            }
            break;
        case "KeyS": //move down
            if(actor.currentCell.s != null){
              actor.loc.y+=ecoSystem.cellHeight;
              actor.currentCell = ecoSystem.cells[actor.currentCell.row+1][actor.currentCell.col];
            }
            break;
        case "KeyA": //move left
            if(actor.currentCell.w != null){
              actor.loc.x-=ecoSystem.cellWidth;
              actor.currentCell = ecoSystem.cells[actor.currentCell.row][actor.currentCell.col-1];
            }
            break;
        case "KeyD": //move right
            if(actor.currentCell.e != null){
              actor.loc.x+=ecoSystem.cellWidth;
              actor.currentCell = ecoSystem.cells[actor.currentCell.row][actor.currentCell.col+1];
            }
            break;
        break;
      }
    }, false);

  }
  run(){
    this.render();
  }
  render(){
      // draws the ball in the canvas
    let ctx = ecoSystem.context1;
    ctx.save();
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 12.5, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }    
}



