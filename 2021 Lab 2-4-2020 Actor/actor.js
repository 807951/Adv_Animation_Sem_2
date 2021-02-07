class Actor{
  constructor(){
    // position in the canvas with pixels
    this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellHeight/2);
    this.vel = new JSVector(0, 0);
    // position in cell array
    this.position = ecoSystem.cells[0][0];
    this.clr = "#red";

  }

  moveTo(x, y){
    let actor = ecoSystem.actor;
    console.log("curr x: " + actor.position.row + "  " + " curr y: " + actor.position.col);
    console.log("dest x: " + y + "  " + "dest y: " + x);
    if(actor.position.col == x){
      if(y > actor.position.row){
        actor.loc.y+=ecoSystem.cellHeight;
        actor.position = ecoSystem.cells[actor.position.row+1][actor.position.col];
      }else if(y < actor.position.row){
        actor.loc.y -= ecoSystem.cellHeight;
        actor.position = ecoSystem.cells[actor.position.row-1][actor.position.col];
      }
    }
    else if(actor.position.row == y){
      if(x > actor.position.col){
        actor.loc.x+=ecoSystem.cellWidth;
        actor.position = ecoSystem.cells[actor.position.row][actor.position.col+1];
      }else if(x < actor.position.col){
        actor.loc.x-=ecoSystem.cellWidth;
        actor.position = ecoSystem.cells[actor.position.row][actor.position.col-1];
      }
    }
    else {
        console.log("error");
    }
  }

  run(){
    this.render();
  }

  render(){
    let ctx = ecoSystem.context1;
    ctx.save();
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 15, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

}