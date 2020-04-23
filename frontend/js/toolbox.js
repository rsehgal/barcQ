function CreateToolBox(){

var mydata = JSON.parse(data);
var numOfRows=mydata.length;
var $table = $('<table border=1px/>');
var index=0;
for(var index=0; index<parseInt(numOfRows); index++){
  $row=$('<row/>');
  var gate1JustName=mydata[index].name;
  //console.log(gate1JustName);
  var gate1=gate1JustName+".png";
  //console.log(gate1);
  var rowStr='<td><img src="../../images/'+gate1+'" id='+gate1JustName+ ' class="cloneAble"/></td>';
  $row.append(rowStr);
  $table.append($row);
  
}
$('#toolboxDiv').append($table);
}