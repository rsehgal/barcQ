/*
** Function to load JSON and populate the frontend with respective circuit
*/
function LoadJson(){
	
	var mydataExtended = JSON.parse(gateJson);
	var gatesdata = mydataExtended.instructions;
	//console.log(gatesdata);
	var numOfGates=gatesdata.length;
	for(var gateIndex=0; gateIndex<parseInt(numOfGates); gateIndex++){
		var gateName = gatesdata[gateIndex].name;
		var rowid=gatesdata[gateIndex].rowid;
		var colid=gatesdata[gateIndex].columnid;
		var parent="row"+rowid+"col"+colid+"div";
		CloneIt(gateName,parent);
		rowIds.push(rowid);
        colIds.push(colid);
        ModifyParentDiv($("#"+parent));
	}
}

/*
** Function to get the location of div for specified rownum and colnum of the table
*/
function GetDivLocation(rownum,colnum){

}

