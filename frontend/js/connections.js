var pos1;// = $("#div1").position();
var pos2;// = $("#div2").position();
var lineCounter=0;
var newid="";
var x1=0;
var y1=0;
var x2=0;
var y2=0;
var lineInitiated=0;

$('div').on('mousedown',function(event){
    //$(".dropzone").css('background', 'green');
    pos1=$(this).position();
});

$('div').on('mouseup',function(event){
    // This will allow adding line by clicking two divs,
    // Its working logic
    /*lineCounter++;
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
    */
});

/* Below three functions allow drawing line in real time
by dragging the line*/
$(document).mousedown(function(event){
    //newid="";
    lineInitiated=1;
    $("#initial").text(event.pageX + ", " + event.pageY);
    lineCounter++;
    newid=$("#connection").attr("id")+lineCounter;
        
    $("#connectionSVG").append($("#connection").clone()
                    .attr("id",newid));
    $("#"+newid).attr('x1', event.pageX)
                .attr('y1', event.pageY);

    x1=event.pageX;
    y1=event.pageY;
    
});

$(document).mousemove(function(event){
    //alert(newid);

    $("#coord").text(event.pageX + ", " + event.pageY);
    if(lineInitiated==1){
        $("#"+newid).attr('x2', event.pageX)
                    .attr('y2', event.pageY);
    }
});

$(document).mouseup(function(event){
    lineInitiated=0;
    /*$("#"+newid).remove();
    //alert("line removed..........");
    x2=event.pageX;
    y2=event.pageY;
        
    $("#connectionSVG").append($("#connection").clone()
                    .attr("id",newid));
    $("#"+newid).attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2);
    //alert("Added the line back.......");
    */
});