function ControlGateInitialization(){
	userDefinedControlGatesDivIds=[];

	$("#display").click(function(){
		DisplayDivIds();
	});
	$(".dropzone").click(function(){
		if(userControlGateFlag){
			$(this).css("background","yellow");
		userDefinedControlGatesDivIds.push($(this).attr("id"));
		}
	});
}

function StoreDivIds(){
	userControlGateFlag=1;
	for(var index=0;index<userDefinedControlGatesDivIds.length;index++){
		$("#"+userDefinedControlGatesDivIds[index]).css("background","transparent");
	}
	userDefinedControlGatesDivIds=[];
}

function DisplayDivIds(){
	console.log(userDefinedControlGatesDivIds);
	userControlGateFlag=0;
	console.log("User Control gate flag : "+userControlGateFlag);
	//userDefinedControlGatesDivIds=[];


}

