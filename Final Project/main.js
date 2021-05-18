


var covidGame;   // game object


window.onload = init;//  After the window has been loaded, go to init

function init(){
    createMenu();
    covidGame = new CovidGame();  // global game
    animate();          // kick off the animation 
}

//  animation loop called 60 fps
function animate(){
    covidGame.run();    // run the game
    requestAnimationFrame(animate);
}
