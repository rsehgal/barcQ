function ResetDiv(objId){
  $("#"+objId).parent().attr("gate","");
  $("#"+objId).parent().attr("num_bits",0);
  $("#"+objId).parent().attr("ctl_enabled",0);
  $("#"+objId).parent().attr("ctl_bits",0);
  $("#"+objId).parent().attr("tgt_bits",0);
  $("#"+objId).parent().attr("arg_enabled",0);
  $("#"+objId).parent().attr("arg_value",0);
}

function AttachSelectAndDelete(){
  //alert("Inside AttachSelectAndDelete..........");
  $('.draggableComp').click(function(){

    //alert("Clicked the image...........");
    if(idForDelete!=""){
      $("#"+idForDelete).parent().css("border-color","blue");
    }
    idForDelete=$(this).attr("id");
    $("#"+idForDelete).parent().css("border-color","green");
    console.log(idForDelete);
    //$(this).css("border-color","green");
    //$(this).css("border-width","4px");
  });

  $('html').keyup(function(ev){
    //alert("Key released..........");
    if(ev.key==="Delete"){
      //$(":focus").remove();
      if(idForDelete!=""){
        $("#"+idForDelete).parent().css("border-color","blue");
        ResetDiv(idForDelete);
        $("#"+idForDelete).remove();
        idForDelete="";
      }
    }
  });
}