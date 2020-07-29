var connectorId="";
var x1=0;
var y1=0;
var x2=0;
var y2=0;
var lineInitiated=0;
var lineCounter=0;
var startConnectorId="";
var endConnectorId="";
var startConnectorWireIds="";
var endConnectorWireIds="";
var jsonObj = [];
circuitJsonObj = {"header":{}, "config":{} };
var dropableCounter=0;
var idForDelete="";
var colIds=[];
var rowIds=[];
var uniqueSortedRowIds=[];
var gridConnectorRadius=3;
var userControlGateFlag=0;
var singleDivWidth=36;
var singleDivHeight=36;
var xorrad=10;
var controlrad=6;

//variable related to user defined control gates
var userDefinedControlGatesDivIds=[];
var userDefinedControlGatesComponent=[];
var tempDict={};
var tempRaman={};
var userDefinedControlGatesRowIds=[];
var userDefinedControlGateColumnId=0;

//Global variables to define the number of rows and columns in the dropzone
var numOfRowsInInterface=14;
var numOfColsInInterface=14;



//Qutip related imports
var imports="#importing the required python modules <br/>"+
			"import numpy as np <br/>"+
			"import json <br/>"+
			"from IPython.display import Image <br/> <br/>"+
			"#importing the required QuTiP modules <br/>"+
			"from qutip import * <br/>"+
			"from qutip.qip import * <br/>"+
			"from qutip.qip.circuit import Gate<br/> "+
			"import qutip.qip.circuit <br/> <br/>"+
			
			"#Creating the require circuit <br/>";


//Plotly related global variables
//var xData = ["Apples","Organges", "Bananas"];
//var yData = ["0.5","0.2","0.3"];
var xData = [];
var yData = [];
var plotData=[
		  {
		    histfunc: "count",
		    y: yData,
		    x: xData,
		    type: "histogram",
		    name: "count"
		  },
		  {
		    histfunc: "sum",
		    y: yData,
		    x: xData,
		    type: "histogram",
		    name: "sum"
		  }
		];
//One has to modify the x and y of sumData and it will be reflected in the histogram
var sumData=[{
			  histfunc:"sum",
			  y: yData,
		      x: xData,
		      type: "histogram",
		      name: "sum"
			}];

var countData=[{
			  histfunc:"count",
			  y: yData,
		      x: xData,
		      type: "histogram",
		      name: "count"
			}];


//Variable introduced for GenericControllUnitaryGates
var colIdOfGenericControlledUnitaryGate=0;
var targetUnitaryGate="";
var unitaryControlRowIds=[];
var unitaryTargetRowIds=[];
var offSetRowId=0;
var gateObj;

var allowedControlledGates ;
var allowedSingleQubitGates;
var completeJson;
