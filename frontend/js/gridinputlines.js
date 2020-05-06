function AddInputLinesToGrid(){
console.log("AddInputLinesToGrid called........");
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 500)
                                     .attr("height", 500);
 
 //Draw the line
 var line = svgContainer.append("line")
                          .attr("x1", 60)
                          .attr("y1", 78)
                          .attr("x2", 400)
                          .attr("y2", 78)
                          .attr("stroke-width","2px")
                          .attr("stroke","black");
}
