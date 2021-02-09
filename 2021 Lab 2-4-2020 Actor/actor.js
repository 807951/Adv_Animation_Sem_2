class Actor{
  constructor(){
      // location based on pixels
    this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellHeight/2);
    this.vel = new JSVector(0, 0);
    // location based on 2D array
    this.position = ecoSystem.cells[0][0];
    this.clr = "blue";
    
    // allows user to move actor around the grid
    window.addEventListener("keypress", function (event) {
      let actor = ecoSystem.actor;
      switch (event.code) {
        case "KeyW": //move up
            if(actor.position.neighbors.n != null){
              actor.loc.y-=ecoSystem.cellHeight;
              actor.position = ecoSystem.cells[actor.position.row-1][actor.position.col];
            }
            break;
        case "KeyS": //move down
            if(actor.position.neighbors.s != null){
              actor.loc.y+=ecoSystem.cellHeight;
              actor.position = ecoSystem.cells[actor.position.row+1][actor.position.col];
            }
            break;
        case "KeyA": //move left
            if(actor.position.neighbors.w != null){
              actor.loc.x-=ecoSystem.cellWidth;
              actor.position = ecoSystem.cells[actor.position.row][actor.position.col-1];
            }
            break;
        case "KeyD": //move right
            if(actor.position.neighbors.e != null){
              actor.loc.x+=ecoSystem.cellWidth;
              actor.position = ecoSystem.cells[actor.position.row][actor.position.col+1];
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