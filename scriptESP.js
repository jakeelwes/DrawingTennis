// P5 Sketch

var img;
var canvasSize;
var BrushSize = 20;
var Transparency = 100;
var fileCounter = 2;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

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
  img = loadSVG('img' + fileCounter + '.svg');
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
  if (isMobile) {
	 line(ptouchX, ptouchY, touchX, touchY);
	  return false;
  }
}


var counter;
var req;

function updateCounter(){
	req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if (req.readyState == 4){
      		if(req.status == 200){
      			counter = JSON.parse(req.responseText);

      		} else if (req.status == 404){
      			counter = new Object();
      			counter.count = 0;
      		} else {
      			alert("Error getting count.");
      			return;
      		}
      		counter.count++;
      		writeTextFile(counter, "/count.json", function(){
      			alert("The count is: " + counter.count);
      		});
      	}
	};
	req.open("GET", "/count.json?" + (new Date()).getTime(), true);
	req.send(null);
}

function writeTextFile(jsonObject, filename, callback){
	req = new XMLHttpRequest();
	  req.onreadystatechange = function(){
	  	  if (req.readyState == 4){
            if(req.status == 200) {
            	callback();
            } else {
            	alert("Error uploading: " + req.statusText);
            }
          }
	  };
	  req.upload.onprogress = function(e){
	  	console.log("progress:", e);
	  };

	  var formData = new FormData();

	  var blob = new Blob([JSON.stringify(jsonObject)], {type:"text/json"});
	  formData.append("data", blob, filename);
	  req.open("POST", "/edit");
	  req.send(formData);
}

function writeSomeObject(){
	var obj = new Object();
	obj.someproperty = "xyzblahblahblah";
	obj.someotherproperty = "something";
	writeTextFile(obj, "/test.txt", function(){
		alert("Text file uploaded. (Replace me.)");
	});
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
