function Game(){

      this.canvas1 = document.getElementById('cnv1');
      this.context1 = this.canvas1.getContext('2d');
      this.canvas2 = document.getElementById('cnv2');
      this.context2 = this.canvas2.getContext('2d');

      this.canvas1Loc = new JSVector();

      this.world = {
          top: -1500,
          left: -2000,
          bottom: 1500,
          right: 2000,
          width: 4000,
          height: 3000
      }
      // canvas2 is scaled according to the ratio of its
      // height and width to the height and width of the world
      // so that the entire world fits within canvas2
      this.scaleX = this.canvas2.width/this.world.width;
      this.scaleY = this.canvas2.height/this.world.height;

      // add an event handler such that the a, s, w, d keys
      // will reposition the canvas within the world.
      window.addEventListener("keypress", function(event){
          switch(event.code){
              case "KeyW":
                  if(game.canvas1Loc.y+100 > game.world.top)
                      game.canvas1Loc.y -= 20;
                  break;
              case "KeyS":
                  if(game.canvas1Loc.y + game.canvas1.height -100 < game.world.bottom)
                      game.canvas1Loc.y += 20;
                  break;
              case "KeyA":
                  if(game.canvas1Loc.x+100 > game.world.left)
                      game.canvas1Loc.x -= 20;
                  break;
              case "KeyD":
                  if(game.canvas1Loc.x + game.canvas1.width -100 < game.world.right)
                      game.canvas1Loc.x += 20;
                  break;
              break;
              }
      }, false);

  //creatures
  this.movers = [];
  this.createMovers(this.world, 5);

  this.moons = [];
    let numMoons = 50;
    for(var i = 0; i < numMoons; i++){
        var x, y, dx, dy, clr, r, g, b;
        x = Math.random()*(500 - 40) + 20;
        y = Math.random()*(500 - 40) + 20;
        dx = Math.random()*6-3;
        dy = Math.random()*6-3;
		r = Math.random()*255;
		g = Math.random()*255;
		b = Math.random()*255;
        clr = "rgba(" + r + ", "+ g + ","+ b +")"
        this.moons.push(new Moon(x, y, dx, dy, clr));
      }

  this.vehicles = [];
      this.numVehicles = 30;
      for(let i = 0; i < this.numVehicles; i++){
        this.vehicles.push(new Vehicle(new JSVector(Math.random()*this.world.width, Math.random()*this.world.height)));
      }

  this.snakes = [];
  this.createSnakes(this.world, 10);

  function createParticle(){
        for(let i = 0; i < game.snakes.length; i++){
          game.snakes[i].addParticle();
        }
      }
        setInterval(createParticle,200);
}//++++++++++++++++++++++  end game constructor



  // function to run the game each animation cycle
  Game.prototype.run = function(){
      let ctx1 = this.context1;
      let cnv1 = this.canvas1;
      let ctx2 = this.context2;
      let cnv2 = this.canvas2;
      ctx1.fillStyle =  "#505050";
      ctx1.fillRect(0,0,cnv1.width,cnv1.height);
      ctx2.fillStyle =  "#505050";
      ctx2.fillRect(0,0,cnv2.width,cnv2.height);

      // translate canvas1 according to the location of the canvas in the
      ctx1.save();
      ctx1.translate(this.canvas1Loc.x*(-1), this.canvas1Loc.y*(-1));

      // draw the bounds of the world in canvas1
      ctx1.strokeStyle = "rgba(0, 255, 0, 1)"
      ctx1.beginPath();
      ctx1.lineWidth = 5;
      ctx1.strokeRect(this.world.left, this.world.top, this.world.width, this.world.height);

      // draw the x and y axes of the world in canvas1
      // ctx1.strokeStyle = "rgba(255, 0, 0, 1)"
      // ctx1.beginPath();
      // ctx1.moveTo(0, this.world.top);
      // ctx1.lineTo(0, this.world.bottom);
      // ctx1.stroke();
      // ctx1.moveTo(this.world.left, 0);
      // ctx1.lineTo(this.world.right, 0);
      // ctx1.stroke();

      // scale canvas2 to contain the entire world
      ctx2.save();
      ctx2.beginPath();
      ctx2.lineWidth = 25;
      ctx2.strokeStyle = "rgba(255, 0, 0, 1)"
      ctx2.scale(this.scaleX, this.scaleY);

      // center the world in canvas2
      ctx2.translate(this.world.width/2, this.world.height/2);

      // draw the outline of canvas1 in canvas2
      ctx2.strokeStyle = "rgba(255, 255, 255, 1)"
      ctx2.strokeRect(this.canvas1Loc.x, this.canvas1Loc.y, this.canvas1.width, this.canvas1.height);

      // draw the x and y axes of the world
      // ctx2.strokeStyle = "rgba(255, 0, 0, 1)"
      // ctx2.moveTo(0, this.world.top);
      // ctx2.lineTo(0, this.world.bottom);
      // ctx2.stroke();
      // ctx2.moveTo(this.world.left, 0);
      // ctx2.lineTo(this.world.right, 0);
      // ctx2.stroke();
      // ctx1.restore();
      // ctx2.restore();

      for(let i = 0; i < this.moons.length; i++){
      this.moons[i].run();
     }
     for(let i = 0; i < this.movers.length; i++){
       this.movers[i].run();
     }
     for(let i = 0; i < this.snakes.length; i++){
       this.snakes[i].run();
     }
     for(let i = 0; i < this.numVehicles; i++){
       this.vehicles[i].run(this.vehicles);    //stars
     }

     ctx1.restore();
     ctx2.restore();
   }

//creates mover objects
Game.prototype.createMovers = function(canvas, numMovers){
  for(var i = 0; i<numMovers;i++){
    var x, y, dx, dy, radius, clr, r, g, b, numOrbs;
    radius = 15;
    x = Math.random()*500;
    y = Math.random()*500;
    dx = Math.random()*6-3;
    dy = Math.random()*6-3;
	r = Math.random()*200+55;
    g = Math.random()*155;
    b = Math.random()*155;
    clr = "rgba(" + r + ", " + g + "," + b +")"
    numOrbs = 50;
    this.movers.push(new Mover(x, y, dx, dy, radius, clr, numOrbs));
  }
}

//creates snake objects
Game.prototype.createSnakes = function(canvas, numSnakes){
  for(var i = 0; i < numSnakes; i++){
    var x, y, dx, dy, r, g, b, clr, numSegments;
    x = Math.random()*500;
    y = Math.random()*500;
    dx = Math.random()*6-3;
    dy = Math.random()*6-3;
    r = Math.random()*200+55;
    g = Math.random()*155;
    b = Math.random()*155;
    clr = "rgba(" + r + ", " + g + "," + b +")"
    numSegments = 7;
    this.snakes.push(new Snake(x, y, dx, dy, clr, numSegments));
  }
}