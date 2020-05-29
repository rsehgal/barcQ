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
var singleDivWidth=35;
var singleDivHeight=35;
var xorrad=10;
var controlrad=6;

//variable related to user defined control gates
var userDefinedControlGatesDivIds=[];
var userDefinedControlGatesComponent=[];
var tempDict={};
var tempRaman={};
var userDefinedControlGatesRowIds=[];
var userDefinedControlGateColumnId=0;

//var backSvgCanvas;


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
