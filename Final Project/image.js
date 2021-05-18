function Images() {

}


Images.prototype.animate = function(context, imageSource, locVector, height, width = height, speed, count) {
  let ctx = context;
  var img = new Image();
  this.loc = new JSVector(locVector.x, locVector.y);
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.count = count;
  this.imageSource = imageSource;
  if (this.count % this.speed === 0) {
    if (this.imageSource.length > this.count) {
      img.src = this.imageSource[this.count];
    } else {
      count = 0;
    }
    ctx.drawImage(img, this.loc.x, this.loc.y, this.height, this.with);
  }
};
