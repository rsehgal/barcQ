function MergeCellsUserDefinedGate(){
	cellIdsArray=userDefinedControlGatesDivIds;
    var cellIdsLength2=cellIdsArray.length;
	if(cellIdsLength2>1){
        
        // console.log(cellIdsLength);
        // console.log("CellIdArray : "+cellIdsArray);

        var uniqueSorted=userDefinedControlGatesRowIds.UniqueAndSorted();
        var minRowId=uniqueSorted[0];
        var maxRowId=uniqueSorted[uniqueSorted.length-1];
        cellIdsLength=maxRowId-minRowId+1;
        console.log(cellIdsLength);
        console.log("CellIdArray : "+cellIdsArray);
        console.log("minRowId : "+minRowId+" : maxRowId : "+maxRowId);

		

        /*$('#'+cellIdsArray[minRowId]).parent().attr('rowspan',cellIdsLength);
        $('#'+cellIdsArray[minRowId]).css("background","transparent");
        var height=$('#'+cellIdsArray[minRowId]).height()
        $('#'+cellIdsArray[minRowId]).css("height",cellIdsLength*height);

        for(var index=1 ; index < cellIdsLength ; index++){
        		console.log("REMOVING : "+$("#"+cellIdsArray[uniqueSorted[index]]).parent().attr("id"));
                $('#'+cellIdsArray[uniqueSorted[index]]).parent().remove();
        }*/
        
        sortedCellIdsArray=GetSortedCellIdArray(minRowId,maxRowId);
        $('#'+sortedCellIdsArray[0]).parent().attr('rowspan',cellIdsLength);
        $('#'+sortedCellIdsArray[0]).css("background","transparent");
        var height=$('#'+sortedCellIdsArray[0]).height()
        $('#'+sortedCellIdsArray[0]).css("height",cellIdsLength*height);
        $('#'+sortedCellIdsArray[0]).children().remove();
        
        for(var index=1 ; index < cellIdsLength ; index++){
        		console.log("REMOVING : "+$("#"+sortedCellIdsArray[index]).parent().attr("id"));
                $('#'+sortedCellIdsArray[index]).parent().remove();
        }
        
        svg=d3.select("#"+sortedCellIdsArray[0]).append('svg')
        					.attr("width",$("#"+sortedCellIdsArray[0]).width())
        					.attr("height",$("#"+sortedCellIdsArray[0]).height())
							.classed("draggableComp",true);
		g = svg.append('g');

        $('#'+sortedCellIdsArray[0]).children().attr("height",cellIdsLength*singleDivHeight);
                
        userDefinedControlGatesComponent.push(tempDict);
        console.log("userDefinedControlGatesComponent : "+userDefinedControlGatesComponent);
        ModifyDict();
        
        var idOfUserDefinedGate="";
        var x1=0,y1=0,x2=0,y2=0;
        for(var index=0 ; index < cellIdsLength ; index++){
        	//if(userDefinedControlGatesComponent[index]!=""){
        	if(tempRaman[index]!=undefined){
        		var gateName=tempRaman[index];//userDefinedControlGatesComponent[index];
        		idOfUserDefinedGate+=gateName;
        		console.log(gateName);
        		var x = 0.5*singleDivWidth;
        		var y = (2*index+1)*(0.5*singleDivHeight);
        		if(index==0){
        			x1=x; y1=y;
        		}
        		if(index==(cellIdsLength-1)){
        			x2=x; y2=y;
        		}
        		if(gateName=="CONTROL"){
        			InsertControlSymbol(g,x,y);
        		}
        		if(gateName=="XOR" || gateName=="X"){
        			
        			InsertXorSymbol(g,x,y);
        		}
        		if(gateName=="RX" || gateName=="RY" || gateName=="RZ"){
					x = 0;
					y -= 0.5*singleDivHeight;
					InsertImageSymbol(g,gateName,x,y);
				}
        	}
        }
        
        dropableCounter++;
        idOfUserDefinedGate+=dropableCounter;
        svg.attr("id",idOfUserDefinedGate);
        svg.attr("num_bits",Object.keys(tempRaman).length);
        
        InsertLine(g,x1,y1,x2,y2);
         
    }
}

function ModifyDict(){//minRowId,maxRowId){
	tempRaman={}
	var dictKeys=Object.keys(tempDict);
	var dictLength=dictKeys.length;
	var uniqueSortedKeys=dictKeys.UniqueAndSorted();
	console.log("UniqueSorted Keys : "+uniqueSortedKeys);
	
	//var temp={};
	tempRaman[0]=tempDict[uniqueSortedKeys[0]];
	for(var index=1;index < dictLength ; index++){
		tempRaman[uniqueSortedKeys[index]-uniqueSortedKeys[0]]=tempDict[uniqueSortedKeys[index]];
	}
	console.log("TempRaman : "+tempRaman);
	
}

function RemakeUserDefinedControlGatesComponent(){
	
}

function GetSortedCellIdArray(minRowId,maxRowId){
	//userDefinedControlGateColumnId
	sortedCellIdsArray=[];
	for(var index=minRowId ; index <= maxRowId ; index++){
		var cellId="row"+index+"col"+userDefinedControlGateColumnId+"div";
		sortedCellIdsArray.push(cellId);
	}
	return sortedCellIdsArray;
	
}

function MergeCells(cellIdsString){
	var cellIdsArray=cellIdsString.split(" ");
        var cellIdsLength=cellIdsArray.length;
if(cellIdsLength>1){
        
        console.log(cellIdsLength);
        console.log("CellIdArray : "+cellIdsArray);

        $('#'+cellIdsArray[0]).attr('rowspan',cellIdsLength);
        $('#'+cellIdsArray[0]).children().css("background","transparent");
        var height=$('#'+cellIdsArray[0]).children().height()
        $('#'+cellIdsArray[0]).children().css("height",cellIdsLength*height);

        for(var index=1 ; index < cellIdsLength ; index++){
        		console.log("REMOVING : "+cellIdsArray[index]);
                $('#'+cellIdsArray[index]).remove();
        }
        
    }
}


function Merge(obj){
	console.log("From Merge Function : ID : "+obj.attr("id")+" : RowId : "+obj.attr("rowid")+" : ColumnId : "+obj.attr("columnid"));
	var num_bits=obj.attr("num_bits");

	//----------
	var rowid=obj.attr("rowid");
	var colid=obj.attr("columnid")
	Merge2(rowid,colid,num_bits);
	//----------
	/* Taking the below stuff to new function Merge2(), this 
	** design modification will help in loading the saved circuits from JSON
	*/
	/*var cellIdsString="";
	for(var index=0 ; index < num_bits ; index++){
		var rowid=obj.attr("rowid");
		var colid=obj.attr("columnid");
		if(index==0){
			cellIdsString+="row"+rowid+"col"+colid;
		}else{
			rowid=parseInt(rowid)+parseInt(index);
			cellIdsString+=" row"+rowid+"col"+colid;
		}
	}
	console.log(cellIdsString);
	MergeCells(cellIdsString);*/
}

function Merge2(rowid,colid,num_bits){
	rowid=parseInt(rowid);
	console.log("From Merge2 Function : RowID : "+rowid+" : ColID : "+colid+" : NumBits : "+num_bits);
	var cellIdsString="";
	for(var index=0 ; index < parseInt(num_bits) ; index++){
		if(index==0){
			cellIdsString+="row"+rowid+"col"+colid;
		}else{
			rowid+=1;//parseInt(index);
			cellIdsString+=" row"+rowid+"col"+colid;
		}
	}
	console.log("CellsID String : "+cellIdsString);
	MergeCells(cellIdsString);
}

function UnMergeCells(idToDelete){
	console.log("UnMergeCells : "+$("#"+idToDelete).parent().attr("rowid")
								 +" , "
								 +$("#"+idToDelete).parent().attr("columnid"));
    var rowspan=$("#"+idToDelete).parent().parent().attr("rowspan");
    console.log("************* ROWSPAN : "+rowspan+" ***************" );
	//InsertCell($("#"+idToDelete).parent().attr("rowid"),$("#"+idToDelete).parent().attr("columnid"));
	InsertCellOnDrag($("#"+idToDelete).parent().attr("rowid"), 
					 $("#"+idToDelete).parent().attr("columnid"),
					 $("#"+idToDelete).parent().parent().attr("rowspan"));

/*console.log("UnMergeCells : "+$("#"+$("#"+idToDelete).attr("parentid")).attr("rowid")
							 +" , "
							 +$("#"+$("#"+idToDelete).attr("parentid")).attr("columnid"));
*/}


function UnMergeCellsOnDrag(idToDrag){
	console.log("UnMergeCellsOnDrag: "+$("#"+idToDrag).attr("rowid")
								 +" , "
								 +$("#"+idToDrag).attr("columnid")
								 +" : RowSpan : "+$("#"+idToDrag).parent().attr("rowspan"));
	//InsertCell($("#"+idToDrag).parent().attr("rowid"),$("#"+idToDrag).parent().attr("columnid"));
	InsertCellOnDrag($("#"+idToDrag).attr("rowid"), 
					 $("#"+idToDrag).attr("columnid"),
					 $("#"+idToDrag).parent().attr("rowspan"));
}


/*
** Logic to insert a cell (on drag) containing a div in at particular row at particulur cell location
*/
function InsertCellOnDrag(rownum, colnum,rowspan){
	console.log("**************************************");
	$("#row"+rownum+"col"+colnum).attr("rowspan",1);
	$("#row"+rownum+"col"+colnum+"div").css("width",singleDivWidth);
	$("#row"+rownum+"col"+colnum+"div").css("height",singleDivHeight);
	console.log("Inserting connector for DivID : "+"#row"+rownum+"col"+colnum+"div");
	var divid="row"+rownum+"col"+colnum+"div";
	InsertConnector(divid);
	ResetDivWithId(divid,parseInt(rownum),colnum);

	for(var index=1; index < parseInt(rowspan) ; index++){
	var rowid="row"+(parseInt(rownum)+index);
	var row = document.getElementById(rowid);
  	var x = row.insertCell(colnum);
  	x.id=rowid+"col"+colnum;
  	$("#"+rowid+"col"+colnum).append($("<div />"));
  	var divid=rowid+"col"+colnum+"div";
  	console.log("Divid : "+divid);
  	$("#"+rowid+"col"+colnum).children().attr("id",divid);
  	ResetDivWithId(divid,parseInt(rownum)+1,colnum);
  	InsertConnector(divid);
  	console.log("Cell INserted.........");
  	AttachDroppableEvents();

  }
  console.log("**************************************");
}

/*
** Logic to insert a cell containing a div in at particular row at particulur cell location
*/
function InsertCell(rownum, colnum){
	$("#row"+rownum+"col"+colnum).attr("rowspan",1);
	$("#row"+rownum+"col"+colnum+"div").css("width",singleDivWidth);
	$("#row"+rownum+"col"+colnum+"div").css("height",singleDivHeight);
	console.log("Inserting connector for DivID : "+"#row"+rownum+"col"+colnum+"div");
	InsertConnector("row"+rownum+"col"+colnum+"div");

	var rowid="row"+(parseInt(rownum)+1);
	var row = document.getElementById(rowid);
  	var x = row.insertCell(colnum);
  	x.id=rowid+"col"+colnum;
  	$("#"+rowid+"col"+colnum).append($("<div />"));
  	var divid=rowid+"col"+colnum+"div";
  	console.log(divid);
  	$("#"+rowid+"col"+colnum).children().attr("id",divid);
  	ResetDivWithId(divid,parseInt(rownum)+1,colnum);
  	InsertConnector(divid);
  	console.log("Cell INserted.........");
  	AttachDroppableEvents();
}
