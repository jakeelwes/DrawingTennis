// P5 Sketch

var img;
var canvasSize;
var BrushSize = 20;
var Transparency = 100;
var div = document.getElementById("dom-target");
var fileCounter = Number(div.textContent) - 1;

var brushCol;

var Reset = function() {
  window.location.reload();
}

var Finish = function() {
  $.ajax({
        url: "saveFile.php",
        //data, an url-like string for easy access serverside
        data : save(),
        cache: false,
        async: true,
        type: 'post',
        timeout : 5000
    });
  // save('img' + (fileCounter++).toString());//, 'png');;
  noStroke();
  fill(255, 50);
  rect(0,0,width,height);
}

function preload() {
  img = loadSVG('svgs/img' + fileCounter + '.svg');
}

function setup(){

  if(windowWidth > windowHeight){
    canvasSize = windowHeight - 20;
  } else {
    canvasSize = windowWidth - 20;
  }

  createCanvas(canvasSize, canvasSize, SVG); //window or display
  smooth();
  background(255);

  var gui = new dat.GUI();
  gui.add(window, 'BrushSize', 0, 100);// or dropdown - { Small: 5, Medium: 40, Large: 100 } );
  gui.add(window, 'Transparency', 0, 100);// { "10%": 25, "50%": 127, "100%": 255 } );
  gui.add(window, 'Reset');
  gui.add(window, 'Finish');

  image(img, 0, 0, canvasSize, canvasSize);

  if (fileCounter % 2 == 0) {
    brushCol = 0;
  } else if (fileCounter % 2 == 1) {
    brushCol = 255;
  }

}

function draw(){
  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(pow(BrushSize,2), 0, 10000, 0, canvasSize/3);

  noFill();
  stroke(brushCol, alpha);
  strokeWeight(bsize);

  if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY); //could use vertex and shape? - contant alpha
  }
}

// for iOS Devices

function touchMoved() {
  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(pow(BrushSize,2), 0, 10000, 0, canvasSize/3);
  noFill();
  stroke(brushCol, alpha);
  strokeWeight(bsize);
	line(touchX, touchY, ptouchX, ptouchY);
	return false;
}




// --------------- use ajax & jquery to write file to server?
// $.ajax({
//   type: 'POST',
//   // url: url,//url of receiver file on server
//   // data: data, //your data
//   // success: success, //callback when ajax request finishes
//   // dataType: dataType //text/json...
// });

// ---------------resize - won't reload
// function windowResized() {
//   if(windowWidth > windowHeight) {
//     canvasSize = windowHeight - 20;
//   } else {
//     canvasSize = windowWidth - 20;
//   }
//   resizeCanvas(canvasSize, canvasSize);
// }
