
var posx=0;
var posy=0;
        

$(".draggableComp").draggable({ appendTo: "body"});
    $('.draggableComp').on('mousedown',function(event){
    $(this).draggable( 'option', 'revert', false ); 
    pos = $("#winston").position();
    posx=pos.left;
    posy=pos.top;
    //var coords = "X coords: " + posx + ", Y coords: " + posy;
    //alert("On mouse down : "+coords);
});


$('.draggableComp').on('mousedown',function(event){
    $(".dropzone").css('background', 'green');
});

$('.draggableComp').on('mouseup',function(event){
    $(".dropzone").css('background', 'white');
});


$(".draggableComp").on('mouseup',function(event){
//$("#winston").draggable({ appendTo: "body"});
  //pos = $(".draggableComp").position();
  pos=$(this).position();
  posx=pos.left;
  posy=pos.top;
  var coords = "X coords: " + posx + ", Y coords: " + posy;
  //alert("On mouse down : "+coords);
  $("#location").html(coords);


});

  $( ".nondropzone" ).droppable( 
        { 
            //accept:"#winston", 
            drop :function(event,ui) 
        {   
            ui.draggable.draggable( 'option', 'revert', true ); 
            //$(".dropzone").css("background","white");
        } 
        } );

        $(".dropzone").droppable({
            drop: function(event, ui) {
            //$(this).css("background","yellow");
            ui.draggable.draggable( 'option', 'revert', false);
            ui.draggable.css("position","absolute");
            $(this).append(ui.draggable);
             
                var pos=$(this).position();
                posx=pos.left;
                posy=pos.top;

                var width=$(this).width();
                var height=$(this).height();
                var winWidth=ui.draggable.width();
                var winHeight=ui.draggable.height();
                var coords = "X coords: " + posx + ", Y coords: " + posy + ", Width : "+width+" , Height : " + height+ ", WinstonWidth : "+winWidth+" , WinstonHeight : " + winHeight;
                //alert(coords);
              posx=parseInt(width/2)-parseInt(winWidth/2);
              posy=parseInt(height/2)-parseInt(winHeight/2);
              ui.draggable.css('left',posx);
              ui.draggable.css('top',posy);
              $(".dropzone").css('background', 'white');
              $(this).css("background","yellow");

              //Very import getting the ID of droppable element
              //May be required somewhere
              var idOfDroppable=$(this).attr("id");
              //alert($(this).attr("id"));
            },
            over: function(event, ui) {
		    //event.preventDefault();
                //$(this).css('background', 'orange');
            },
            out: function(event, ui) {
		    //event.preventDefault();
                //$(this).css('background', 'cyan');
            }
        });
    
    