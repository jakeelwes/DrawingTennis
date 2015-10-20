// - - - - - - - - - - -

// DAT.GUI

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(window, 'BrushSize', 0, 100);// or dropdown - { Small: 5, Medium: 40, Large: 100 } );
  gui.add(window, 'Transparency', 0, 100);// { "10%": 25, "50%": 127, "100%": 255 } );
};

// - - - - - - - - - - -

var canvasSize;
var BrushSize = 10;
var Transparency = 100;

function setup(){

  if(windowWidth > windowHeight){
    canvasSize = windowHeight - 20;
  } else {
    canvasSize = windowWidth - 20;
  }

  createCanvas(canvasSize, canvasSize); //window or display
  background(255);
  smooth();
}

function draw(){
  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(BrushSize, 0, 100, 0, canvasSize/3);
  stroke(0, alpha);
  strokeWeight(bsize);
  if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY); //could use vertex and shape? - contant alpha
  }
}

// ---------------resize - won't reload
// function windowResized() {
//   if(windowWidth > windowHeight) {
//     canvasSize = windowHeight - 20;
//   } else {
//     canvasSize = windowWidth - 20;
//   }
//   resizeCanvas(canvasSize, canvasSize);
// }



// ---------------how to export svg
// var svg, path;
// function preload() {
//     svg = loadSVG('test.svg');
//     frameRate(20);
// }
//
// function setup() {
//     createCanvas(600, 200, SVG);
//     image(svg, 0, 0, 200, 200);
//     path = querySVG('path')[1];
// }
//
// function draw() {
//     // update line width of 2nd line
//     path.attribute('stroke-width', frameCount % 20);
//     if (frameCount === 18) {
//         noLoop();
//         save(); // save current SVG graphics
//     }
// }


// ---------------how to make blur
// in setup
// PGraphics brush = createGraphics(200,200);
// brush.beginDraw();
// brush.background(0,0,0,0);
// brush.fill(0);
// brush.noStroke();
// brush.ellipse(100,100,BrushSize,BrushSize);
// brush.filter(BLUR,5);
// brush.endDraw();
// cir = brush.get();
// imageMode(CENTER);
// in Draw
// image( cir, mouseX, mouseY);
