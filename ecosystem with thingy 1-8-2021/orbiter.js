function Orbiter(mover, orbiterRad, orbitRad, angle, angleVel, clr){
  this.mover = mover;
  this.radius = orbiterRad;
  this.rotator = new JSVector(orbitRad, 0);
  this.rotator.setDirection(angle);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);
  this.angleVel = angleVel;
  this.clr = clr;
 }

Orbiter.prototype.update = function(){
  this.rotator.rotate(this.angleVel);
  this.location = JSVector.addGetNew(this.mover.location, this.rotator);

  // let o = this.mover.orbiters;
  // for(let i = 0; i<o.length; i++){
  //   if(this !== o[i]){
  //     let d = this.location.distance(o[i].location);
  //     if(d<200){
  //       this.acceleration = JSVector.subGetNew(this.location, o[i].location);
  //       this.acceleration.normalize();
  //       this.acceleration.multiply(0.05);
  //     }
  //   }
  // }
}

 Orbiter.prototype.render = function(){
   let ctx = game.context1;
   //draw orbiter
   ctx.strokeStyle = this.clr;
   ctx.fillStyle = this.clr;
   ctx.lineWidth = 1;
   ctx.beginPath();
   ctx.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
   ctx.stroke();
   ctx.fill();

   let ctx2 = game.context2;
   ctx2.strokeStyle = this.clr;
   ctx2.fillStyle = this.clr;
   ctx2.lineWidth = 1;
   ctx2.beginPath();
   ctx2.arc(this.location.x, this.location.y, this.radius, Math.PI*2, 0, false);
   ctx2.stroke();
   ctx2.fill();
   //draw line
   // ctx.lineCap = "round";
   // ctx.lineWidth = 4;
   // ctx.beginPath();
   // ctx.moveTo(this.mover.location.x, this.mover.location.y);
   // ctx.lineTo(this.location.x, this.location.y);
   // ctx.stroke();
}