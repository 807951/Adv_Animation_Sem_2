

class PathFind{
  constructor(actor){
    this.actor = actor;
  }
  findNextNode(){
    let actor = this.actor;
	let game = this.actor.game;
    for(let i=0; i<actor.currentNode.neighbors.length; i++){
      if(actor.currentNode.neighbors[i].dist<actor.nextNode.dist){
		actor.currentNode=actor.nextNode;
		  if(actor.currentNode.children.length==0) { return;}
		  actor.nextNode = actor.currentNode.children[Math.floor(Math.random()*actor.currentNode.children.length)];
			actor.target = new JSVector(actor.nextNode.loc.x,
								actor.nextNode.loc.y);
      }
    }
  }
} //////////end PathFind class
