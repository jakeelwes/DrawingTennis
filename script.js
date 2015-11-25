// P5 Sketch
$.get("http://drawingtennis.herokuapp.com/serve", function (result) {
  console.log("THE SERVER SAYS: ", result)
  // `result` here is an array of objects.
  // result.pop() returns the most recent object.
  // result.pop()['data'] is the svg string from that (most recent) object
  console.log("number of saved drawings: ", result.length)
  console.log("most recent drawing: ", result.pop()['data'])
})

var img;
var canvasSize;
var BrushSize = 20;
var Transparency = 100;
var brushCol;


var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

var Reset = function() {
  window.location.reload();
}

var Finish = function() {
  var canvas = document.getElementById("defaultCanvas");

  // document.getElementsByTagName("svg");
  // two.js

  var svgText = canvas.innerHTML;

  svgText = svgText.replace(/<g><\/g>/g, "");


  function savedCallback(){
    alert("saved" + obj);
    window.location.href = "http://jakeelwes.com/drawingtennis/saved.html";
  }

  function errorCallback(obj) {
    alert("Could not upload. Message: " + obj);
    console.log(obj)
  }

  var svgJSON = JSON.stringify({'data': svgText})
  console.log(svgJSON)

  //code to skip all empty SVG's "<g></g>" in svgText

  // httpPost("http://drawingtennis.herokuapp.com/save", svgText, text, savedCallback, errorCallback);
  $.ajax({
      url: 'http://drawingtennis.herokuapp.com/save',
      type: 'POST',
      data: svgJSON,
      contentType: 'application/json',
      dataType: 'json'
    },
    savedCallback)
}


// if (fileCounter % 2 == 0) {
//   brushCol = 0;
// } else if (fileCounter % 2 == 1) {
//   brushCol = 255;
// }

function setup(){

  if(windowWidth > windowHeight){
    canvasSize = windowHeight - 20;
  } else {
    canvasSize = windowWidth - 20;
  }

  createCanvas(canvasSize, canvasSize, SVG); //window or display
  smooth();
  // background(255);

  var gui = new dat.GUI();
  gui.add(window, 'BrushSize', 0, 100);// or dropdown - { Small: 5, Medium: 40, Large: 100 } );
  gui.add(window, 'Transparency', 0, 100);// { "10%": 25, "50%": 127, "100%": 255 } );
  gui.add(window, 'Reset');
  gui.add(window, 'Finish');

  // image(img, 0, 0, canvasSize, canvasSize);


  brushCol = 0;

}

// var points = [];
// var shapePoints = [];


function draw(){

  // clear();
  // background(255);

  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(pow(BrushSize,2), 0, 10000, 0, canvasSize/3);

  noFill();
  stroke(brushCol, alpha);
  strokeWeight(bsize);

  if (!isMobile) {
    if(mouseIsPressed){
      line(pmouseX,pmouseY,mouseX,mouseY);
    }
  }


  // for(var j = 0; j<points.length; j++){
  //   for(var i = 2; i<shapePoints.length; i += 2){
  //     line(shapePoints[j][i-2], shapePoints[j][i-1], shapePoints[j][i], shapePoints[j][i+1]);
  //   }
  // }
}
//
// function mouseDragged() {
//   if (!isMobile) {
//     shapePoints.push(mouseX, mouseY);
//     // line(pmouseX,pmouseY,mouseX,mouseY); //could use vertex and shape? - contant alpha
//     console.log(shapePoints);
//
//   }
// }
//
// function mouseRelseased(){
//   if (!isMobile) {
//     points.push(shapePoints);
//     shapePoints.clear();
//   }
// }


// for iOS Devices
function touchMoved() {
  var alpha = map(Transparency, 0, 100, 0, 255);
  var bsize = map(pow(BrushSize,2), 0, 10000, 0, canvasSize/3);
  noFill();
  stroke(brushCol, alpha);
  strokeWeight(bsize);
  if (isMobile) {
	 line(ptouchX, ptouchY, touchX, touchY);
	  return false;
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
