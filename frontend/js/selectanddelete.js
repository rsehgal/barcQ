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
        $("#"+idForDelete).remove();
        idForDelete="";
      }
    }
  });
}