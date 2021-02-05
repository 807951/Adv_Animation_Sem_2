var ecoSystem;

window.onload = init;

function init(){
    ecoSystem = new EcoSystem();  
    animate();         
}
function animate(){

  ecoSystem.run();  
  requestAnimationFrame(animate);
}