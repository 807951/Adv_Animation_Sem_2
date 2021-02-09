class EcoSystem {
    constructor() {
        ecoSystem = this;
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
        this.numCols = 40;
        this.cellWidth = this.world.width/this.numCols;
        this.numRows = 40;
        this.cellHeight = this.world.height/this.numRows;
        this.cells = new Array(this.numRows);
        for(let r=0; r<this.cells.length; r++){
          this.cells[r] = new Array(this.numCols);
          for(let c=0; c<this.numCols; c++){
            if(Math.random() <= 0.25){
                this.cells[r][c] = new Cell(this, r, c, true);
            }else{
                this.cells[r][c] = new Cell(this, r, c, false);
            }
          }
        }
        // makes sure the starting point and destination are not occupied
        if(this.cells[0][0].occupied == true){
            this.cells[0][0].occupied = false;
        }
        if(this.cells[this.numRows-1][this.numCols-1].occupied == true){
            this.cells[this.numRows-1][this.numCols-1].occupied = false;
        }
        this.arrayLoaded = true;
        this.loadNeighbors = function(){
          for(let r=0; r<this.cells.length; r++){
            for(let c=0; c<this.numCols; c++){
              this.cells[r][c].loadNeighbors();
            }
          }
        }
        this.loadNeighbors();
        this.canvas1Loc = new JSVector(this.cells[0][0].loc.x, this.cells[0][0].loc.y);
        this.actor = new Actor();
        this.scaleX = this.canvas2.width / this.world.width;
        this.scaleY = this.canvas2.height / this.world.height;
        this.canvas1.addEventListener("click", function(event){
          let r = Math.floor((event.offsetY+ecoSystem.canvas1Loc.y-ecoSystem.world.top)/ecoSystem.cellHeight);
          let c = Math.floor((event.offsetX+ecoSystem.canvas1Loc.x-ecoSystem.world.left)/ecoSystem.cellWidth);
          ecoSystem.cells[r][c].occupied = !ecoSystem.cells[r][c].occupied;
          ecoSystem.loadNeighbors();
        });
    }
    run() {
      let ctx1 = this.context1;
      let cnv1 = this.canvas1;
      let ctx2 = this.context2;
      let cnv2 = this.canvas2;
      ctx1.fillStyle = "white";
      ctx1.fillRect(0, 0, cnv1.width, cnv1.height);
      ctx2.fillStyle = "white";
      ctx2.fillRect(0, 0, cnv2.width, cnv2.height);
      ctx1.save();
      ctx1.translate(-this.canvas1Loc.x, -this.canvas1Loc.y);
      ctx1.beginPath();
      ctx1.strokeStyle = "green";
      ctx1.lineWidth = 2;
      ctx1.stroke();
      ctx1.beginPath();
      ctx1.moveTo(this.world.left, 0);
      ctx1.lineTo(this.world.right, 0);
      ctx1.moveTo(0, this.world.top);
      ctx1.lineTo(0, this.world.bottom);
      ctx1.strokeStyle = "black";
      ctx1.lineWidth = 2;
      ctx1.stroke();
      ctx2.save();
      ctx2.scale(this.scaleX, this.scaleY);
      ctx2.translate(this.world.width / 2, this.world.height / 2);
      ctx2.beginPath();
      ctx2.moveTo(this.world.left, 0);
      ctx2.lineTo(this.world.right, 0);
      ctx2.moveTo(0, this.world.top);
      ctx2.lineTo(0, this.world.bottom);
      ctx2.strokeStyle = "red";
      ctx2.lineWidth = 1 / this.scaleX;
      ctx2.stroke();
      let c1x = this.canvas1Loc.x;
      let c1y = this.canvas1Loc.y;
      ctx2.beginPath();
      ctx2.strokeStyle = "white";
      ctx2.lineWidth = 1 / this.scaleX;
      ctx2.rect(c1x, c1y, cnv1.width, cnv1.height);
      ctx2.stroke();
      let firstRow = Math.floor((this.canvas1Loc.y-this.world.top)/this.cellHeight);
      if(firstRow<0){
        firstRow=0;
      }
      let lastRow = Math.floor(firstRow+(cnv1.height/this.cellHeight));
      if(lastRow>=this.numRows){
        lastRow=this.numRows - 1;
      }
      let firstCol = Math.floor((this.canvas1Loc.x-this.world.left)/this.cellWidth);
      if(firstCol<0){
        firstCol=0;
      }
      let lastCol = Math.floor((this.canvas1Loc.x-this.world.left+cnv1.width)/this.cellWidth);
      if(lastCol>=this.numCols){
        lastCol=this.numCols-1;
      }
      for(let r=firstRow; r<=lastRow; r++){
        for(let c=firstCol; c<=lastCol; c++){
          this.cells[r][c].run();
        }
      }
      this.actor.run();
      this.canvas1Loc = new JSVector(this.actor.position.loc.x-this.cellWidth*3, this.actor.position.loc.y-this.cellHeight*3);
      ctx1.restore();
      ctx2.restore();
  }
}