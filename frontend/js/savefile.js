/*var circuitJsonObj = {"header":{}, "config":{} };
var instructionsList=[];*/

/*
** Function to test core function to find unique elements in javascript array
*/ 
/*
function CoreTest(){
	var duplicates = [1, 3, 4, 2, 10, 2, 3, 8];
	var uniques = duplicates.unique(); // result = [1,3,4,2,8]

	console.log(uniques);
	console.log(uniques.sort());
	console.log("Both the things (Unique finding and Sorting) in one shot");
	console.log(duplicates.UniqueAndSorted());
}

function GridToJson(){
	instructionsList=[];
	// GetColumnGates(0);
	// console.log("-------------------------------------");
	// circuitJsonObj["instructions"]=instructionsList;
	// console.log(circuitJsonObj);
	//var uniqueSortedColIds=[0,1];
	var uniqueSortedRowIds=rowIds.UniqueAndSorted();
	console.log("GridToJson Raw column ids : "+colIds);
	var uniqueSortedColIds=colIds.UniqueAndSorted();
	console.log("GridToJson UniqueAndSorted colids : "+uniqueSortedColIds);
	for(var index = 0 ; index < uniqueSortedColIds.length ; index++){
		GetColumnGates(uniqueSortedColIds[index]);
	}

	console.log("-------------------------------------");
	circuitJsonObj["instructions"]=instructionsList;
	console.log(circuitJsonObj);

}

function GetColumnGates(columnNumber){
	//alert("Inside GetColumnGates...");
	console.log("uniqueSortedRowIds : "+uniqueSortedRowIds);
	for(var index=0 ; index < uniqueSortedRowIds.length ; index++){
		rowIndex = uniqueSortedRowIds[index];
		var divId="row"+rowIndex+"col"+columnNumber+"div";
		console.log("DivId from GetColumnGates for column number : "+columnNumber+" is "+divId+" : rowID : "+$("#"+divId).attr("rowid")+" : Name : "+$("#"+divId).attr("name"));
		//alert($("#"+divId).atgate["num_bits"]=$("#"+divId).attr("num_bits");tr("rowid"));
		//if($("#"+divId).attr("rowid")!=undefined){
		if($("#"+divId).attr("name")!=undefined && $("#"+divId).attr("name")!=""){
			//console.log($("#"+divId).attr("rowid")+" "+$("#"+divId).attr("columnid")+" "+$("#"+divId).attr("gate"));
			//"num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]}
			//console.log($("#"+divId).children().prop("tagName"));
			if($("#"+divId).children().prop("tagName")!=undefined){
			gate={};
			gate["name"]=$("#"+divId).attr("gate");
			gate["num_bits"]=$("#"+divId).attr("num_bits");
			gate["ctl_enabled"]=$("#"+divId).attr("ctl_enabled");
			gate["ctl_bits"]=$("#"+divId).attr("ctl_bits");
			gate["tgt_bits"]=$("#"+divId).attr("tgt_bits");
			gate["arg_enabled"]=$("#"+divId).attr("arg_enabled");
			gate["arg_value"]=$("#"+divId).attr("arg_value");
			gate["rowid"]=$("#"+divId).attr("rowid");
			gate["columnid"]=$("#"+divId).attr("columnid");
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

}*/

//New addition for saving the circuit

function saveData(data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

	var json = JSON.stringify(data),
        blob = new Blob([json], {type: "text/plain;charset=utf-8"}),
		url = window.URL.createObjectURL(blob);
	
	console.log(json);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

}


function main() {
	//console.log(circuitJsonObj)
  var savefile = document.getElementById("savefile");
  savefile.addEventListener("click", saveFile, false);
  console.log("Save Circuit clicked");
}


function saveFile(e) {
  //var input = document.getElementById("input")
  //var input = "Testing"
  //GridToJson();
  console.log(circuitJsonObj);
  saveData(circuitJsonObj, "test.txt");
  
  e.preventDefault();
}


window.onload = main;
