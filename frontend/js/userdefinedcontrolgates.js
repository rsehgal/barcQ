function ControlGateInitialization(){
	userDefinedControlGatesDivIds=[];

	$("#display").click(function(){
		DisplayDivIds();
	});
	$(".dropzone").click(function(){
		if(userControlGateFlag){
			$(this).css("background","yellow");
			userDefinedControlGatesDivIds.push($(this).attr("id"));
			var rowid=$(this).attr("rowid");
			var colid=$(this).attr("columnid");
			var gate=$(this).attr("gate");
			console.log("RowID : "+rowid + " ColumnID"+colid);
			if(gate.length!=0){
				tempGateLocInfo.push({"row":rowid,"col":colid,"gate":gate});
			}
		}
	});
}

function StoreDivIds(){
	console.log("StoreDivIds called, now reinitializing all global variables used for creating user defined gatges.........");
	userControlGateFlag=1;
	for(var index=0;index<userDefinedControlGatesDivIds.length;index++){
		$("#"+userDefinedControlGatesDivIds[index]).css("background","transparent");
	}
	userDefinedControlGatesDivIds=[];
	//userDefinedControlGatesComponent=[];
	//userDefinedControlGatesRowIds=[];
	//userDefinedControlGateColumnId=0;
	//userDefinedControlGateColumnIds=[];
	//tempDict={};
	//tempRaman={};
	tempGateLocInfo=[];
	
}

function DisplayDivIds(){
	console.log(userDefinedControlGatesDivIds);
	userControlGateFlag=0;
	console.log("User Control gate flag : "+userControlGateFlag);
	//userDefinedControlGatesDivIds=[];

	/*divIds="";
	for(var index=0 ; index < userDefinedControlGatesDivIds.length ; index++){
		if(index==0){
			divIds+=userDefinedControlGatesDivIds[index];
		}else{
			divIds+=" "+userDefinedControlGatesDivIds[index];
		}
	}
	Merge(divIds);*/
	MergeCellsUserDefinedGate();
	AttachDraggableEvents();
	GenerateCode();


}

