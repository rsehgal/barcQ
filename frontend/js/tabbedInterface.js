function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  tablinks = document.getElementsByClassName("tablinks");
  
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";

  //For each new plot, just add a line below

  
  
  //Demo to change the x and y of sumData
  //sumData[0]["x"]=["00t","01t","10t","11t"];
  //sumData[0]["y"]=[0.2,0.4,0.3,0.1];
  
  if(cityName=="results"){
    /* 
    TODO: Get the result data from server using AJAX call
          and set the x and y of required global variable
    */

    //Plotly.newPlot('plotHist', plotData);
    //Plotly.newPlot('countPlot', countData);
    Plotly.newPlot('sumPlot', sumData);
  }
  //evt.currentTarget.className += " active";
}