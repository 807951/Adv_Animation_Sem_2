function Vehicle(loc){
  this.loc = new JSVector(loc.x, loc.y);
  let dx = Math.random()*4-2;
  let dy = Math.random()*4-2;
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
  this.desiredSep = 30;
  this.neighborDist = 100;
  r = Math.random()*255;
  g = Math.random()*255;
  b = Math.random()*255;
  this.clr = "rgba(" + r + ", "+ g + ","+ b +")";
  this.maxSpeed = 5;
  this.maxForce = 1;
}

Vehicle.prototype.run = function(vehicles){
  this.flock(vehicles);
  this.update();
  this.checkEdges();
  this.render();
}

Vehicle.prototype.update = function(){
  if(!game.gamePaused){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
  }
}

Vehicle.prototype.checkEdges = function(){
  let world = game.world;
  if (this.loc.x > world.right){
    this.loc.x = world.left;
  }
  else if(this.loc.x < world.left){
    this.loc.x = world.right;
  }
  if(this.loc.y > world.top){
    this.loc.y = world.bottom;
  }
  else if(this.loc.y < world.bottom){
    this.loc.y = world.top;
  }
}

Vehicle.prototype.render = function(){
  let ctx = game.context1;
   /* r = Math.random()*200+55;
  g = Math.random()*155;
  b = Math.random()*155;
  this.clr = "rgba(" + r + ", "+ g + ","+ b +")"; */
  
  ctx.strokeStyle = this.clr;

  
  ctx.fillStyle = this.clr;
  
  ctx.save();
  ctx.beginPath();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection());
  ctx.moveTo(-20, -20);
        ctx.lineTo(20, -20);
        ctx.lineTo(20, 20);
        ctx.lineTo(-20, 20);
        ctx.lineTo(-20, -20);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

Vehicle.prototype.flock = function(vehicles){
  let flockForce =   new JSVector(0,0);
  let sep = this.separate(vehicles);
  let ali = this.align(vehicles);
  let coh = this.cohesion(vehicles);
  let sepMult = 0.01;
  let aliMult = 0.03;
  let cohMult = 0.03;
  sep.multiply(sepMult);
  ali.multiply(aliMult);
  coh.multiply(cohMult);
  flockForce.add(sep);
  flockForce.add(ali);
  flockForce.add(coh);
  flockForce.limit(this.maxForce);
  this.acc.add(flockForce);
}

Vehicle.prototype.separate = function (v) {
  let separation = new JSVector(0, 0);
  for(var i=0; i<v.length; i++){
    let difference = JSVector.subGetNew(this.loc, v[i].loc);
    let distance = difference.getMagnitude();
    if((distance>0) && (distance<this.desiredSep)){
      difference.normalize();
      separation.add(difference);
    }
  }
  return separation;
}

Vehicle.prototype.align = function (v) {
  let sum = new JSVector(0, 0);
  let count = 0;
  for(var i=0; i<v.length; i++){
    let distance = this.loc.distance(v[i].loc);
    if((distance>0) && (distance<this.neighborDist)){
      sum.add(v[i].vel);
      count++; 
    }
  }
  if(count>0){
    sum.divide(count);
     sum.normalize();
     sum.multiply(this.maxSpeed);
    let steer = sum.sub(this.vel);

    steer.limit(this.maxForce);
    return steer;
  }else{
    return new JSVector(0, 0);
  }
}

Vehicle.prototype.cohesion = function (v){
  let sum = new JSVector(0, 0);
  let count = 0;
  for(var i=0; i<v.length; i++){
    let distance = this.loc.distance(v[i].loc);
    if((distance>0) && (distance<this.neighborDist)){
      sum.add(v[i].loc);
      count++; //this counts the amount of vehicles that are in the desired distance
    }
  }
  if(count>0){
    sum.divide(count);
    return this.seek(sum);
  }else{
    return new JSVector(0, 0);
  }
}

Vehicle.prototype.seek = function(target){
  let desired = target.sub(this.loc);
  desired.normalize();
  desired.multiply(this.maxSpeed);
  let steer = desired.sub(this.vel);
  steer.limit(this.maxForce);
  return steer;
}