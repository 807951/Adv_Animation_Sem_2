function SnakeHead(x, y, dx, dy, radius, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.radius = radius;
  this.clr = clr;
}

SnakeHead.prototype.run = function(){
  this.checkEdges();
  this.update();
}

SnakeHead.prototype.update = function(){
  if(!game.gamePaused){
    this.location.add(this.velocity);
  }
}

//When a snake hits an edge of the canvas, it turns around and goes in the opposite direction
SnakeHead.prototype.checkEdges = function(){
  let world = game.world;
  if(this.location.x > world.right || this.location.x < world.left){
    this.velocity.x = -this.velocity.x;
  }
  if(this.location.y > world.top || this.location.y < world.bottom){
    this.velocity.y = -this.velocity.y;
  }
}