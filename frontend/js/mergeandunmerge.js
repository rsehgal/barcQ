function MergeCells(cellIdsString){
        var cellIdsArray=cellIdsString.split(" ");
        var cellIdsLength=cellIdsArray.length;
        console.log(cellIdsLength);
        $('#'+cellIdsArray[0]).attr('rowspan',cellIdsLength);
        $('#'+cellIdsArray[0]).children().css("background","white");
        for(var index=1 ; index < cellIdsLength ; index++){
                $('#'+cellIdsArray[index]).remove();
        }
}

function Merge(obj){
	console.log("RowId : "+obj.attr("rowid")+" : ColumnId : "+obj.attr("columnid"));
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
	var cellIdsString="";
	for(var index=0 ; index < num_bits ; index++){
		if(index==0){
			cellIdsString+="row"+rowid+"col"+colid;
		}else{
			rowid=parseInt(rowid)+parseInt(index);
			cellIdsString+=" row"+rowid+"col"+colid;
		}
	}
	console.log(cellIdsString);
	MergeCells(cellIdsString);
}

function UnMergeCells(idToDelete){
	console.log("UnMergeCells : "+$("#"+idToDelete).parent().attr("rowid")
								 +" , "
								 +$("#"+idToDelete).parent().attr("columnid"));
	InsertCell($("#"+idToDelete).parent().attr("rowid"),$("#"+idToDelete).parent().attr("columnid"));

/*console.log("UnMergeCells : "+$("#"+$("#"+idToDelete).attr("parentid")).attr("rowid")
							 +" , "
							 +$("#"+$("#"+idToDelete).attr("parentid")).attr("columnid"));
*/}

/*
** Logic to insert a cell containing a div in at particular row at particulur cell location
*/
function InsertCell(rownum, colnum){
	$("#row"+rownum+"col"+colnum).attr("rowspan",1);
	var rowid="row"+(parseInt(rownum)+1);
	var row = document.getElementById(rowid);
  	var x = row.insertCell(colnum);
  	x.id=rowid+"col"+colnum;
  	$("#"+rowid+"col"+colnum).append($("<div />"));
  	var divid=rowid+"col"+colnum+"div";
  	console.log(divid);
  	$("#"+rowid+"col"+colnum).children().attr("id",divid);
  	ResetDivWithId(divid,parseInt(rownum)+1,colnum);
  	console.log("Cell INserted.........");
  	AttachDroppableEvents();
}