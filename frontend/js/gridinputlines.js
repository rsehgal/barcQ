function AddInputLinesToGrid(){
console.log("AddInputLinesToGrid called........");
//var svgContainer = d3.select("#testSvg").append("svg")
var svgContainer = d3.select("#linesDiv").append("svg")
                                    .attr("width", 1000)
                                     .attr("height", 1000);
                                     //.attr("viewbox","0 0 500 500");

 
 
/* //Draw the line
//Starting idea which draw just one line
 var line = svgContainer.append("line")
                          .attr("x1", 60)
                          .attr("y1", 78)
                          .attr("x2", 400)
                          .attr("y2", 78)
                          .attr("stroke-width","2px")
                          .attr("stroke","black");

var line = svgContainer.append("line")
                          .attr("x1", 60)
                          .attr("y1", 108)
                          .attr("x2", 400)
                          .attr("y2", 108)
                          .attr("stroke-width","2px")
                          .attr("stroke","black");
*/

var dropzoneDivPos=$("#dropzoneDiv").position();

var rowList=$("#dropzonetable tr");
	var numOfRows=rowList.length;
	//console.log("Number of Rows : "+numOfRows);
	for(var rowIndex=0 ; rowIndex < numOfRows ; rowIndex++ ){
		//console.log("RowId : "+rowList[rowIndex].id);
		var rowid=rowList[rowIndex].id;
		var colList= $("#"+rowid+" td"); //$("#"+rowList[rowIndex]).children().prop("td");
		var numOfColumns=colList.length;

		var startColid=colList[0].id;
		var endColid=colList[numOfColumns-1].id;
		console.log("StartColId : "+startColid+" : EndColId : "+endColid);
		dividd=startColid+"div";
		console.log("DIVIDD : "+dividd);
		startingConnLocation=$("#"+dividd).children().children().attr("cx");

		console.log("StartConnLocation : "+startingConnLocation);
		//console.log("ColID : "+colid);
		//var divid=$("#"+colid).children().attr("id");

		var divwidth=$("#"+startColid).children().width();
		var divheight=$("#"+startColid).children().height();

		var startPos=$("#"+startColid).position();
		var endPos=$("#"+endColid).position();
		console.log("Start Pos : "+startPos.left+" : EndPos : "+endPos.left);
		var x1=startPos.left+dropzoneDivPos.left+divwidth/4;
		//var y1=startPos.top+dropzoneDivPos.top+divheight/4;
		var y1=(startPos.top+(2*rowIndex+1)*1.0*divheight/2);//dropzoneDivPos.top+divheight/4;
		//var x2=endPos.left+dropzoneDivPos.left+divwidth/4;
		var x2=x1+numOfColumns*divwidth;
		//var y2=endPos.top+dropzoneDivPos.top+divheight/4;
		var y2=y1

		//console.log(startPos);
		console.log("StartPos : "+x1+","+y1);
		
		console.log("EndPos : "+x2+","+y2);
		svgContainer.append("line").attr("x1", x1)
                          .attr("y1", y1)
                          .attr("x2", x2)
                          .attr("y2", y2)
                          .attr("stroke-width","2px")
                          .attr("stroke","#C8C8C8");


	}


/*var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.stroke();
*/
}
