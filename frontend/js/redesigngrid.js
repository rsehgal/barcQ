
/*
 * Function to put a solid circle, (which will act like connector)
 * on the center of each div
 * 
 * Variable "gridConnectorRadius" is defined in "globalvars.js"
 */

function InsertConnectorOnGrid(){

	console.log("---------------- Divs Center -----------------");
	var rowList=$("#dropzonetable tr");
	var numOfRows=rowList.length;
	//console.log("Number of Rows : "+numOfRows);
	for(var rowIndex=0 ; rowIndex < numOfRows ; rowIndex++ ){
		//console.log("RowId : "+rowList[rowIndex].id);
		var rowid=rowList[rowIndex].id;
		var colList= $("#"+rowid+" td"); //$("#"+rowList[rowIndex]).children().prop("td");
		var numOfColumns=colList.length;
		//console.log("Number of Columns : "+numOfColumns);
		for (var colIndex=0; colIndex < numOfColumns ; colIndex++){
			var colid=colList[colIndex].id;
			//console.log("ColID : "+colid);
			var divid=$("#"+colid).children().attr("id");
			//console.log("DivIDD : "+divid);
			//InsertConnector(divid);
			
			var divWidth=$("#"+divid).width();
			var divHeight=$("#"+divid).height();
			var svgContainer = d3.select("#"+divid).append("svg")
								 .attr("width",divWidth)
								 .attr("height",divHeight)
								 .attr("id","svg-"+divid);
			//Draw the Circle
			var circle = svgContainer.append("circle")
							  .attr("cx",divWidth/2)
							  .attr("cy",divHeight/2)
							  .attr("r", gridConnectorRadius)
							  .attr("stroke","black")
							  .attr("stroke-width","1px"); 
			
			
	 	}
	}
	
}


function CreateControlledGate(divid,numofbits){
	var divWidth=$("#"+divid).width();
	var divHeight=$("#"+divid).height();
	var cx=divWidth/2;
	var cy=divHeight/(2*numofbits);
	if(divid!="body"){
		var svgContainer = d3.select("#"+divid).append("svg")
								 .attr("width",divWidth)
								 .attr("height",divHeight)
								 .attr("id","svg-"+divid);
		var circle = svgContainer.append("circle")
							  .attr("cx",cx)
							  .attr("cy",cy)
							  .attr("r", gridConnectorRadius+2)
							  .attr("stroke","red")
							  .attr("stroke-width","1px"); 

		cy*=3
		var circle2 = svgContainer.append("circle")
							  .attr("cx",cx)
							  .attr("cy",cy)
							  .attr("r", gridConnectorRadius+2)
							  .attr("stroke","red")
							  .attr("stroke-width","1px"); 


	}
}

/*
** Function to just put the connector for single bit gate upon 
** ideally it should support all
*/
function InsertConnector(divid,rad=gridConnectorRadius){
	//alert(divid+" "+initalize);
	var numofbits=parseInt($("#"+divid).attr("num_bits"));
	if(numofbits==0){
		numofbits=1;
	}

	console.log("DivId from InsertConnector : "+divid+" :: Num of bits from InsertConnector : "+numofbits);
	console.log("parent : "+divid);
	var divWidth=$("#"+divid).width();
	var divHeight=$("#"+divid).height();
	var cx=divWidth/2;
	var cy=divHeight/(2*numofbits);
	if(divid!="body"){
		var svgContainer = d3.select("#"+divid).append("svg")
								 .attr("width",divWidth)
								 .attr("height",divHeight)
								 .attr("id","svg-"+divid)
								 .classed("draggableComp",true);
		var circle = svgContainer.append("circle")
							  .attr("cx",cx)
							  .attr("cy",cy)
							  .attr("r", rad)
							  .attr("stroke","black")
							  .attr("stroke-width","1px"); 

	}
	AttachDraggableEvents();
}

function InsertOnlyConnector(svgContainer,cx,cy){
		
		//Draw the Circle
		var circle = svgContainer.append("circle")
							  .attr("cx",cx)
							  .attr("cy",cy)
							  .attr("r", gridConnectorRadius)
							  .attr("stroke","black")
							  .attr("stroke-width","1px"); 
		
}
/*
 * Function to return the center of the div with supplied divid
 */
function GetDivCenter(divid){
	console.log("DivID from GetDivCenter : "+divid);
	var pos=$("#"+divid).position();
	console.log("Position : "+pos);
    var posx=pos.left;
    var posy=pos.top;
    console.log(posx+","+posy);
    var width=$("#"+divid).width();//css("width");
    var height=$("#"+divid).height();//css("height");
    console.log("Div Width : "+width+" : Div Height : "+height);
    posx=posx+parseInt(width/2);
    posy=posy+parseInt(height/2);
    console.log(posx+","+posy);
    var divCenter=[];
    divCenter.push(posx);
    divCenter.push(posy);        
	console.log(divCenter);
    return divCenter;
}
