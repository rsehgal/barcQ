function CreateToolBox(){

var mydataExtended = JSON.parse(gateJson);
var mydata = mydataExtended.instructions;
var numOfRows=mydata.length;
var $table = $('<table border=1px/>');
var index=0;
for(var index=0; index<parseInt(numOfRows); index++){
  $row=$('<row/>');
  var gate1JustName=mydata[index].name;
  //console.log(gate1JustName);
  var gate1=gate1JustName+".png";
  //console.log(gate1);
  var rowStr='<td><img src="../../images/'+gate1+'" id='
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
  $row.append(rowStr);
  $table.append($row);
  
}
$('#toolboxDiv').append($table);
}