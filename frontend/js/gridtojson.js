
var numOfRows=5;
circuitJsonObj = {"header":{}, "config":{} };
instructionsList=[]

function GridToJson(){
	GetColumnGates(0);
	console.log("-------------------------------------");
	circuitJsonObj["instructions"]=instructionsList;
	console.log(circuitJsonObj);

}

function GetColumnGates(columnNumber){
	//alert("Inside GetColumnGates...");
	for(var rowIndex=0 ; rowIndex < numOfRows ; rowIndex++){
		var divId="r"+rowIndex+"c"+columnNumber;
		//alert($("#"+divId).atgate["num_bits"]=$("#"+divId).attr("num_bits");tr("rowid"));
		if($("#"+divId).attr("rowid")!=undefined){
			console.log($("#"+divId).attr("rowid")+" "+$("#"+divId).attr("columnid")+" "+$("#"+divId).attr("gate"));
			//"num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]}
			console.log($("#"+divId).children().prop("tagName"));
			if($("#"+divId).children().prop("tagName")!=undefined){
			gate={};
			gate["name"]=$("#"+divId).attr("gate");
			gate["num_bits"]=$("#"+divId).attr("num_bits");
			gate["ctl_enabled"]=$("#"+divId).attr("ctl_enabled");
			gate["ctl_bits"]=$("#"+divId).attr("ctl_bits");
			gate["tgt_bits"]=$("#"+divId).attr("tgt_bits");
			gate["arg_enabled"]=$("#"+divId).attr("arg_enabled");
			gate["arg_value"]=$("#"+divId).attr("arg_value");
			instructionsList.push(gate);
		}
			//console.log("-------------------------------------");
			//console.log(gate);

		}
	}
}

function GetGateJson(){
	gate={};
	inneritem ["from"] = startConnectorId;
	inneritem ["to"] = endConnectorId;
	//{"name":"CNOT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]},\

}