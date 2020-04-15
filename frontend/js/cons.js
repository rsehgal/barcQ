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
	startConnectorId=connectorId;
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
function mySvgToScreen(svgElemId,parentSvgId,onlyUpdate=0,initial=0){
	//alert("ParentID : "+parentSvgId);
	console.log(svgElemId+" : "+parentSvgId);
	var posParent=$("#"+parentSvgId).position();

	//alert(posParent.left+" , "+posParent.top);
	console.log(posParent.left+" , "+posParent.top);

	if(onlyUpdate!=0){
		if(initial!=0){
			x1 = parseInt(posParent.left)
		    	+parseInt($("#"+svgElemId).attr("x"))
		    	+parseInt($("#"+svgElemId).attr("width")/2)+2;
			y1 = parseInt(posParent.top)
				+parseInt($("#"+svgElemId).attr("y"))
		    	+parseInt($("#"+svgElemId).attr("height")/2)
		    	-parseInt($("#"+parentSvgId).attr("height"))+2;

		}else{
			x2 = parseInt(posParent.left)
		    	-parseInt($("#"+svgElemId).attr("x"))
		    	-parseInt($("#"+svgElemId).attr("width")/2)+2;

			y2 = parseInt(posParent.top)
				+parseInt($("#"+svgElemId).attr("y"))
		    	+parseInt($("#"+svgElemId).attr("height")/2)
		    	-parseInt($("#"+parentSvgId).attr("height"))+2;
		}

	}else{

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
	endConnectorId=connectorId;
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
      .attr("onmouseover","changecursor(evt)")
      .attr("id",newid)
      .attr("startConnectorId",startConnectorId)
      .attr("endConnectorId",endConnectorId)
      .attr("position","fixed");
    //alert("Line added.........");

lineInitiated=0;

	 //registering WireId to connector
	 startConnectorWireIds=$("#"+startConnectorId).attr("wireId");
	 endConnectorWireIds=$("#"+endConnectorId).attr("wireId");
	 if(startConnectorWireIds==""){
	 	$("#"+startConnectorId).attr("wireId",newid);
	 }else{
	 	$("#"+startConnectorId).attr("wireId",startConnectorWireIds+" "+newid);
	}

	if(endConnectorWireIds==""){
		$("#"+endConnectorId).attr("wireId",newid);
	}else{
	 $("#"+endConnectorId).attr("wireId",endConnectorWireIds+" "+newid);
	}
	

/*
** Trying to fill JSON in real time,
** better approach, because it will keep on adding 
** an entry, when the line is created
*/
//finalInsert={};
item = {};
inneritem={};
inneritem ["from"] = startConnectorId;
inneritem ["to"] = endConnectorId;
//inneritem ["gate"] = endConnectorId;


item[newid]=inneritem;
//finalInsert["name"]=item;
jsonObj.push(item);
//jsonObj.push(finalInsert);
PrintJSON();
//ExportJSON();
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

$(".deleteable").mouseover(function(){
	alert("Line detected....");
	$(this).css('cursor', 'pointer');
});

function changecursor(evt){
	//alert("Moved over line");
	/*tagname=$("#"+evt.target.getAttribute("id")).prop("tagName");
	if(tagname=="rect"){
		$("#"+evt.target.getAttribute("id")).attr("outline","2px solid green");
	}*/
	$("#"+evt.target.getAttribute("id")).css('cursor', 'pointer');
}

$("#jsonbutton").click(function(){
	ExportJSON();
});

function ExportJSON(){
	var lines=$("line");
	//alert("Number of connections : "+lines.length);
	//console.log("Number of connections : "+lines.length);
	createJSON();
}

/*
** Function to call at the end when we want to export the mapping to JSON
*/
function createJSON() {
    
    $("line").each(function() {

        var startGateConnectorId = $(this).attr("startConnectorId");
        var endGateConnectorId = $(this).attr("endConnectorId");

        item = {}
        item ["from"] = startGateConnectorId;
        item ["to"] = endGateConnectorId;

        jsonObj.push(item);
    });

    console.log(jsonObj);
}

function PrintJSON(){
	console.log(jsonObj);	
}

/*
** This function is used to update the connecting line when the gate
** is dragged.
*/

//function UpdateDrag(gateid){
function UpdateDrag(evt){
//$(".draggableComp").mouseup(function(){
//alert("Mouse up called.......... from UpdateDrag........");
console.log("------------------------------");
  //var gateid=evt.target.getAttribute("id");
  var imageid=evt.target.getAttribute("id");
  var gateid=$("#"+imageid).parent().attr("id");
  //var gateid=$(this).attr("id");
  console.log("GateID : "+gateid);
  //alert("GateID : "+gateid);
  var gateconns=$("#"+gateid).children("rect");
  //alert(gateconns.length);
  for(var conIndex=0;conIndex<gateconns.length;conIndex++){
      var className=gateconns[conIndex].getAttribute("class").split(" ")[1];
      console.log("classname : "+className);
      var wireId=gateconns[conIndex].getAttribute("wireId");
      console.log("wireId : "+wireId);
      var connectorId=gateconns[conIndex].getAttribute("id");
      console.log("connectorId : "+connectorId);
      if(wireId!=""){
      if(className=="input_gate_connector"){
        //Change X2, Y2
        console.log("Going to modify final point..");
        var parentSvgId=$("#"+connectorId).parent().attr("id");
    //alert("Parent ID : "+parentSvgId);

    //alert(conn.getAttribute("class").split(" ")[0]);
    mySvgToScreen(connectorId,parentSvgId,1,0);
   x1=parseInt($("#"+wireId).attr("x1"));
   y1=parseInt($("#"+wireId).attr("y1"));
   console.log("Unmodified Initial Point for wireId :"+wireId+" : ("+x1+","+y1+")");

      }

      if(className=="output_gate_connector"){
        //Change X1, Y1
        console.log("Going to modify initial point..");
        var parentSvgId=$("#"+connectorId).parent().attr("id");
    //alert("Parent ID : "+parentSvgId);

    //alert(conn.getAttribute("class").split(" ")[0]);
    mySvgToScreen(connectorId,parentSvgId,1,1);
    x2=parseInt($("#"+wireId).attr("x2"));
   y2=parseInt($("#"+wireId).attr("y2"));
   console.log("Unmodified final Point for wireId : "+wireId+" : ("+x2+","+y2+")");


      }
      var lineId="#"+wireId;
     $(lineId).attr("x1",x1-1)
              .attr("y1",y1+3)
              .attr("x2",x2+1)
              .attr("y2",y2+3);

      //alert(gateconns[conId].getAttribute("class").split(" ")[1]);
    }
}

}