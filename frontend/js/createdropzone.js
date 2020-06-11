function CreateDropzone(){

var numOfRows=10;
var numOfCols=20;
var table = $('<table>').attr("id", "dropzonetable")
                        .attr("border", 0)
                        .attr("cellpading",1)
                        .attr("cellspacing",1);

for(var rowIndex=0; rowIndex < numOfRows ; rowIndex++){
    var rowId="row"+rowIndex;
    var row=$('<tr>').attr("id",rowId);
    for (var colIndex=0 ; colIndex < numOfCols ; colIndex++){
        var colId=rowId+"col"+colIndex;
        var col=$('<td>').attr("id",colId);
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
        col.append(div);

        row.append(col);
    }
    table.append(row);
}
$('#dropzoneDiv').append(table);
}
