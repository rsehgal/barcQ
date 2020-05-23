function MakeCloneAble(){
$(".cloneAble").click(function(){
  	var posx="150px";
  	var posy="1px";
  	/*var idOfDroppable=$(this).attr("id");
    var newid=idOfDroppable+dropableCounter;
    dropableCounter++;*/
    
  	//var numOfBits=$(this).attr("num_bits");
  	/*$(this).clone().attr("id",newid)
                 .addClass("draggableComp")
                 .appendTo("body")
                 .addClass("circuit");
      $("#"+newid).css("position","fixed");
                 */
    CloneIt($(this).attr("id"),"clonedElement");
  	//$("#"+newid).css("left",posx);
  	//$("#"+newid).css("top",posy);

  	/*AttachDraggableEvents();
    AttachDroppableEvents();*/
  });
}

/*
** Function just to create the clone based on the ID of the object to be
** cloned.
** 
** Created as a separate function because it is required while creating
** a new circuit and also to load the previously stored circuit
*/
function CloneIt(objId,parent="body"){
  console.log("ObjID from CloneIt : "+objId+" : TagName : "+$("#"+objId).prop("tagName"));
  dropableCounter++;
  var idOfDroppable=objId;
  var newid=idOfDroppable+dropableCounter;
  console.log("CloneIt called and created new id is "+newid);
   $("#"+objId).children().clone().attr("id",newid)
               .addClass("draggableComp")
               .appendTo($("#"+parent))
               .addClass("circuit");
  
  //$("#"+newid).css("position","fixed");
  AttachDraggableEvents();
  AttachDroppableEvents();
}


/*function ModifyParentDiv(divId){
  $("#"+divId).attr("gate",$("#"+divId).children().attr("gate"));
}*/ 

//Basically modify parameters of divs
function ModifyParentDiv(obj){
  console.log("ModifyParentDiv called.............");
  console.log("SVG ARG_VALUE  "+obj.children().attr("arg_value"));
  obj.attr("name",obj.children().attr("gate"));	
  obj.attr("gate",obj.children().attr("gate"));
  obj.attr("num_bits",obj.children().attr("num_bits"));
  obj.attr("ctl_enabled",obj.children().attr("ctl_enabled"));
  obj.attr("ctl_bits",obj.children().attr("ctl_bits"));
  obj.attr("tgt_bits",obj.children().attr("tgt_bits"));
  obj.attr("arg_enabled",obj.children().attr("arg_enabled"));
  obj.attr("arg_value",obj.children().attr("arg_value"));
  
  var numOfBits=parseInt(obj.children().attr("num_bits"));
  console.log("Num of bits from ModifyParentDiv : "+numOfBits);
  if(numOfBits>1){
      console.log("Num of bits : "+obj.attr("num_bits"));
      Merge(obj);
  }
  //InsertConnector(obj.attr("id"),5);
}


function MouseEnterLeave(){
  $(".dropzone").on('mouseenter',function(){
    $(this).css('background', 'orange');
  });

  $(".dropzone").on('mouseleave',function(){
    $(this).css('background', 'white');
  });
}


function InputArg() {
  var txt;
  var argVal = prompt("Please enter your value :", 1.57);
  console.log("Entered value : "+argVal);
  
}

function Attach(obj){
	obj.on('mousedown',function(event){
		if(event.which == 2){
			
			if(obj.attr("arg_enabled")==1){
				var argVal = prompt("Please enter your value :", 1.57);
				console.log("Need to set arg_val of "+obj.attr("id")+ " to "+argVal);
			    obj.attr("arg_value",argVal);
			    ModifyParentDiv(obj.parent());
			}
		}  
	});
}

function AttachDraggableEvents(){
  AttachSelectAndDelete();
	

	$('.draggableComp').on('mouseup',function(event){
		//alert("Mouse up called.........");
	    //$(".dropzone").css('background', 'transparent');
	});

	$(".draggableComp").draggable({ appendTo: "body"});
    $('.draggableComp').on('mousedown',function(event){
    	$(this).draggable( 'option', 'revert', false );
    });
  
  $(".dropzone").on('mouseenter',function(){
    //$(this).css('background', 'orange');
  });

  $(".dropzone").on('mouseleave',function(){
   // $(this).css('background', 'transparent');
  });
  
  $(".dropzone").on('mouseup',function(){
    $(this).css('background', 'transparent');
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
}

/*
** Function to set the control and target bits.
**
** WARNING
** -------
** This needs to be modified whenever a new gate is 
** introduced in the framework
*/
function SetControlAndTargetBits(objid,rowid,numofbits){
  ctlbits=[];
  tgtbits=[];
  if(parseInt($("#"+objid).attr("ctl_enabled"))!=0){
    /*
    ** This block is for control enabled gates
    ** Useful for CNOT, CCNOT.
    ** This needs to be modified whenever a new gate is 
    ** introduced in the framework
    */
    if(numofbits==2){
    for(var bitnum=0;bitnum<numofbits-1;bitnum++){
        ctlbits.push(rowid);
        rowid++;
    }
    tgtbits.push(rowid);
  }else{
    if(numofbits==3){
      if($("#"+objid).attr("gate")=="CCNOT"){
        ctlbits.push(rowid);
        rowid++;
        ctlbits.push(rowid);
        rowid++;
        tgtbits.push(rowid);
      }
      
      if($("#"+objid).attr("gate")=="CSWAP"){
        ctlbits.push(rowid);
        rowid++;
        tgtbits.push(rowid);
        rowid++;
        tgtbits.push(rowid);
      }
    }
  }
  }else{
    /*
    ** This block is for gates with control bits
    ** Useful for all single bit gate and SWAP gate
    */
    if(numofbits==1){
      ctlbits.push(0);
      tgtbits.push(rowid);
    }else{
        //For SWAP gate
        ctlbits.push(0);
        for(var bitnum=0;bitnum<numofbits;bitnum++){
          tgtbits.push(rowid);
          rowid++;
        }
      }
  }

  $("#"+objid).attr("ctl_bits",ctlbits);
  $("#"+objid).attr("tgt_bits",tgtbits);
}

function AttachDroppableEvents(){

$(".dropzone").droppable({
            drop: function(event, ui) {
			console.log("Previous Parent ID of draggable : "+ui.draggable.parent().attr("id"));
			var prevParentId=ui.draggable.parent().attr("id");
			//InsertConnector(ui.draggable.parent().attr("id"));
            //$(this).css("background","yellow");
            var colid=parseInt($(this).attr("columnid"))
            colIds.push(colid);
            var rowid=parseInt($(this).attr("rowid"));
            rowIds.push(rowid);
            Attach(ui.draggable);
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
            $(".dropzone").css('background', 'transparent');
            $(this).css("background","yellow");
            var idOfDroppable=$(this).attr("id");
            $("#"+ui.draggable.attr("id")).attr("style","position:fixed;");
            
            //Trying to set correct control and target bits
            SetControlAndTargetBits(ui.draggable.attr("id"),rowid,ui.draggable.attr("num_bits"));
            
            var numOfBits=parseInt(ui.draggable.attr("num_bits"));
            
          //  if(numOfBits==1){
            console.log("Deleting SVG of div : "+$(this).attr("id"));
            $("#svg-"+$(this).attr("id")).remove();
          //}

            ModifyParentDiv($(this));
            if(prevParentId!="body"){
              //alert("PreviousParentID : "+prevParentId);
              console.log("Previous Parent ID for Drag : "+prevParentId)
              UnMergeCellsOnDrag(prevParentId);
            }
            console.log("Previous Parent Div : "+prevParentId);
            //InsertConnector(prevParentId);
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

