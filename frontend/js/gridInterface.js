var cellsIdToMerge="";
var counter=0;
function MergeCells(cellIdsString){
	var cellIdsArray=cellIdsString.split(" ");
	var cellIdsLength=cellIdsArray.length;
	console.log(cellIdsLength);
	$('#'+cellIdsArray[0]).attr('rowspan',cellIdsLength);
	$('#'+cellIdsArray[0]).children().css("background","white");
	for(var index=1 ; index < cellIdsLength ; index++){
		$('#'+cellIdsArray[index]).remove();
	}
	/*for(var cellIndex = 0 ; cellIndex < cellIdsLength ; cellIndex++){
		$('#'+cellIdsArray[cellIndex]).attr('rowspan',cellIdsLength)
    .closest('tbody')
    .find('#ts11')
    .remove();​
	}*/
}

function Attach2(){
	$("td").click(function(){
	console.log($(this).attr("id"));
	$(this).children().css("background","yellow");
	if(cellsIdToMerge==""){
		cellsIdToMerge=$(this).attr("id");
	}else{
		cellsIdToMerge+=" "+$(this).attr("id");
	}
});

function Merge(){
	MergeCells(cellsIdToMerge);
	cellsIdToMerge="";
}

$("#mergebutton").click(function(){
	Merge();
});

}