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

    if(window.location.hash) {
      var hash = window.location.hash.substring(1);
    } else {
      var hash = 'a';
    }

    var indexNum = 0;
    for(var i = 0; i<result.length; i++){
      if(result[i]['index'] == hash){
        indexNum++;
      }
    }
    console.log(indexNum);
    var c = 0;

  for(var i = 0; i < result.length; i++){
    if(result[i]['index'] == hash){
      var $newDiv = $("<div>"+result[i]['data']+"</div>");
      $newDiv.attr("id", "svg" + c);
      $newDiv.attr("class", "no" + i);
      $newDiv.css('visibility', 'hidden');
      $("#svg").append($newDiv);
        // $("#svgPast").prepend("<div id=\"svgPast\">"+result[i]['data']+"</div>")
      c++;
    }
  }

    var offset = $('#svgBG').offset();
    var bgWidth = $('#svgBG').width();
    var imgStrips = bgWidth/indexNum;

    $(document).on('mousemove', function(e){
        $("#dragicon").css('visibility', 'hidden');
        var xpos = e.pageX - $('#svgBG').offset().left;
        var imgNum = Math.max(0, Math.min(Math.round(xpos/imgStrips), indexNum));

        // console.log(imgNum);

        for(var i = 0; i <= imgNum; i++){
          $("#svg" + i).css('visibility', 'visible');
        }
        for(var i = imgNum; i <= result.length; i++){
          $("#svg" + i).css('visibility', 'hidden');
        }
    });

    $("#break").click(function(){
        $("div").css('position', 'relative');
        $("div").css('width', '80%');
        $("div").css('padding', '0');

    });

})
