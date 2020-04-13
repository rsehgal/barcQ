/*var connectorId="";
var x1=0;
var y1=0;
var x2=0;
var y2=0;
var lineInitiated=0;
*/

/*function CreateGate(gateName,gateId,num_bits,gateX,gateY,isCloneAble=1){
//gateY=5+i*50;
  gate=svg.append('svg')
    .classed('gates', true)
    .attr("id",gateName)
    .attr("x",gateX)
    .attr("y",gateY)
    .attr("width",45)
    .attr("height",45)
    .attr("class","cloneAble")
    .attr("svg",1)
    .attr("name",gateName)
    .attr("num_bits",num_bits);

  if(isCloneAble==0){
  	gate.classed("cloneAble",false);
  	gate.classed("draggableComp",true);
  }

  image=gate.append('image')
      .attr("href","images/"+gateId+".png")
      .attr("x",5)
      .attr("y",0)
      .attr("onmousedown","enabledrag(evt)");

  var ystart=2;
  for(var bitnum=0;bitnum<num_bits;bitnum++){
    yval=ystart+10*bitnum;
    draw.rect(5,5).move(0, yval)
            .attr("class","connector input_gate_connector")
            .attr("onmousedown","test(evt)")
            .attr("onmouseup","TestMouseUp(evt)");
    inputConn=gate.append('rect')
            .attr("width",5)
            .attr("height",5)
            .attr("x",0)
            .attr("y",yval)
            .attr("class","connector input_gate_connector")
            .attr("onmousedown","test(evt)")
            .attr("onmouseup","TestMouseUp(evt)");

    outputConn=gate.append('rect')
            .attr("width",5)
            .attr("height",5)
            .attr("x",40)
            .attr("y",yval)
            .attr("class","connector output_gate_connector")
            .attr("onmousedown","test(evt)")
            .attr("onmouseup","TestMouseUp(evt)");

    
  }
}*/

/* 
** This function will be called on MOUSEDOWN event of any connector.
*/
function test(evt){
    var conn=evt.target;
	//alert(conn.position);
	if(connectorId!=""){
		$("#"+connectorId).css("stroke","black");	
	}
	connectorId=conn.getAttribute("id");
	//alert(connectorId);
	$("#"+connectorId).css("stroke","red");

	var parentSvgId=$("#"+connectorId).parent().attr("id");
	//alert("Parent ID : "+parentSvgId);

	//To disable drag when connector is clicked
	$("#"+parentSvgId).draggable('disable');

	//alert(conn.getAttribute("class").split(" ")[0]);
	mySvgToScreen(connectorId,parentSvgId);


}

/*
** This function will set the start and end of connection between two gates
*/
function mySvgToScreen(svgElemId,parentSvgId){
	//alert("ParentID : "+parentSvgId);
	console.log(svgElemId+" : "+parentSvgId);
	var posParent=$("#"+parentSvgId).position();

	//alert(posParent.left+" , "+posParent.top);
	console.log(posParent.left+" , "+posParent.top);
	if(lineInitiated==0){
		//alert(parseInt(posParent.left)+" : "+parseInt($("#"+svgElemId).attr("x")));
		
		x1 = parseInt(posParent.left)
		    +parseInt($("#"+svgElemId).attr("x"))
		    +parseInt($("#"+svgElemId).attr("width")/2)+2;
		y1 = parseInt(posParent.top)
			+parseInt($("#"+svgElemId).attr("y"))
		    +parseInt($("#"+svgElemId).attr("height")/2)
		    -parseInt($("#"+parentSvgId).attr("height"))+2;
		lineInitiated=1;
	}else{
		//x2=parseInt(posParent.left)+parseInt($("#"+svgElemId).attr("width"));
		//y2=parseInt(posParent.top)+parseInt($("#"+svgElemId).attr("height"));
		x2 = parseInt(posParent.left)
		    -parseInt($("#"+svgElemId).attr("x"))
		    -parseInt($("#"+svgElemId).attr("width")/2)+2;
		y2 = parseInt(posParent.top)
			+parseInt($("#"+svgElemId).attr("y"))
		    +parseInt($("#"+svgElemId).attr("height")/2)
		    -parseInt($("#"+parentSvgId).attr("height"))+2;
		    
		
	}
}
/*
function SVGToScreen(svgX, svgY) {
   var p = svg.createSVGPoint()
    p.x = svgX
    p.y = svgY
    return p.matrixTransform(svg.getScreenCTM());
}
*/

/*
** To reenable dragging when the Gate image is clicked
*/
function enabledrag(evt){
	$("#"+$("#"+evt.target.getAttribute("id")).parent().attr("id")).draggable('enable');
}

/*
** This function will be called on MOUSEUP event of any connector.
*/
function TestMouseUp(evt){
	//alert("MouseUp called on "+evt.target.getAttribute("id"));
	connectorId=evt.target.getAttribute("id");
	var parentSvgId=$("#"+connectorId).parent().attr("id");
	mySvgToScreen(connectorId,parentSvgId);	
	alert("Line Coords : ("+x1+","+y1+") : ("+x2+","+y2+")");
	//var backSvgCanvas = SVG("backSvgCanvas").addTo("#parentDiv");//.size(45, 45);
	/*draw.attr("svg",1)
		.attr("id","backSvgCanvas")
		.attr("class","connection");
	*/

	//backSvgCanvas.line(x1, y1, x2, y2)
	//			 .attr("class","connection");
	//lineInitiated=0;

	lineCounter++;
    //newid=$("#connectionWire").attr("id")+lineCounter;
    newid="wire"+lineCounter;
    //alert("ID of new line "+newid);    
    
    /*$("#connectionSVG").append($("#connectionWire").clone().attr("id",newid));
    $("#"+newid).attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2);
*/
   wire=svg.append('line')
      .attr("x1",x1-1)
      .attr("y1",y1+3)
      .attr("x2",x2+1)
      .attr("y2",y2+3)
      .attr("stroke-width",2)
      .attr("stroke","red")
      .classed("deleteable",true)
      .attr("onclick","deleteable(evt)")
      .attr("id",newid)
      .attr("position","fixed");
    //alert("Line added.........");
lineInitiated=0;


    /*$("#connectionSVG").clone()
    					.attr("id","svg"+newid);*/

    /*var wire=$("#svg"+newid).children("line");
    wire.css("id",newid);
    alert(wire);*/
    /*wire.setAttribute("id",newid);
    wire.setAttribute("class","connection");
    wire.setAttribute("x1",x1);
    wire.setAttribute("y1",y1);
    wire.setAttribute("x2",x2);


    wire.setAttribute("y2",y2);
    wire.setAttribut
e("stroke-width",2);
    wire.setAttribute("stroke","red");
    wire.setAttribute("position","fixed");*/
                 		
                 		/*.addClass("connection")
                 		.appendTo("body")
                 		.attr("x1",x1)
      					.attr("y1",y1)
      					.attr("x2",x2)
      					.attr("y2",y2)
      					.attr("stroke-width",2)
      					.attr("stroke","red")
      					.attr("position","fixed");*/
                 		
  /*$("#"+newid).css("position","fixed");
  $("#"+newid).css("left",posx);
  $("#"+newid).css("top",posy);
*/
}

function deleteable(evt){
	if(idForDelete!=""){
		tagname=$("#"+idForDelete).prop("tagName");
	if(tagname=="line"){
      $("#"+idForDelete).attr("stroke","red");
  }
}
	idForDelete=evt.target.getAttribute("id");
	$("#"+idForDelete).attr("stroke","blue");
	tagname=$("#"+idForDelete).prop("tagName");
	alert(tagname);
	alert(idForDelete);
}