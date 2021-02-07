var ecoSystem;   // a single global object

window.onload = init;//  After the window has been loaded, go to init

function init(){
    ecoSystem = new EcoSystem();  // global game
    animate();          // kick off the animation
}
//  animation loop called 60 fps
function animate(){
    // paint the canvas with mostly transparent black
  // game.ctx.fillStyle = 'rgba(0,0,0)'
  // game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
  ecoSystem.run();    // run the game
  requestAnimationFrame(animate);
}