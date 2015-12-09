$(document).ready(function(){
  var height = $(window).height();
  var width = $(window).width();
  if (height<width){
    $('body').css('height', height * 0.9);
    $('body').css('width', height * 0.9);
    $('body').css('top', height * 0.05);
  } else {
    $('body').css('height', width * 0.9);
    $('body').css('width', width * 0.9);
    $('body').css('top', height * 0.05);
  }
});

/Mobile/.test(navigator.userAgent) && !location.hash && setTimeout(function () {
    // $("html").css("height", +=1);
    if (!pageYOffset) window.scrollTo(0, 1);
}, 1000);

var BrushSize = 20;
var Transparency = 1;
var Reset = function() {
  window.location.reload();
}
var Undo = function() {
  $("#sketch svg path").last().remove();
}

if(window.location.hash) {
  var hash = window.location.hash.substring(1);
} else {
  var hash = 'a';
}
// if(hash !== /[a|b|c|d]/){
//   console.log("error");
// }


console.log(hash);

var Finish = function() {

  var canvas = document.getElementById("sketch");
  var svgText = canvas.innerHTML;
  // svgText = svgText.replace(/<g><\/g>/g, "");
  function savedCallback(){
    window.location.href = "saved.html#" + hash;
  }
  function errorCallback(obj) {
    alert("Could not upload. Message: " + obj);
    console.log(obj)
  }
  var d = Date.now(); //or new Date()
  var date = new Date();
  var formattedDate = moment(date).format('Do MMMM YYYY, h:mm a');

  $.get("http://ipinfo.io", function(response) {

  var city = response.city;
  var country = response.country;

  var svgJSON = JSON.stringify({
        'date': d,
        'formattedDate': formattedDate + ", " + city + " " + country,
        'name': name,
        'index': hash,
        'data': svgText
      })

  $.ajax({
      url: 'http://drawingtennis.herokuapp.com/save',
      type: 'POST',
      data: svgJSON,
      success:savedCallback,
      error:savedCallback,
      contentType: 'application/json',
      dataType: 'json'
    },
    savedCallback);

  }, "jsonp")


}

$.get("http://drawingtennis.herokuapp.com/serve", function (result) {
  var fileCounter = 0;
  for(var i = 0; i<result.length; i++){
    if(result[i]['index'] == hash){
      fileCounter++;
    }
  }  if (fileCounter % 2 == 0) {
    brushCol = '#000000';
  } else if (fileCounter % 2 == 1) {
    brushCol = '#ffffff';
  }

  console.log(fileCounter);

if(window.innerWidth > window.innerHeight){
  size = window.innerHeight;
} else {
  size = window.innerWidth;
}



var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = size,
    height = size;

var ptdata = [];
var session = [];
var path;
var drawing = false;


var gui = new dat.GUI();
gui.add(window, 'BrushSize', 0, 100);// or dropdown - { Small: 5, Medium: 40, Large: 100 } );
gui.add(window, 'Transparency', 0, 1);// { "10%": 25, "50%": 127, "100%": 255 } );
gui.add(window, 'Reset');
gui.add(window, 'Undo')
gui.add(window, 'name');
gui.add(window, 'Finish');
// gui.add(text, 'name');
// gui.add(text, 'message/comment for next drawing');
// gui.on("touchend", listen); //solve GUI touch problem but drawing won't now respond
// $(".main").getChildren().on("touchend", 'listen');
// $(".main").getChildren().css("opacity", '0');


// $('body').on("touchend", ignore);


// var lineCSS = document.querySelector("svg");
// d3.select("#line").attr("stroke-width", '10');

var line = d3.svg.line()
    .interpolate("bundle") // basis, see http://bl.ocks.org/mbostock/4342190 step-before (pixely)
    .tension(1)
    .x(function(d, i) { return d.x; })
    .y(function(d, i) { return d.y; });


var svg = d3.select("#sketch").append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", '0, 0, 100, 100')
svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg
  .on("mousedown", listen)
  .on("touchstart", listen)
  .on("touchend", listen)
  .on("touchleave", ignore)
  .on("mouseup", ignore)
  .on("mouseleave", ignore);
document.ontouchmove = function(e){if (event.targetTouches.length == 1) {e.preventDefault();} }


function listen () {
  drawing = true;
  ptdata = []; // reset point data
  path = svg.append("path") // start a new line
    .data([ptdata])
    .attr("class", "line")
    .attr("d", line);
  if (d3.event.type === 'mousedown') {
    svg.on("mousemove", onmove);
  } else {
    svg.on("touchmove", onmove);
  }
}

function ignore () {
  var before, after;
  svg.on("mousemove", null);
  svg.on("touchmove", null);
  // skip out if we're not drawing
  if (!drawing) return;
  drawing = false;
  before = ptdata.length;
}

function onmove (e) {
  var type = d3.event.type;
  var point;
  if (type === 'mousemove') {
    point = d3.mouse(this);
  } else {
    // only deal with a single touch input
    if (event.targetTouches.length == 1) {
      point = d3.touches(this)[0];
    }
  }
  // push a new data point onto the back
  ptdata.push({ x: point[0], y: point[1] });
  tick();
}

function tick() {
  path.attr("stroke", brushCol)
  path.attr("d", function(d){ return line(d); }) // the path points
  path.attr("stroke-opacity", Transparency);
  path.attr("stroke-width", ((Math.pow(BrushSize,2))/10000) * $("body").width()/14);
}
// console.log($("body").width());

})
