var connectorId="";

/* 
** This function will be called when any connector gets clicked.
*/
function test(evt){
    var conn=evt.target;
	//alert(conn.position);
	if(connectorId!=""){
		$("#"+connectorId).css("stroke","black");	
	}
	connectorId=conn.getAttribute("id");
	//alert(connectorId);
	$("#"+connectorId).css("stroke","red");

	var parentSvgId=$("#"+connectorId).parent().attr("id");
	//alert("Parent ID : "+parentSvgId);

	//To disable drag when connector is clicked
	$("#"+parentSvgId).draggable('disable');


}

/*
** To reenable dragging when the Gate image is clicked
*/
function enabledrag(evt){
	$("#"+$("#"+evt.target.getAttribute("id")).parent().attr("id")).draggable('enable');
}