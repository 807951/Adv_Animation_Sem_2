class Actor{
    constructor(){
      this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cellHeight/2 + 5);
      this.vel = new JSVector(0, 0);
      this.position = ecoSystem.cells[0][0];
      this.clr = "#D64CB3";

      //add an event handler such that the a, s, w, d keys
      //will reposition the canvas within the world.
      window.addEventListener("keypress", function (event) {
        let actor = ecoSystem.actor;
          switch (event.code) {
              case "KeyW": //move up
                if(actor.position.neighbors.n != null){
                  actor.loc.y-=ecoSystem.cellHeight;
                  actor.position = ecoSystem.cells[actor.position.row-1][actor.position.col];
                }
                  // if (ecoSystem.canvas1Loc.y + 100 > ecoSystem.world.top)
                  // ecoSystem.canvas1Loc.y -= 20;
                  break;
              case "KeyS": //move down
                if(actor.position.neighbors.s != null){
                  actor.loc.y+=ecoSystem.cellHeight;
                  actor.position = ecoSystem.cells[actor.position.row+1][actor.position.col];
                }
                  // if (ecoSystem.canvas1Loc.y + ecoSystem.canvas1.height - 100 < ecoSystem.world.bottom)
                  // ecoSystem.canvas1Loc.y += 20;
                  break;
              case "KeyA": //move left
                if(actor.position.neighbors.w != null){
                  actor.loc.x-=ecoSystem.cellWidth;
                  actor.position = ecoSystem.cells[actor.position.row][actor.position.col-1];
                }
                  // if (ecoSystem.canvas1Loc.x + 100 > ecoSystem.world.left)
                  // ecoSystem.canvas1Loc.x -= 20;
                  break;
              case "KeyD": //move right
                if(actor.position.neighbors.e != null){
                  actor.loc.x+=ecoSystem.cellWidth;
                  actor.position = ecoSystem.cells[actor.position.row][actor.position.col+1];
                }
                  // if (ecoSystem.canvas1Loc.x + ecoSystem.canvas1.width - 100 < ecoSystem.world.right)
                  // ecoSystem.canvas1Loc.x += 20;
                  break;
                  break;
          }
      }, false);

    }// +++++++++++++++++++++++++++++++++++++++++++++++++++  end Constructor

run(){
  this.render();
}

render(){
  let ctx = ecoSystem.context1;
  ctx.save();
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, 5, Math.PI*2, 0, false);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

}