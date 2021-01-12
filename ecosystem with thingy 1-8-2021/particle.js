function Particle(x, y, rad, clr){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(Math.random()*3-1, Math.random()*3-1);
  //this.acc = new JSVector(0, 0.07);
  this.lifeSpan = 500;
  this.radius = rad;
  r = Math.random()*255;
  g = Math.random()*255;
  b = Math.random()*255;
  
  this.clr = "rgba(" + r + ", "+ g + ","+ b +")";
}

Particle.prototype.run = function(){
  this.update();
  this.render();
}

Particle.prototype.update = function(){
  //this.vel.add(this.acc);
  this.loc.add(this.vel);

  //particle disappears when an orbiter hits it
  for(let i = 0; i < game.movers.length; i++){
    for(let j = 0; j < game.movers[i].orbiters.length; j++){
      let orb = game.movers[i].orbiters[j];
      if(this.loc.distance(orb.location) < this.radius + orb.radius){
        this.lifeSpan = -1;
      }
    }
  }

  //mover changes color when hitting particle
  for(let i = 0; i < game.movers.length; i++){
      if(this.loc.distance(game.movers[i].location) < this.radius + game.movers[i].radius){
        game.movers[i].clr = "rgba(255, 0, 0)"
      }
    }
  this.lifeSpan = this.lifeSpan-2;
}

//draws particles on the canvas
Particle.prototype.render = function(){
  let ctx = game.context1;
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, Math.PI*2, 0, false);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  let ctx2 = game.context2;
  ctx2.strokeStyle = this.clr;
  ctx2.fillStyle = this.clr;
  ctx2.save();
  ctx2.beginPath();
  ctx2.arc(this.loc.x, this.loc.y, this.radius, Math.PI*2, 0, false);
  ctx2.stroke();
  ctx2.fill();
  ctx2.restore();

}

//when a particle is dead, it will disappear from the canvas
Particle.prototype.isDead = function(){
  if(this.lifeSpan < 0){
    return true;
  }else{
    return false;
  }
}