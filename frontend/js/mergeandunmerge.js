function MergeCellsUserDefinedGate(){
	cellIdsArray=userDefinedControlGatesDivIds;
    var cellIdsLength2=cellIdsArray.length;
	if(cellIdsLength2>1){
        
        // console.log(cellIdsLength);
        // console.log("CellIdArray : "+cellIdsArray);
		var ctlbits = [];
        var tgtbits = [];
        var gateFormedArray = [];
        console.log(tempGateLocInfo.length);

		//check whether all gate has been dropped to same columns or not
		/*userDefinedControlGateColumnId=userDefinedControlGateColumnIds[0];
		for (i=1;i<userDefinedControlGateColumnIds.length;i++){
			if(userDefinedControlGateColumnId!=userDefinedControlGateColumnIds[i]){
				alert("Kindly drop the gates to the same column and again repeat gate creation process");
				return;
			}
		}*/
		//sort based on  row
        sortedRowGateInfo = tempGateLocInfo.sort(function (a, b) {
            return a.row.localeCompare(b.row);
        });
        //remove duplicates
        jsonObject = sortedRowGateInfo.map(JSON.stringify);
        uniqueSet = new Set(jsonObject);
        uniqueRowGateInfo = Array.from(uniqueSet).map(JSON.parse);
		//********************* Check for same column and whether that gate exist
        //get the column id for gate formation since all gate is required to be in same columns
        var userDefinedControlGateColumnId = uniqueRowGateInfo[0].col;
        var uniqueGateLen = uniqueRowGateInfo.length;
        for (var index = 0; index < uniqueGateLen; index++) {
            var gateInfo = uniqueRowGateInfo[index];
            var gateName = gateInfo.gate;
            var rowLoc = gateInfo.row;
            var colLoc = gateInfo.col;
            if (userDefinedControlGateColumnId != colLoc) {
                alert("Kindly drop the gates to the same column and again repeat gate creation process");
                return;
            }


            //var nameindex = index + 1;
            if (gateName === "CONTROL") {
                ctlbits.push(rowLoc);

            } else {
                tgtbits.push(rowLoc);
                if (gateName === "X" || gateName === "XOR")
                    gateName = "NOT";
            }
            //gateFormedBy+=gateName;
            gateFormedArray[index] = gateName;
        }
        console.log(gateFormedArray + "gateFormedArray");
        //check thet name exist in allowable userdefinedjson gate file
        var gateData = checkUserDefinedGate(gateFormedArray);
        if (gateData === undefined) {
            alert("This gate is not allowed");
            return;
        }
		//********************* Check for same column and whether that gate exist ends here

       // var uniqueSorted=userDefinedControlGatesRowIds.UniqueAndSorted();
       var minRowId = uniqueRowGateInfo[0].row;
        var maxRowId = uniqueRowGateInfo[uniqueGateLen - 1].row;
        cellIdsLength=maxRowId-minRowId+1;
        console.log(cellIdsLength);
        console.log("CellIdArray : "+cellIdsArray);
        console.log("minRowId : "+minRowId+" : maxRowId : "+maxRowId);


        
        sortedCellIdsArray=GetSortedCellIdArray(minRowId,maxRowId,userDefinedControlGateColumnId);
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
                
       // userDefinedControlGatesComponent.push(tempDict);
        //console.log("userDefinedControlGatesComponent : "+userDefinedControlGatesComponent);
        //ModifyDict();
        row = uniqueRowGateInfo[0].row;
        
        var x1=0,y1=0,x2=0,y2=0;
        for(var index=0 ; index < uniqueGateLen ; index++){
        	//if(userDefinedControlGatesComponent[index]!=""){
			var gateName = uniqueRowGateInfo[index].gate;
            var rowInfo = uniqueRowGateInfo[index].row;
            console.log(gateName);
        	//if(tempRaman[index]!=undefined){
        		var gateName=uniqueRowGateInfo[index].gate;//userDefinedControlGatesComponent[index];
        		 var rowInfo = uniqueRowGateInfo[index].row;
        		console.log(gateName);
        		var x = 0.5*singleDivWidth;
        		 var y = (2 * (rowInfo - row) + 1) * (0.5 * singleDivHeight);
        		if(index==0){
        			x1=x; 
                    if(gateName=="Y" || gateName=="Z" || gateName=="RX" || gateName=="RY" || gateName=="RZ")
                        y1=y+(0.5 * singleDivHeight);
                    else
                        y1=y;
        		}
        		if(index==(uniqueGateLen-1)){
        			x2=x; 
                    if(gateName=="Y" || gateName=="Z" || gateName=="RX" || gateName=="RY" || gateName=="RZ")
                        y2=y-(0.5 * singleDivHeight);
                    else
                        y2=y;    
                    
        		}
	
				switch(gateName){
					case "CONTROL":InsertControlSymbol(g,x,y);break;
					case "XOR": ;
					case "X": InsertXorSymbol(g,x,y); break;
					default: x = 0;
					y -= 0.5*singleDivHeight;
					InsertImageSymbol(g,gateName,x,y);break;
					
				}	
        
        }
        
        dropableCounter++;
        console.log("=======================");
        console.log(gateData);
        console.log("=======================");
        var idOfUserDefinedGate = gateData.name + dropableCounter;
        // userDefinedGateName += dropableCounter;
        svg.attr("id", idOfUserDefinedGate);
        svg.attr("num_bits", gateData.num_bits);
		svg.attr("gate", gateData.name);
		svg.attr("ctl_bits", ctlbits);
		svg.attr("tgt_bits",tgtbits);
		svg.attr("ctl_enabled", gateData.ctl_enabled);
		svg.attr("user_defined", "Y");
		svg.attr("row_merged",cellIdsLength );
        svg.attr("arg_enabled",gateData.arg_enabled );
        svg.attr("arg_value",gateData.arg_value );
        var divparent = $("#" + idOfUserDefinedGate).parent();
        Attach($("#" + idOfUserDefinedGate));
        divparent.attr("name", gateData.name);
        divparent.attr("gate", gateData.name);
        divparent.attr("num_bits", gateData.num_bits);
        divparent.attr("ctl_enabled", gateData.ctl_enabled);
        divparent.attr("ctl_bits", ctlbits);
        divparent.attr("tgt_bits", tgtbits);
        divparent.attr("arg_enabled",gateData.arg_enabled );
        divparent.attr("arg_value",gateData.arg_value );
		//divparent.attr("user_defined", "Y");
		//divparent.attr("row_merged",cellIdsLength );
        InsertLine(g, x1, y1, x2, y2);
        AttachSelectAndDelete_v2($("#"+idOfUserDefinedGate));
        MakeDraggable($("#"+idOfUserDefinedGate));
         
    }
}
function checkUserDefinedGate(gateFormedBy) {

    var userGateData = JSON.parse(userGateJson);
    var gateData = userGateData.instructions;
    var numOfRows = gateData.length;
    var index;
    //sorted=gateFormedBy.sort();
    //alert(gateFormedBy);
    for (index = 0; index < parseInt(numOfRows); index++) {
        var gateFormationInfo = gateData[index].gate_formedby;
        // the gate can be formed in reverse order alos means either control and then not or first not and then control
        var reverse = gateFormationInfo.map((e, i, a) => a[(a.length - 1) - i]);

        if (JSON.stringify(gateFormedBy) === JSON.stringify(gateFormationInfo) || JSON.stringify(gateFormedBy) === JSON.stringify(reverse)) {
            break;
        }
    }
    if (index === numOfRows) {
        return undefined;
    }
    return gateData[index];
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

function GetSortedCellIdArray(minRowId,maxRowId,userDefinedControlGateColumnId){
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


function Merge(obj,cellTobeMerged){
	console.log("From Merge Function : ID : "+obj.attr("id")+" : RowId : "+obj.attr("rowid")+" : ColumnId : "+obj.attr("columnid"));
	//var num_bits=obj.attr("num_bits");

	//----------
	var rowid=obj.attr("rowid");
	var colid=obj.attr("columnid")
	Merge2(rowid,colid,cellTobeMerged);
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

function Merge2(rowid,colid,cellTobeMerged){
	rowid=parseInt(rowid);
	console.log("From Merge2 Function : RowID : "+rowid+" : ColID : "+colid+" : cellTobeMerged : "+cellTobeMerged);
	var cellIdsString="";
	for(var index=0 ; index < parseInt(cellTobeMerged) ; index++){
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
  	ResetDivWithId(divid,parseInt(rownum)+index,colnum);
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
