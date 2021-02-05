class Actor{
    constructor(){
      this.loc = new JSVector(ecoSystem.cells[0][0].loc.x + ecoSystem.cellWidth/2, ecoSystem.cells[0][0].loc.y + ecoSystem.cellWidth/2);
      this.vel = new JSVector(0, 0);
      this.clr = "blue";

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
      ctx.arc(this.loc.x, this.loc.y, 10, Math.PI*2, 0, false);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

}