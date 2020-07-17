function gate(divid){
	if(divid=="CNOT"){
		return cnot(divid);
	}
	if(divid=="SWAP"){
		return swap(divid);
	}
	if(divid=="CSWAP"){
		return cswap(divid);
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
	if(divid=="U" || divid=="X" || divid=="Y" || divid=="Z" || divid=="H"|| divid=="RX" || divid=="RY" || divid=="RZ" || divid=="PHASEGATE" || divid=="GLOBALPHASE" || divid=="QFT" || divid=="IQFT" || divid=="ADDA" || divid=="IADD"){
		return x(divid);
	}
	if(divid=="CRX" || divid=="CRY" || divid=="CRZ" || divid=="CPHASE" || divid=="CU" ){
		console.log("DIVID substring : "+divid);
		return cx(divid);
	}

}

function cswap(divid){
	return swap(divid,1);
}

function swap(divid,ctl_enabled=0,ctl_bits=[0],tgt_bits=[1,2]){
	console.log("INside SWAP symbol........");
	var numOfBits=2;
	if(ctl_enabled==1){
		$("#"+divid).css("height",105.0);
		numOfBits=3;	
	}else{
		$("#"+divid).css("height",70.0);
	}
	$("#"+divid).css("width",35.0);
  	
	
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	console.log("width : "+width+" : height : "+height);
	var x=width/2;
	//var y=(2*numOfBits-1)*height/(2*numOfBits);
	var y= parseFloat((2*numOfBits-1))/(2*numOfBits)*height;
	console.log("X : "+x+" :: Y : "+y);
	var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height);
	
	g = svg.append('g');
	InsertCrossSymbol(g,x,y);
	//First control
	y=parseFloat(height*(2*(numOfBits-1)-1)/(2*numOfBits));
	InsertCrossSymbol(g,x,y);

	if(numOfBits==3){
	y=parseFloat(height*1.0/(2*numOfBits));
	InsertControlSymbol(g,x,y);
	}
	g.append('line').attr("x1",x).attr("y1",y).attr("x2",x).attr("y2",(2*numOfBits-1)*y)
	.attr("stroke-width","2px")
	    .attr("stroke","red");

	return svg;	
}

function InsertCrossSymbol(g,x,y){
	g.append('line').attr("x1",x-controlrad).attr("y1",y-controlrad).attr("x2",x+controlrad).attr("y2",y+controlrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");
	g.append('line').attr("x1",x-controlrad).attr("y1",y+controlrad).attr("x2",x+controlrad).attr("y2",y-controlrad)
	.attr("stroke-width","2px")
	    .attr("stroke","red");	

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

/*function x(divid,ctl_enabled=0){
	$("#"+divid).css("width","35px");
	if(ctl_enabled==1){
  		$("#"+divid).css("height","70px");
  	}else{
  		$("#"+divid).css("height","35px");
  	}
	var numOfBits=1;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	//var x=width/2;
	//var y=height/(2*numOfBits);
	//var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	x=0.5*width;
	y1=1.5*height;
	g = svg.append('g');
	InsertImageSymbol(g,divid,x,y1);
	
	//var path="../../images/"+divid+".png";
	//g.append("image").attr("href",path)
							//.image("href","../images/X.png");
    y2 = 0.5*height;
    InsertControlSymbol(g,x,y2);

    InsertLine(g,x,y1,x,y2);
	return svg;
}
*/

function cx(divid,ctl_enabled=0){
	$("#"+divid).css("width","35px");
	$("#"+divid).css("height","70px");
	var numOfBits=2;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	
	//var x=width/2;
	//var y=height/(2*numOfBits);
	//var xorrad=10;
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	xval=0.0;
    var y1=0,y2=0;
	y1=0.5*height;
	
	g = svg.append('g');
	if(divid=="CRX"){
		InsertImageSymbol(g,"RX",xval,y1);
	}
	if(divid=="CRY"){
		InsertImageSymbol(g,"RY",xval,y1);
	}
	if(divid=="CRZ"){
		InsertImageSymbol(g,"RZ",xval,y1);
	}
	if(divid=="CPHASE"){
		InsertImageSymbol(g,"PHASEGATE",xval,y1);
	}
	if(divid=="CU"){
		InsertImageSymbol(g,"U",xval,y1);
	}
	
	y2 = 0.25*height;
	xval=0.5*width;
	InsertControlSymbol(g,xval,y2);
   	InsertLine(g,xval,y1,xval,y2);
    
	return svg;
}

function x(divid,ctl_enabled=0){
	$("#"+divid).css("width","35px");
  	$("#"+divid).css("height","35px");
  	
	var numOfBits=1;
	var width=$("#"+divid).width();
	var height=$("#"+divid).height();
	svg=d3.select("#"+divid).append('svg').attr("width",width).attr("height",height)
							.classed("draggableComp",true);
	g = svg.append('g');
	InsertImageSymbol(g,divid);
	
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
	console.log("Trying to insert XOR symbol in the provided group object with X, Y"+x+","+y);
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

function InsertLine(g,x1,y1,x2,y2){
	g.append('line').attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
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
