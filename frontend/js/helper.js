var pos=0;
var posx=0;
var posy=0;
var counter=0;
var idForDelete="";
var isSVG=0;
/*        
$("#cloneAble").click(function(){
  alert("Cloneable called.....");
  var posx="150px";
  var posy="1px";
  $('#cloneAble').clone().insertAfter(".draggableComp");
  $('#cloneAble').css("left",posx);
  $('#cloneAble').css("top",posy);
});
*/
function Attach(){
  //alert("Events attached........");
$(".cloneAble").click(function(){

  counter++;
  //alert("Cloneable called.....");
  //$(this).css("position","fixed");
  var posx="150px";
  var posy="1px";
  var idOfDroppable=$(this).attr("id");
  var gateName=$(this).attr("name");
  //alert(idOfDroppable);
  //$(idOfDroppable).clone().insertAfter(".draggableComp");
  var newid=idOfDroppable+counter;
  var numOfBits=$(this).attr("num_bits");
  //CreateGate(gateName,newid,numOfBits,posx,posy,0);
$(this).clone().attr("id",newid)
                 .addClass("draggableComp")
                 .appendTo("body")
                 .addClass("circuit");
  $("#"+newid).css("position","fixed");
  $("#"+newid).css("left",posx);
  $("#"+newid).css("top",posy);

  var isSVGClone=$(this).attr("svg");

  if(isSVGClone==1){
    //var imgId=$(this).children("image").attr("id");
    var newImageId="gateImage"+counter;
    //alert("Setting New Image id of clone : "+newImageId);
    $("#"+newid).children("image").attr("id",newImageId);

    var connectors=$("#"+newid).children("rect");//.length;
    //alert("numOfConnectors : "+connectors.length);
    var conString="";
    for(var conId=0;conId<connectors.length;conId++){
      //conString+=" : "+connectors[conId].getAttribute("id");
      var connId=newImageId+"Conn"+conId;
      connectors[conId].setAttribute("id",connId);
    }

    for(var conId=0;conId<connectors.length;conId++){
      conString+=" : "+connectors[conId].getAttribute("id");
      
    }
    //alert(conString);

  }else{
  
}
  GetEvent();
  
});


}




function GetEvent(){
$(".draggableComp").draggable({ appendTo: "body"});
    $('.draggableComp').on('mousedown',function(event){
    $(this).draggable( 'option', 'revert', false ); 
    var pos = $("#winston").position();
    posx=pos.left;
    posy=pos.top;
    //var coords = "X coords: " + posx + ", Y coords: " + posy;
    //alert("On mouse down : "+coords);
});
  

$('.draggableComp').click(function(){
  //alert("Focussed........");
  if(idForDelete!=""){
    if(isSVG==1){
  $("#"+idForDelete).css("outline","1px solid black");
    $("#"+idForDelete).css("background-color","white");  
  }else{
  $("#"+idForDelete).css("border-color","white");
}
  tagname=$("#"+idForDelete).prop("tagName");
  if(tagname=="line"){
      $("#"+idForDelete).attr("stroke","red");
  }

  idForDelete="";

}
  idForDelete=$(this).attr("id");
  //alert("Id to delete : "+idForDelete);
  //$(this).focus();
  isSVG=$(this).attr("svg");
  //alert("SVG : "+isSVG);
  //alert($(this).children("image").attr("id"));
  var imgId=$(this).children("image").attr("id");
  if(isSVG=="1"){
    $(this).css("outline","2px solid green");
    //$(this).css("background-color","yellow");
    
    //$("#"+imgId).css("border-color","green");
    //$("#"+imgId).css("border-width","2px");
  }
    else{
  $(this).css("border-color","green");
  $(this).css("border-width","2px");
}
  //alert("Focussed element ID : "+$(":focus").id);
});

$('html').keyup(function(ev){
  //alert("Key released..........");
  if(ev.key==="Delete"){
    //$(":focus").remove();
    if(idForDelete!=""){
    //alert("Delete key confirmed.....");
    //alert("Going to delete element with ID : "+$(":focus"));
    //alert("Going to delete element with ID : "+idForDelete);
    var delet="#"+idForDelete;
    
    tagname=$("#"+idForDelete).prop("tagName");
    if(tagname=="line"){
      start=$("#"+idForDelete).attr("startConnectorId");
      end=$("#"+idForDelete).attr("endConnectorId");
      $("#"+start).attr("wireId",$("#"+start).attr("wireId").replace(idForDelete,""));
      $("#"+end).attr("wireId",$("#"+end).attr("wireId").replace(idForDelete,""));
    }

    $(delet).remove();

    //idForDelete="";
  }
  }
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
            ui.draggable.css("position","fixed");
        } 
        } );

        $(".dropzone").droppable({
            drop: function(event, ui) {
            //$(this).css("background","yellow");
            ui.draggable.draggable( 'option', 'revert', false);
            //ui.draggable.css("position","absolute");
            ui.draggable.css("position","fixed");
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
    
}    