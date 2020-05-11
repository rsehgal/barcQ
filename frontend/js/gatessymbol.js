function gate(divid){
	if(divid=="CNOT"){
		return cnot(divid);
	}
	if(divid=="CCNOT"){
		return ccnot(divid);
	}
	if(divid=="XOR"){
		return xor(divid);
	}
	if(divid=="CONTROL"){
		return control(divid);
	}
	if(divid=="X" || divid=="RX" || divid=="RY" || divid=="RZ"){
		return x(divid);
	}

}

function CustomGate(divid){ //,rowspan){
	var width=$("#"+divid).width();//singleDivWidth;
	var height=$("#"+divid).height();//rowspan*singleDivHeight;
	$("#"+divid).css("width",width);
  	$("#"+divid).css("height",height);
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	//Now add the required symbols at respective location in the group
	
	
	return svg;
}

function x(divid){
	$("#"+divid).css("width","35px");
  	$("#"+divid).css("height","35px");
	var numOfBits=1;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	//var x=width/2;
	//var y=height/(2*numOfBits);
	//var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	InsertImageSymbol(g,divid);
	//var path="../../images/"+divid+".png";
	//g.append("image").attr("href",path)
							//.image("href","../images/X.png");
	return svg;
}

function InsertImageSymbol(g,gatename,x=0,y=0){
	var path="../../images/"+gatename+".png";
	g.append("image").attr("href",path)
					 .attr("x",x)
					 .attr("y",y);
}

function xor(divid,ctl_bits=[0,1]){
	$("#"+divid).css("width","35px");
  	$("#"+divid).css("height","35px");
	var numOfBits=1;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	var x=width/2;
	var y=height/(2*numOfBits);
	
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	InsertXorSymbol(g,x,y);
	/*g.append('circle').attr("r",xorrad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x-xorrad).attr("y1",y).attr("x2",x+xorrad).attr("y2",y)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x).attr("y1",y-xorrad).attr("x2",x).attr("y2",y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");*/

	return svg;
}

function InsertXorSymbol(g,x,y){
	g.append('circle').attr("r",xorrad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x-xorrad).attr("y1",y).attr("x2",x+xorrad).attr("y2",y)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x).attr("y1",y-xorrad).attr("x2",x).attr("y2",y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");	
}

function control(divid,ctl_bits=[0,1]){
	$("#"+divid).css("width","35px");
  	$("#"+divid).css("height","35px");
	var numOfBits=1;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	var x=width/2;
	var y=height/(2*numOfBits);
	var rad=6;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	InsertControlSymbol(g,x,y);
	
	/*g.append('circle').attr("r",rad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	*/

	return svg;
}

function InsertControlSymbol(g,x,y){
	g.append('circle').attr("r",controlrad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
}


function ccnot(divid,ctl_bits=[0,1]){
	$("#"+divid).css("width","35px");
  	$("#"+divid).css("height","105px");
	var numOfBits=3;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	var x=width/2;
	var y=5*height/(2*numOfBits);
	var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	InsertXorSymbol(g,x,y);
	/*
	g.append('circle').attr("r",xorrad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x-xorrad).attr("y1",y).attr("x2",x+xorrad).attr("y2",y)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x).attr("y1",y-xorrad).attr("x2",x).attr("y2",y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	*/
	
	//First control
	y=3*height/(2*numOfBits);
	InsertControlSymbol(g,x,y);
	/*
	g.append('circle').attr("r",6).attr("cx",x).attr("cy",y).attr("fill","red")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	 */
	//Second control
	y=height/(2*numOfBits);
	/*g.append('circle').attr("r",6).attr("cx",x).attr("cy",y).attr("fill","red")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	*/
	InsertControlSymbol(g,x,y);

	g.append('line').attr("x1",x).attr("y1",y).attr("x2",x).attr("y2",5*y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");

	return svg;
}

function cnot(divid,ctl_bits=[0]){
	console.log("INside CNOT symbol........");
	$("#"+divid).css("width",35.0);
  	$("#"+divid).css("height",70.0);
	numOfBits=2;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	console.log("width : "+width+" : height : "+height);
	var x=width/2;
	//var y=(2*numOfBits-1)*height/(2*numOfBits);
	var y= parseFloat((2*numOfBits-1))/(2*numOfBits)*height;
	console.log("X : "+x+" :: Y : "+y);
	var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height);
											// .style("left",0)
											// .style("top",0);
											/*.classed("cloneAble",true)
											.attr("id","CNOT")
											.attr("num_bits",2)
											.attr("ctl_enabled",1)
											.attr("ctl_bits",[2])
											.attr("tgt_bits",[3])
											.attr("arg_enabled",0)
											.attr("arg_value",0)
											.attr("rowid",2)
											.attr("columnid",3);*/


	//"num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [2], "tgt_bits" : [3], 
	//"arg_enabled" : 0, "arg_value" : 0, "rowid" : 2, "columnid" : 3

	g = svg.append('g');
	InsertXorSymbol(g,x,y);
	/*g.append('circle').attr("r",xorrad).attr("cx",x).attr("cy",y).attr("fill","green")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x-xorrad).attr("y1",y).attr("x2",x+xorrad).attr("y2",y)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x).attr("y1",y-xorrad).attr("x2",x).attr("y2",y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	 */

	//First control
	y=parseFloat(height*1.0/(2*numOfBits));
	InsertControlSymbol(g,x,y);
	/*g.append('circle').attr("r",6).attr("cx",x).attr("cy",y).attr("fill","red")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
	 */
	/*//Second control
	y=height/(2*numOfBits);
	g.append('circle').attr("r",6).attr("cx",x).attr("cy",y).attr("fill","red")
	    .attr("stroke-width","2px")
	    .attr("stroke","red");
*/

	g.append('line').attr("x1",x).attr("y1",y).attr("x2",x).attr("y2",3*y+xorrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");

	return svg;
}
