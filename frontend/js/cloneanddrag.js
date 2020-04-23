function MakeCloneAble(){
$(".cloneAble").click(function(){
  	dropableCounter++;
  	var posx="150px";
  	var posy="1px";
  	var idOfDroppable=$(this).attr("id");
  	var newid=idOfDroppable+dropableCounter;
  	var numOfBits=$(this).attr("num_bits");
  	$(this).clone().attr("id",newid)
                 .addClass("draggableComp")
                 .appendTo("body")
                 .addClass("circuit");
  	$("#"+newid).css("position","fixed");
  	$("#"+newid).css("left",posx);
  	$("#"+newid).css("top",posy);

  	AttachDraggableEvents();
  });
}

function MouseEnterLeave(){
  $(".dropzone").on('mouseenter',function(){
    $(this).css('background', 'orange');
  });

  $(".dropzone").on('mouseleave',function(){
    $(this).css('background', 'white');
  });
}

function AttachDraggableEvents(){
	$('.draggableComp').on('mousedown',function(event){
	    $(".dropzone").css('background', 'green');
      //MouseEnterLeave();
	});

	$('.draggableComp').on('mouseup',function(event){
	    $(".dropzone").css('background', 'white');
	});

	$(".draggableComp").draggable({ appendTo: "body"});
    $('.draggableComp').on('mousedown',function(event){
    	$(this).draggable( 'option', 'revert', false );
    });
  
  $(".dropzone").on('mouseenter',function(){
    $(this).css('background', 'orange');
  });

  $(".dropzone").on('mouseleave',function(){
    $(this).css('background', 'white');
  });
  

  /*$(".dropzone").on('mouseout',function(){
    $(".dropzone").css('background', 'white');
  });*/

	$( ".nondropzone" ).droppable({ 
        drop :function(event,ui) {   
            ui.draggable.draggable( 'option', 'revert', true ); 
            ui.draggable.css("position","fixed");
        }
    });


$(".dropzone").droppable({
            drop: function(event, ui) {
            //$(this).css("background","yellow");
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
            posx=posx+parseInt(width/2)-parseInt(winWidth/2);
            posy=posy+parseInt(height/2)-parseInt(winHeight/2);
            ui.draggable.css('left',posx);
            ui.draggable.css('top',posy);
            $(".dropzone").css('background', 'white');
            $(this).css("background","yellow");
            ui.draggable.css("position","relative");

              //Very import getting the ID of droppable element
              //May be required somewhere
              var idOfDroppable=$(this).attr("id");
              //alert($(this).attr("id"));
            },
            over: function(event, ui) {
                //event.preventDefault();
                $(this).css('background', 'orange');
            },
            out: function(event, ui) {
                //event.preventDefault();
                $(this).css('background', 'cyan');
            }
        });
}
