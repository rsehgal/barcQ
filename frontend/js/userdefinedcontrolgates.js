function ControlGateInitialization(){
	userDefinedControlGatesDivIds=[];

	$("#display").click(function(){
		DisplayDivIds();
	});
	$(".dropzone").click(function(){
		if(userControlGateFlag){
			$(this).css("background","yellow");
			userDefinedControlGatesDivIds.push($(this).attr("id"));
			userDefinedControlGatesRowIds.push($(this).attr("rowid"));
			userDefinedControlGateColumnId=$(this).attr("columnid");
			userDefinedControlGatesComponent.push($(this).attr("gate"));
		}
	});
}

function StoreDivIds(){
	userControlGateFlag=1;
	for(var index=0;index<userDefinedControlGatesDivIds.length;index++){
		$("#"+userDefinedControlGatesDivIds[index]).css("background","transparent");
	}
	userDefinedControlGatesDivIds=[];
	userDefinedControlGatesComponent=[];
	userDefinedControlGatesRowIds=[];
	userDefinedControlGateColumnId=0;
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


}

