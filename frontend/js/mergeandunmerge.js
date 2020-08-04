var minimumRowId=0;
var maximumRowId=0;

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
        
        var overallDivHeight=$("#"+sortedCellIdsArray[0]).height();
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



                    /*
                    var rectwidth=singleDivWidth;
                    var rectheight=overallDivHeight;
                    //var recty=(rectheight/2)-(singleDivHeight/2);
                    var imgY=(rectheight/2)-(singleDivHeight/2);
                    InsertRectangle(g,rectwidth,rectheight,0,0);
                    InsertImageSymbol(g,gateName,0,imgY);
                    */
					
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

function GetCellsIdsString(cellTobeMerged){
	console.log("CellsTobeMerged : "+cellTobeMerged);
    var cellIdsString="";
    /*for(var index=0 ; index < cellTobeMerged.length ; index++){
        if(index==0){
            cellIdsString+="row"+cellTobeMerged[index]+"col"+colIdOfGenericControlledUnitaryGate;
        }else{
            cellIdsString+=" row"+cellTobeMerged[index]+"col"+colIdOfGenericControlledUnitaryGate;
        }
    }*/
    var counter=0;
    for(var index=cellTobeMerged[0] ; index <= cellTobeMerged[cellTobeMerged.length-1] ; index++){
        if(counter==0){
            cellIdsString+="row"+index+"col"+colIdOfGenericControlledUnitaryGate;
        }else{
            cellIdsString+=" row"+index+"col"+colIdOfGenericControlledUnitaryGate;
        }
        counter++;
    }
    console.log("CellsID String : "+cellIdsString);
    return cellIdsString;
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

/*
 * Code for triggering phase popup
 */
function AttachPhasePopup(obj){
	//gateObj=obj;
	obj.on("contextmenu", function(event) {
		gateObj=$(this);
		event.preventDefault();
		$('#phasePopup').show();
	});
}

/* 
 * PhasePopup attached on middle button
 */
function AttachPhasePopupMiddleButton(obj){
        obj.on('mousedown',function(event){
                if(event.which == 2){

                        if(obj.attr("arg_enabled")==1){
				gateObj=$(this);
                		$('#phasePopup').show();
                        }

                }
        });
}


/**
 * Code for Generic controlled Unitary gates
 * 
 **/

function AttachGenericControlPopup(obj){
	gateObj=obj;
	obj.on("contextmenu", function(event) {
        //if(obj.attr("gate")=="CNOT")
        targetUnitaryGate=obj.attr("targetGatename");
        targetUnitaryGateType=obj.attr("targetGateType");
		//handle right click
		//alert("Right clicked from Attach Generic .........");
		//stop showing browser menu
		event.preventDefault();
		//$('.hover_bkgr_fricc').show();
		$('#gatePopup').show();
        //alert(targetUnitaryGate);
		if(targetUnitaryGate=="ONLYSWAP"){
			$('#ctl_label').hide();
			$('#ctl_bits_field').hide();
		}else{
            $('#ctl_label').show();
            $('#ctl_bits_field').show();
        }
		colIdOfGenericControlledUnitaryGate = parseInt(obj.parent().attr("columnid"));
	    //alert(columnId);
	});

			/*
			$('.hover_bkgr_fricc').click(function(){
                //  $('.hover_bkgr_fricc').hide();
            });
            $('.popupCloseButton').click(function(){
                    $('.hover_bkgr_fricc').hide();
            });
            $('.popupSetButton').click(function(){
                //Set the required variable and hide
                ctl_bits_array=$("#ctl_bits_field").val().split(",");
                unitaryControlRowIds=ctl_bits_array;
                //alert("Length of ctl array : "+ctl_bits_array.length )
                tgt_bits_array=$("#tgt_bits_field").val().split(",");
                unitaryTargetRowIds=tgt_bits_array;
                //alert("Length of tgt array : "+tgt_bits_array.length )
                //alert("Num_bits : "+(ctl_bits_array.length+tgt_bits_array.length))
                $('.hover_bkgr_fricc').hide();
                //UpdateGenericControlGate(obj);
                UpdateGenericControlGate();
            });
            */

}

function UpdateGenericControlGate(){
var obj=gateObj;
//alert(obj.attr("ctl_bits").split(",").length+" , "+unitaryControlRowIds.length);
if(obj.attr("ctl_bits").split(",").length != unitaryControlRowIds.length ){
            alert("Wrong conf. for "+obj.attr("gate")+" gate..... please correct it to continue...")
            return;
}

    //Removing the existing gate
    //obj.parent().remove();
    UnMergeCells(obj.attr("id"));
    obj.remove();
    //	var columnId = parseInt(obj.parent().attr("columnid"));
    //alert(unitaryControlRowIds);
    //alert(unitaryTargetRowIds);
	//alert(colIdOfGenericControlledUnitaryGate);
	var cellIdsString = "";
	console.log("Length of unitaryControlRowIds : "+unitaryControlRowIds);
	
	if(targetUnitaryGate=="ONLYSWAP")
		cellIdsString = unitaryTargetRowIds.UniqueAndSorted();
	else
		cellIdsString = (unitaryControlRowIds.concat(unitaryTargetRowIds)).UniqueAndSorted();
		
    minimumRowId=cellIdsString[0];
    maximumRowId=cellIdsString[cellIdsString.length-1];
    offSetRowId = cellIdsString[0];
    //alert(cellIdsString);

    MergeCellsUnitary(GetCellsIdsString(cellIdsString));



}

function MergeCellsUnitary(cellIdsString){
    var cellIdsArray=cellIdsString.split(" ");
    var cellIdsLength=cellIdsArray.length;
    console.log("cellIdsLength : "+cellIdsLength);
    if(cellIdsLength>1){

        console.log(cellIdsLength);
        console.log("CellIdArray : "+cellIdsArray);

        $('#'+cellIdsArray[0]).attr('rowspan',cellIdsLength);
        $('#'+cellIdsArray[0]).children().css("background","transparent");
        var height=singleDivHeight;//$('#'+cellIdsArray[0]).children().height();
        console.log("AYUSH : Span : "+cellIdsLength+" : height : "+height+" : Child Id : "+$('#'+cellIdsArray[0]).children().attr("id"));
        $('#'+cellIdsArray[0]).children().css("height",cellIdsLength*height);
        var divid=$('#'+cellIdsArray[0]).children().attr("id");

        for(var index=1 ; index < cellIdsLength ; index++){
                console.log("REMOVING : "+cellIdsArray[index]);
                $('#'+cellIdsArray[index]).remove();
        }
        CreateControlledUnitaryGate(divid);
        AttachDroppableEvents();
    }
}


function CreateControlledUnitaryGate(divid){
    $("#"+divid).children().remove();
    console.log("Div Height from CreateControlledUnitaryGate : "+$("#"+divid).attr("height"));
    svg=d3.select("#"+divid).append('svg')
                            .attr("width",$("#"+divid).width())
                            .attr("height",$("#"+divid).height())
                            .classed("draggableComp",true);

    var divwidth=$("#"+divid).width();//attr("width");
    x=0.5*divwidth;
    g = svg.append('g');

    //Inserting line
    var divheight=$("#"+divid).height();
    var rspan=$("#"+divid).parent().attr("rowspan");
    y1=minimumRowId-offSetRowId;
    y1=(2*y1+1)*divheight/(2*rspan);
    y2=maximumRowId-offSetRowId;
    y2=(2*y2+1)*divheight/(2*rspan);

    InsertLine(g, x, y1, x, y2);

    if(targetUnitaryGate=="ONLYSWAP"){
        unitaryControlRowIds=gateObj.attr("ctl_bits");
        console.log(unitaryControlRowIds);
        //alert(unitaryControlRowIds);
    }
    else{

        for(var index=0 ; index < unitaryControlRowIds.length ; index++){
            y=unitaryControlRowIds[index]-offSetRowId;
            //var divheight=$("#"+divid).attr("height");
             var divheight=$("#"+divid).height();
            var rspan=$("#"+divid).parent().attr("rowspan");
            y=(2*y+1)*divheight/(2*rspan);
            InsertControlSymbol(g,x,y);
        }
    }

        //if(targetUnitaryGate=="QFT"){
            if(targetUnitaryGateType=="Algo"){
                var sortedTargetRowIds=unitaryTargetRowIds.UniqueAndSorted();
        
                var qftNumOfBits=sortedTargetRowIds[sortedTargetRowIds.length-1]-sortedTargetRowIds[0]+1;
                var rectwidth=singleDivWidth;
                var rectheight=singleDivHeight*qftNumOfBits
                var recty=(sortedTargetRowIds[0]-unitaryControlRowIds[0])*singleDivHeight;
                var imgY=(rectheight/2)-(singleDivHeight/2);
                //var recty=(rectheight/2)-(singleDivHeight/2);
                /*if(recty > 0)
                    InsertRectangle(g,rectwidth,rectheight,0,recty);
                else
                    InsertRectangle(g,rectwidth,rectheight,0,0);*/
                if(recty < 0)
                    recty=0;

                InsertRectangle(g,rectwidth,rectheight,0,recty);
                //InsertImageSymbol(g,targetUnitaryGate,0,recty+singleDivHeight/2);
                InsertImageSymbol(g,targetUnitaryGate,0,recty+imgY);
                //var xs=0;
                //y-=0.5*singleDivHeight;
                //InsertImageSymbol(g,targetUnitaryGate,xs,y);
        }
        else{
    	for(var index=0 ; index < unitaryTargetRowIds.length ; index++){
    		y=unitaryTargetRowIds[index]-offSetRowId;
    		y=(2*y+1)*divheight/(2*rspan);
    		if(targetUnitaryGate=="X" || targetUnitaryGate=="NOT")
    			InsertXorSymbol(g,x,y);
    		else{
    			if(targetUnitaryGate=="ONLYSWAP" || targetUnitaryGate=="SWAP"){
    				InsertCrossSymbol(g,x,y);
    			}
    			else{
                        var xs=0;
                        y-=0.5*singleDivHeight;
                        InsertImageSymbol(g,targetUnitaryGate,xs,y);
                        /*if(targetUnitaryGate=="QFT"){
                            var xs=0;
                            y-=0.5*singleDivHeight;
                            InsertImageSymbol(g,targetUnitaryGate,xs,y);
                        }
                        else{
    				        var xs=0;
    				        y-=0.5*singleDivHeight;
    				        InsertImageSymbol(g,targetUnitaryGate,xs,y);
                            }*/
    			}
    		}
    	}
    }
    
    /*
     * Setting various gate attributes
     */ 
    var newgateId=gateObj.attr("id");
    svg.attr("id",newgateId); 
    svg.attr("gate",gateObj.attr("gate"));
    svg.attr("num_bits",gateObj.attr("num_bits"));
    svg.attr("ctl_enabled",gateObj.attr("ctl_enabled"));
    svg.attr("ctl_bits",unitaryControlRowIds);
    svg.attr("tgt_bits",unitaryTargetRowIds);
    svg.attr("arg_enabled",gateObj.attr("arg_enabled"));
    svg.attr("arg_value",gateObj.attr("arg_value"));
    //svg.attr("rowid",gateObj.parent().attr("rowid"));
    svg.attr("rowid",minimumRowId);
    svg.attr("columnid",gateObj.attr("columnid"));
    svg.attr("targetGatename",gateObj.attr("targetGatename"));
    svg.attr("user_defined","Y");
    svg.attr("row_merged",maximumRowId-minimumRowId+1)
    

    //var colid = parseInt(svg.attr("columnid"))
    var colid = colIdOfGenericControlledUnitaryGate;
    //alert(colid);
    colIds.push(colid);
    var rowid = parseInt(svg.attr("rowid"));
    rowIds.push(rowid);

    AttachSelectAndDelete_v2($("#"+newgateId));
    MakeDraggable($("#"+newgateId));
    AttachGenericControlPopup($("#"+newgateId));
    AttachPhasePopupMiddleButton($("#"+newgateId));

    console.log("@@@@@@ Going to call Modify Parent div............");
    ModifyParentDiv($("#"+newgateId).parent());
    GenerateCode();

    /*//Inserting line
    y1=minimumRowId-offSetRowId;
    y1=(2*y1+1)*divheight/(2*rspan);
    y2=maximumRowId-offSetRowId;
    y2=(2*y2+1)*divheight/(2*rspan);

    InsertLine(g, x, y1, x, y2);*/


}

/*
function CreateControlledUnitaryGate(divid){
    $("#"+divid).children().remove();
    console.log("Div Height from CreateControlledUnitaryGate : "+$("#"+divid).attr("height"));
    svg=d3.select("#"+divid).append('svg')
                            .attr("width",$("#"+divid).width())
                            .attr("height",$("#"+divid).height())
                            .classed("draggableComp",true);
    
    var divwidth=$("#"+divid).width();//attr("width");
    x=0.5*divwidth;
    g = svg.append('g');
    
    //var divheight=$("#"+divid).height();
    var rspan=$("#"+divid).parent().attr("rowspan");
    //Inserting line
    y1=minimumRowId-offSetRowId;
    y1=(2*y1+1)*singleDivHeight/(2*rspan);
    y2=maximumRowId-offSetRowId;
    y2=(2*y2+1)*singleDivHeight/(2*rspan);

    InsertLine(g, x, y1, x, y2);
    
    for(var index=0 ; index < unitaryControlRowIds.length ; index++){
        y=unitaryControlRowIds[index]-offSetRowId;
        //var divheight=$("#"+divid).attr("height");
        
        y=(2*y+1)*singleDivHeight/(2*rspan);
        InsertControlSymbol(g,x,y);
    }
    
    y=unitaryTargetRowIds[0]-offSetRowId;
    y=(2*y+1)*singleDivHeight/(2*rspan);
    if(targetUnitaryGate=="X")
        InsertXorSymbol(g,x,y);

    


}
*/
