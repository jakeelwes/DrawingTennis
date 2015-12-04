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
    $('body').css('top', width * 0.05);
  }
});

$.get("http://drawingtennis.herokuapp.com/serve", function (result) {
  console.log("THE SERVER SAYS: ", result)

  // for(var i = 0; i < result.length-1; i++){
  //   $("#svg").append("<div id="i"></div>");
  // }

  for(var i = 0; i <= result.length-1; i++){
    var $newDiv = $("<div>"+result[i]['data']+"</div>");
    $newDiv.attr("id", "svg" + i);
    $newDiv.css('visibility', 'hidden');
    $("#svg").append($newDiv);
  }

    var offset = $('#svgBG').offset();
    var bgWidth = $('#svgBG').width();
    var imgStrips = bgWidth/result.length;

    $(document).on('mousemove', function(e){
        $("#dragicon").css('visibility', 'hidden');
        var xpos = e.pageX - $('#svgBG').offset().left;
        var imgNum = Math.max(0, Math.min(Math.round(xpos/imgStrips), result.length));

        for(var i = 0; i <= imgNum; i++){
          $("#svg" + i).css('visibility', 'visible');
        }
        for(var i = imgNum; i <= result.length; i++){
          $("#svg" + i).css('visibility', 'hidden');
        }
        // console.log(imgNum);
    });
    // var counter = 0;
    //
    // window.setInterval(function(){
    //     if(counter<result.length){
    //       var $newDiv = $("<div>"+result[counter]['data']+"</div>");
    //       $newDiv.attr("id", "svg" + counter);
    //       $("#svg").append($newDiv);
    //       counter++;
    //     }
    // }, 10);
})
