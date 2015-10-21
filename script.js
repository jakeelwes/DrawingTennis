// - - - - - - - - - - -

// DAT.GUI

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(window, 'BrushSize', 0, 100);// or dropdown - { Small: 5, Medium: 40, Large: 100 } );
  gui.add(window, 'Transparency', 0, 100);// { "10%": 25, "50%": 127, "100%": 255 } );
  gui.add(window, 'Reset');
  gui.add(window, 'Finish');
};

// - - - - - - - - - - -

var last;
var canvasSize;
var BrushSize = 20;
var Transparency = 100;
var save = false;
// var strokes[];
var Reset = function() {
  image(last, 0, 0, canvasSize, canvasSize);
}
var Finish = function() {
  saveCanvas('last', 'png');;
}

function preload() {
  last = loadImage('last.png');
}

function setup(){

  if(windowWidth > windowHeight){
    canvasSize = windowHeight - 20;
  } else {
    canvasSize = windowWidth - 20;
  }

  createCanvas(canvasSize, canvasSize); //window or display
  smooth();
  background(255);

  image(last, 0, 0, canvasSize, canvasSize);

}

function draw(){
  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(pow(BrushSize,2), 0, 10000, 0, canvasSize/3);

  noFill();
  stroke(255, alpha);
  strokeWeight(bsize);

  if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY); //could use vertex and shape? - contant alpha
  }
}



// --------------- use ajax & jquery to write file to server?
// $.ajax({
//   type: 'POST',
//   // url: url,//url of receiver file on server
//   // data: data, //your data
//   // success: success, //callback when ajax request finishes
//   // dataType: dataType //text/json...
// });



// ---------------- check if file exists
// $.get(002.png)
//     .done(function() {
//         console.log("Exists.")
//     }).fail(function() {
//         console.log("Doesnt.")
//     })




// ---------------using shape
// beginShape();
// while (mouseIsPressed){
//   vertex(mouseX, mouseY);
//   vertex(0,0);
// }
// endShape();




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




// ---------------how to make blur processing
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
