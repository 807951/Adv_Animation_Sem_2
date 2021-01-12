function Heart(x, y, dx, dy, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.clr = clr;
  this.isOverlapping = false;
}
  //  placing methods in the prototype (every mover shares functions)
Heart.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
  }
// draw the mover on the canvas
Heart.prototype.render = function(){
    let ctx = game.ctx;
        ctx.strokeStyle = "rgba(240, 52, 52, 1)";
        ctx.fillStyle = "rgba(240, 52, 52, 1)";
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
        ctx.restore();
  }
// Move the mover in a random direction
Heart.prototype.update = function(){
    if(!game.gamePaused){
        this.location.add(this.velocity);
    }
}
// When a mover hits an edge of the canvas, it wraps around to the opposite edge.
Heart.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if (this.location.x > canvas.width){
      this.location.x = 0;
    }
    else if(this.location.x < 0){
      this.location.x = canvas.width;
    }
    if (this.location.y > canvas.height){
      this.location.y = 0;
    }
    else if(this.location.y < 0){
      this.location.y = canvas.height;
    }
  }