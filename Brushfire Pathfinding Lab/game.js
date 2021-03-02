function Game(){

    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    this.canvas1Loc = new JSVector();
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    //  set number of cells in grid
    this.numCols = 35;
    this.cellWidth = this.canvas.width / this.numCols;
    this.numRows = 30;
    this.cellHeight = this.canvas.height / this.numRows;

    // Create the two-dimensional grid of cells
    this.grid = new Array(this.numRows);
    // Populate the grid of cells
    this.arrLoaded=false;
    for (let r = 0; r < this.grid.length; r++) {
        this.grid[r] = new Array(this.numCols);
        for (let c = 0; c < this.grid[r].length; c++) {
            if((Math.random()*10+1) <= 2){
              this.grid[r][c] = new Cell(this, r, c, true);
            }
            else{
              this.grid[r][c] = new Cell(this, r, c, false);
            }
        }
    }
    if(this.grid[this.numRows - 1][this.numCols - 1].occupied == true){
        this.grid[this.numRows - 1][this.numCols - 1].occupied = false;
    }
    this.arrLoaded=true;

    this.loadAllNeighbors();

    this.canvas.addEventListener("click", function(e){
      let c = Math.floor((e.offsetX+game.canvas1Loc.x)/game.cellWidth);
      let r = Math.floor((e.offsetY+game.canvas1Loc.y)/game.cellHeight);
      if((c>=0 && c<game.numCols) && (r>=0 && r<game.numRows)){
        game.grid[r][c].occupied = !game.grid[r][c].occupied;
        game.loadAllNeighbors();
      }
    });

    //label distances from endCell
    this.distances();

    //create the actors
    this.actors = [];
    for(let i=0;i<25;i++){
      let r = Math.floor(Math.random()*(this.numRows-1));
      let c = Math.floor(Math.random()*(this.numCols-1));
      let cell = this.grid[r][c];
      this.actors.push(new Actor(this, cell));
    }

}//++++++++++++++++++++++  end Game constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
    for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.numCols; c++) {
            this.grid[r][c].run();
        }
    }

    // run all the actors
      for(let i = 0; i < this.actors.length; i++){
          this.actors[i].run();
      }

}

Game.prototype.distances = function(){
  let queue = new Array();
  let count = 0;
  let currentCell;
  let endCell = this.grid[this.numRows-1][this.numCols-1];
  endCell.dist = 0;
  queue.push(endCell);
  while(queue.length>0 && count<2000){
    count++;
    currentCell = queue.shift();
    for(let i=0;i<currentCell.neighbors.length;i++){
      if(!currentCell.neighbors[i].parent && !currentCell.neighbors[i].occupied){
        currentCell.neighbors[i].dist=currentCell.dist+10;
        currentCell.neighbors[i].parent=currentCell;
        queue.push(currentCell.neighbors[i]);
      }
    }
  }
  endCell.dist=0;
}

Game.prototype.loadAllNeighbors = function(){
  for(let r =0; r<this.grid.length;r++){
    for(let c=0; c<this.grid[r].length;c++){
      this.grid[r][c].loadNeighbors();
    }
  }
}