var pos1;// = $("#div1").position();
var pos2;// = $("#div2").position();
var lineCounter=0;

$('div').on('mousedown',function(event){
    //$(".dropzone").css('background', 'green');
    pos1=$(this).position();
});

$('div').on('mouseup',function(event){
    //alert("Mouse releaased.......");
    //$(".dropzone").css('background', 'green');
    lineCounter++;
    var newid=$("#connection").attr("id")+lineCounter;
        
    $("#connectionSVG").append($("#connection").clone()
                    .attr("id",newid));

    pos2=$(this).position();
    //alert("X1 : "+pos1.left+" : Y1 : "+pos1.top+" : X2 : "+pos2.left+" : Y2 : "+pos2.top);
    //$("#"+newLineId).attr('x1', pos1.left)
    $("#"+newid).attr('x1', pos1.left)
                .attr('y1', pos1.top)
                .attr('x2', pos2.left)
                .attr('y2', pos2.top);
});
