function CreateDropzone(){

var table = $('<table>').attr("id", "dropzonetable")
                        .attr("border", 0)
                        .attr("cellpading",1)
                        .attr("cellspacing",0)
                        .attr("border-spacing",0)
                        .css("vertical-align","middle");


for(var rowIndex=0; rowIndex < numOfRowsInInterface ; rowIndex++){
    var rowId="row"+rowIndex;
    var row=$('<tr>').attr("id",rowId);
    //if(rowIndex!=0){
    for (var colIndex=0 ; colIndex < numOfColsInInterface ; colIndex++){
        var colId=rowId+"col"+colIndex;
        var col=$('<td>').attr("id",colId)
                         .css("max-height",36)
                         .css("max-width",36)
                         .css("padding",0);
                         //.css("display","block");
        var divId=colId+"div";
        var div=$('<div>').addClass("dropzone")
                          .attr("id",divId)
                          .attr("name","")
                          .attr("rowId",rowIndex)
                          .attr("columnId",colIndex)
                          .attr("gate","")
                          .attr("num_bits","")
                          .attr("ctl_enabled","")
                          .attr("ctl_bits","")
                          .attr("tgt_bits","")
                          .attr("arg_enabled",0)
                          .attr("arg_value",0);
                          //.css("background-color","red");
        col.append(div);

        row.append(col);
    }
  //}
    table.append(row);
}
$('#dropzoneDiv').append(table);//.css("margin-top",50);
}
