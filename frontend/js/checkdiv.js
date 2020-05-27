
function checkDivForEmpty(rowid,colid,num_bits){
	////alert(rowid+" "+num_bits);
var val=0;
	for(var index=0 ; index < num_bits ; index++){
	rowidnext=parseInt(rowid)+parseInt(index);
	cellIdString="row"+rowidnext+"col"+colid;

	svgId=$('#'+cellIdString).children().children().attr('id'); //we pass rowid and column which helps to make cell id and then we call its children which will be div id
	//and then its childrren which will svg . Now next we have check whether svg contains g to check for emptiness
	
	//alert(cellIdString);
	//alert($.type(svgId));
	  if( ($.type(svgId)!='undefined') &&document.querySelector("#"+svgId + " g" ) == null){
		  continue;
	  }else{
		  break;
		  
	  }
	}
	//alert($('#'+cellIdString).children().attr('id')+" "+num_bits+" "+index);
	if(index==num_bits){
		val=1;
		return val;
	}
	return val;
	
}