var list = [];
var size = 10;
var segments = [];

function setup() {
  createCanvas(800, 800);
  
  // for(var i=0;i<300;i++){
  //  list.push(new Pixel(200,i));
  // }
  segments.push(new LSegment(0,0,-150,150))
  segments.push(new LSegment(0.13,20.5,-150,150))
  segments.push(new LSegment(0.23,35.5,-150,150))
  segments.push(new LSegment(-0.13,-20.5,-150,150))
  segments.push(new LSegment(-0.23,-35.5,-150,150))
  rectMode(CENTER)
  draw2()
}

function draw() {
  
}
function draw2(){
  background(100);
  translate(400, 400);
  drawGrid();
  stroke(0);
  // line(200, 0, 200, 300);
  line(0, -150, 0, 150);
  line(0, -150, 40, 150);
  line(0, -150, 70, 150);
  line(0, -150, -40, 150);
  line(0, -150, -70, 150);
  // line(200, 0, 180, 300);
  stroke(255);
  fill(255,0,0);
  // rect(20, 50, 10, 10);
  fill(255,0,255);
  
  for(var i=0;i<segments.length;i++){
    segments[i].display(20);
  };
}
function drawGrid() {
  stroke(255);
  fill(120);
  for (var x=-width; x < width; x+=40) {
    line(x, -height, x, height);
    text(x, x+1, 12);
  }
  for (var y=-height; y < height; y+=40) {
    line(-width, y, width, y);
    text(y, 1, y+12);
  }
}


class LSegment {
    constructor(slope,zero,low,high){
      this.slope = slope;
      this.zero = zero;
      this.lowY = low;
      this.highY = high;
    }
    display(pieces){
      stroke(255,0,0)
      fill(255,0,0)
      var lowX = this.lowY*this.slope+this.zero;
      rect(lowX, this.lowY, 10,10);
      console.log('low-'+lowX+','+this.lowY);

      var highX = this.highY*this.slope+this.zero;
      rect(highX, this.highY, 10,10);
      console.log('high-'+highX+','+this.highY);
      
      var parts = pieces-1;
      
      for(var i= 1;i<=parts;i++){
        var segLength = (this.highY-this.lowY)/parts;
        var midY = this.lowY+ (i*segLength);
        var midX = midY*this.slope+this.zero;
        rect(midX,midY, 10, 10);
      }
    }
}

class Pixel {
  constructor(x,y, size=10){
    this.x = x;
    this.y = y;
    this.size = size;
  };
  
  display() {
    stroke(255,0,0)
    fill(255,0,0)
    
    // rect(this.x -this.size/2,this.y-this.size/2 ,this.size,this.size)
    rect(this.x,this.y,this.size,this.size)
  }
}