
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
			InsertConnector(divid);
			/*
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
			*/
			
	 	}
	}
	
}


function CreateControlledGate(svgContainer,cx,cy){
	
}

function InsertConnector(divid,initalize=1){
	alert(divid+" "+initalize);
	var divWidth=$("#"+divid).width();
	var divHeight=$("#"+divid).height();
	var cx=divWidth/2;
	var cy=divHeight/2;
	if(divid!="body"){
		var svgContainer = d3.select("#"+divid).append("svg")
								 .attr("width",divWidth)
								 .attr("height",divHeight)
								 .attr("id","svg-"+divid);
	if(initalize==1){
		InsertOnlyConnector(svgContainer,cx,cy);
	}else{
		//var numOfBits=parseInt($("#"+divid).attr("num_bits");
		//var ctl_enabled=parseInt($("#"+divid).attr("ctl_enabled");
		/*if(numOfBits>1){
			if(ctl_enabled==1){
				cy=0.25*divHeight;
				InsertOnlyConnector(svgContainer,cx,cy);
			}
		}*/
	}
	
}
	/*
	if(divid!="body"){
		var divWidth=$("#"+divid).width();
		var divHeight=$("#"+divid).height();
		var cx=divWidth/2;
		var cy=0;
		var numOfBits=parseInt($("#"+divid).attr("num_bits");
				
		var svgContainer = d3.select("#"+divid).append("svg")
								 .attr("width",divWidth)
								 .attr("height",divHeight)
								 .attr("id","svg-"+divid);
		if(initalize==1){
			//Draw the Circle
			var circle = svgContainer.append("circle")
							  .attr("cx",divWidth/2)
							  .attr("cy",divHeight/2)
							  .attr("r", gridConnectorRadius)
							  .attr("stroke","black")
							  .attr("stroke-width","1px"); 
		}else{
		if(numOfBits)==1){
			cy=divHeight/2;
		}else{
			if(numOfBits)==2){
				//CNOT equivalent
				cy=3*divHeight/2;
			}else{
				if(numOfBits)==3){
					//CCNOT equivalent
					cy=5*divHeight/2;
					
				}
			}
			
		}
		//Draw the Circle
		var circle = svgContainer.append("circle")
							  .attr("cx",cx)
							  .attr("cy",cy)
							  .attr("r", gridConnectorRadius)
							  .attr("stroke","black")
							  .attr("stroke-width","1px"); 
	}
	}
	*/
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
