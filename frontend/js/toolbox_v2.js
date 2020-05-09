function CreateToolBox(){

var mydataExtended = JSON.parse(gateJson);
var mydata = mydataExtended.instructions;
var numOfRows=mydata.length;
var $table = $('<table border=1 cellpading=0 cellspacing=0/>');
var index=0;
for(var index=0; index<parseInt(numOfRows); index++){
  $row=$('<row/>');
  var gate1JustName=mydata[index].name;
  //console.log(gate1JustName);
  var gate1=gate1JustName+".png";
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
  $table.append($row);
//  gate(gate1JustName);
  
}
/*$row=$('<row/>');
var rowStr='<td><div id="testDiv"/></td>';
  $row.append(rowStr);
  $table.append($row);
 
*/
$('#toolboxDiv').append($table);
for(var index=0; index<parseInt(numOfRows); index++){
 var svgGate=gate(mydata[index].name);
 console.log("GateName : "+mydata[index].name);
 if(mydata[index].name=="X"){
  console.log(mydata[index]);
 }
 svgGate.attr("id",mydata[index].name)
                      .attr("num_bits",parseInt(mydata[index].num_bits))
                      .attr("ctl_enabled",mydata[index].ctl_enabled)
                      .attr("ctl_bits",mydata[index].ctl_bits)
                      .attr("tgt_bits",mydata[index].tgt_bits)
                      .attr("arg_enabled",mydata[index].arg_enabled)
                      .attr("arg_value",mydata[index].arg_value)
                      .attr("rowid",mydata[index].rowid)
                      .attr("columnid",mydata[index].columnid)
                      .attr("class","cloneAble");
}

}