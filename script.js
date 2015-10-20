// var svg, path;

function preload() {
    svg = loadSVG('test.svg');
    frameRate(20);
}

function setup(){
  createCanvas(windowWidth, windowHeight);//, SVG); //window or display
  background(255);
  smooth();
  image(svg, 0, 0, width, height);
  path = querySVG('path')[1];
}

function draw(){
  stroke(0);
  if (mouseIsPressed)
    line(pmouseX, pmouseY, mouseX, mouseY);
}


function done(){
  save();
}
