function CreateToolBox(){

var mydataExtended = JSON.parse(gateJson);
completeJson = mydataExtended;
var mydata = mydataExtended.instructions;
allowedControlledGates = mydataExtended.controlledgates;
allowedSingleQubitGates = mydataExtended.singequbitgates;
console.log("@@@@@@@@@@@@@@@ Available controlled gates @@@@@@@@@@@@@@@@@@@@");
console.log(typeof allowedControlledGates)
console.log(allowedControlledGates)
var numOfRows=mydata.length;
var $tableSingle = $('<table border=1 cellpading=0 cellspacing=0/>');
var $tableMultiple = $('<table border=1 cellpading=0 cellspacing=0/>');
var index=0;
for(var index=0; index<parseInt(numOfRows); index++){
  $row=$('<row/>');
  var gate1JustName=mydata[index].name;
  //console.log(gate1JustName);
  var gate1=gate1JustName+".png";
  var tdGateName="Raman"+gate1JustName;
  //console.log(gate1);
  /*var rowStr='<td><img src="../../images/'+gate1+'" id='
                      +gate1JustName
                      +' class="cloneAble" gate="'
                      +gate1JustName
                      +'" num_bits='+mydata[index].num_bits
                      +' ctl_enabled='+mydata[index].ctl_enabled
                      +' ctl_bits='+mydata[index].ctl_bits
                      +' tgt_bits='+mydata[index].tgt_bits
                      +' arg_enabled='+mydata[index].arg_enabled
                      +' arg_value='+mydata[index].arg_value
                      +' /></td>';
*/
 
  var rowStr='<td id="'+gate1JustName+'"/td>';  
  console.log("RowStr : "+rowStr);
  $row.append(rowStr);
  if(mydata[index].num_bits > 1){
    $tableMultiple.append($row);
  }else{
    $tableSingle.append($row);
  }
//  gate(gate1JustName);
  
}
/*$row=$('<row/>');
var rowStr='<td><div id="testDiv"/></td>';
  $row.append(rowStr);
  $table.append($row);
 
*/
$('#toolboxDivSingle').append($tableSingle);
$('#toolboxDivMultiple').append($tableMultiple);
for(var index=0; index<parseInt(numOfRows); index++){
 var svgGate=gate(mydata[index].name);
 console.log("GateName : "+mydata[index].name);
 if(mydata[index].name=="X"){
  console.log(mydata[index]);
 }
 svgGate.attr("id",mydata[index].name)
 svgGate.attr("gate",mydata[index].name)
                      .attr("num_bits",parseInt(mydata[index].num_bits))
                      .attr("ctl_enabled",mydata[index].ctl_enabled)
                      .attr("ctl_bits",mydata[index].ctl_bits)
                      .attr("tgt_bits",mydata[index].tgt_bits)
                      .attr("arg_enabled",mydata[index].arg_enabled)
                      .attr("arg_value",mydata[index].arg_value)
                      .attr("rowid",mydata[index].rowid)
                      .attr("columnid",mydata[index].columnid)
                      .attr("class","cloneAble");
     QFTAttach(svgGate);
     if(parseInt(mydata[index].num_bits)>1){
			svgGate.attr("targetGatename",mydata[index].targetGatename);
      svgGate.attr("targetGateType",mydata[index].targetGateType);
	 }
}

}

function QFTAttach(obj){
	obj.on("contextmenu", function(data, index) {
		//handle right click
		//alert("Right Clicked.......");

		//stop showing browser menu
		d3.event.preventDefault();
		
		//Logic to set the number of bits  of QFT or IQFT to the value supplied by user
		if(obj.attr("gate")=="QFT" || obj.attr("gate")=="IQFT" || obj.attr("gate")=="ADDA" || obj.attr("gate")=="IADD"){
				var argVal = prompt("Please enter the number of input bits :", 2);
				console.log("Setting QFT num_bits of "+obj.attr("id")+ " to "+argVal);
			    obj.attr("num_bits",argVal);
			    
		}
	});

}
