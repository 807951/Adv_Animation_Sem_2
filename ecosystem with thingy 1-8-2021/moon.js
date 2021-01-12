function Moon(x, y, dx, dy, clr){
  this.location = new JSVector(x, y);
  this.velocity = new JSVector(dx, dy);
  this.acceleration = new JSVector(0, 0);
  r = Math.random()*255;
  g = Math.random()*255;
  b = Math.random()*255;
  
  this.scl = 7;
  
  this.clr = "rgba(" + r + ", "+ g + ","+ b +")";
  this.isOverlapping = false;
  this.angl = Math.random() * Math.PI * 2;
  this.anglVel = 0.1;
}
Moon.prototype.run = function(){
    this.checkEdges();
    this.update();
    this.render();
  }
Moon.prototype.render = function(){
  let ctx = game.context1;
  ctx.save();
  ctx.translate(this.location.x, this.location.y);
  ctx.rotate(this.velocity.getDirection() + Math.PI / 2); //offset 90 degrees
  ctx.beginPath();
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.moveTo(0, -this.scl);
  ctx.lineTo(-this.scl, this.scl);
  ctx.lineTo(0, 0);
  ctx.lineTo(this.scl, this.scl);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
  }
Moon.prototype.update = function(){
    if(!game.gamePaused){
      let acc = new JSVector(0, 0);
      for(let i = 0; i < game.moons.length; i++){
        if(game.moons[i] !== this){
          let distance = this.location.distance(game.moons[i].location);
          if(distance < 60){
            let repel = JSVector.subGetNew(this.location, game.moons[i].location);
            repel = JSVector.subGetNew(this.location, game.moons[i].location);
            repel.normalize();
            repel.multiply(1);
            acc.add(repel);
          }
        }
      }
        this.acceleration.add(acc);
        this.velocity.add(this.acceleration);
        this.acceleration.multiply(0);
        this.velocity.limit(3);
        this.location.add(this.velocity);
    }
}
Moon.prototype.checkEdges = function(){
  let world = game.world;
  if(this.location.x > world.right || this.location.x < world.left){
    this.velocity.x = -this.velocity.x;
  }
  if(this.location.y > world.top || this.location.y < world.bottom){
    this.velocity.y = -this.velocity.y;
  }
}