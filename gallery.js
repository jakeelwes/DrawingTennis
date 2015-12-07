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
  $("#dragicon").css('opacity', '0');
  $("#name").css('opacity', '0');
  $("#break").css('opacity', '0');

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

    var names = [];
    var dates = [];

  for(var i = 0; i < result.length; i++){
    if(result[i]['index'] == hash){
      var $newDiv = $("<div>"+result[i]['data']+"</div>");
      $newDiv.attr("id", "svg" + c);
      $newDiv.attr("class", "no" + i);
      $newDiv.css('opacity', '0');
      $("#svg").append($newDiv);
      names.push(result[i]['name']);
      dates.push(result[i]['formattedDate']);
        // $("#svgPast").prepend("<div id=\"svgPast\">"+result[i]['data']+"</div>")
      c++;
    }
  }
  console.log(dates);

  $('#preloader').fadeOut('slow', function() {
    $(this).remove();
    $("#dragicon").css('opacity', '1');
    $("#name").css('opacity', '1');
    $("#break").css('opacity', '1');
  });

    var offset = $('#svgBG').offset();
    var bgWidth = $('#svgBG').width();
    var imgStrips = bgWidth/indexNum;
    var brk = false;

    $(document).on('mousemove', function(e){
        $("#dragicon").fadeOut();
        var xpos = e.pageX - $('#svgBG').offset().left;
        var imgNum = Math.max(0, Math.min(Math.round(xpos/imgStrips), indexNum));

        // console.log(imgNum);
        if(!brk){
          for(var i = 0; i <= imgNum; i++){
            $("#svg" + i).css('opacity', '1');
            // fade_in($("#svg" + i));
            // $("#svg" + i).fadeIn();
          }
          for(var i = imgNum; i <= c; i++){
            $("#svg" + i).css('opacity', '0');
            // $("#svg" + i).fadeOut();

          }
        }

        if((dates[imgNum - 1] == undefined) && (names[imgNum - 1] == undefined)){
          $("#name").text("  ");
        }
        if(names[imgNum - 1] == undefined){
          $("#name").text("drawn on " + dates[imgNum - 1]);
        } else if(dates[imgNum - 1] == undefined){
          $("#name").text("drawn by " + names[imgNum - 1]);
        } else {
          $("#name").text("drawn by " + names[imgNum - 1]  +"\ " + dates[imgNum - 1]);
        }
    });


    $("#break").click(function(){
        brk = true;
        $("div").css('position', 'relative');
        $("div").css('float', 'left');
        $("div").css('width', '80%');
        $("div").css('visibility', 'visible');

    });

})
