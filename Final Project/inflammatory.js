class Inflammatory{
  constructor(game, r, c){
    this.game = covidGame;
    this.r = r;
    this.c = c;
    this.loc = game.cells[r][c].loc;
    this.price = 50;
    this.health = 1;
    this.damage = 0;
  }


  run(){
    this.update();
    this.render();
  }

  render(){
    let ctx = this.game.context1;
    // for(let i = 0; i < this.game.basicEnemies.length; i++){
    //   if(this.game.basicEnemies[i].frozen == true){
    //     ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    //     ctx.fillRect(covidGame.bounds.left, covidGame.bounds.top , covidGame.bounds.width, covidGame.bounds.height);
    //   }
    // }

    ctx.strokeStyle = "black";
    ctx.fillStyle = "powderblue";
    ctx.beginPath();
    ctx.arc(this.loc.x + this.game.cellWidth/2, this.loc.y+ this.game.cellHeight/2, 12, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }

  update(){
    for(let i = 0; i < this.game.basicEnemies.length; i++){
      this.game.basicEnemies[i].frozen = true;
      this.game.basicEnemies[i].countdown = 3*60;
    }
  }

}
