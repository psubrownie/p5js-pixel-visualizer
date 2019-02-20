var strips = [];
var size = 10;
var segments = [];
var colors = [[255,0,0],[0,255,0],[0,0,255]];


function setup() {
  createCanvas(800, 800);
  
  // for(var i=0;i<300;i++){
  //  list.push(new Pixel(200,i));
  // }
  segments.push(new LSegment(0,0,-150,150))
  segments.push(new LSegment((40/300.0),20,-150,150))
  segments.push(new LSegment((70/300.0),35,-150,150))
  segments.push(new LSegment(-(40/300.0),-20,-150,150))
  segments.push(new LSegment(-(70/300.0),-35,-150,150))
  rectMode(CENTER)

  background(100);
  
  // drawGrid();
  
  for(var i=0;i<segments.length;i++){
    var list = segments[i].mapPixels(20);
    strips.push(new Strip(list));
  };
  for(var i=0;i<strips.length;i++){
    var strip = strips[i];
    strip.wipe(255,0,0,200) ;
    // strip.wipe(0,255,0,200) ;
    // strip.wipe(0,0,255,200) ;
  }  
}

function draw() {
translate(400, 400);
}


// function drawGrid() {
//   stroke(255);
//   fill(120);
//   for (var x=-width; x < width; x+=40) {
//     line(x, -height, x, height);
//     text(x, x+1, 12);
//   }
//   for (var y=-height; y < height; y+=40) {
//     line(-width, y, width, y);
//     text(y, 1, y+12);
//   }
// }


class LSegment {
    constructor(slope,zero,low,high){
      this.slope = slope;
      this.zero = zero;
      this.lowY = low;
      this.highY = high;
    }
    mapPixels(pieces){
      var list = [];
      var lowX = this.lowY*this.slope+this.zero;
      list.push(new Pixel(lowX, this.lowY));
      
      var parts = pieces-1;
      
      for(var i= 1;i<=parts;i++){
        var segLength = (this.highY-this.lowY)/parts;
        var midY = this.lowY+ (i*segLength);
        var midX = midY*this.slope+this.zero;
        list.push(new Pixel(midX,midY));
      }

      var highX = this.highY*this.slope+this.zero;
      list.push(new Pixel(highX, this.highY));

      return list;
    }
}

class Pixel {
  constructor(x,y, size=10){
    this.x = x;
    this.y = y;
    this.size = size;
  };
  
  display(r,g,b) {
    stroke(r,g,b)
    fill(r,g,b)    
    rect(this.x,this.y,this.size,this.size)
  }
}

class Strip {
  constructor(pixels=[]){
    this.pixels = pixels;
  }
  wipe(r,g,b,speed){
    var i = 0;
    var colorIter = 1;
    var pixels = this.pixels;
    var intervalPID = setInterval(function(){
      var pixel = pixels[i++];
      pixel.display(r,g,b);
      if(i>=pixels.length){
        i=0;
        var color = colors[colorIter++ % 3]
        r=color[0];
        g=color[1];
        b=color[2];
        // clearInterval(intervalPID);
      }
    },speed);      
  }
}