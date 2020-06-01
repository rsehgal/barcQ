import json
from qutip import *
from qutip.qip import *
#from qutip.qip.circuit import QubitCircuit, Gate
import qutip.qip.circuit
import numpy as np
from IPython.display import Image
from userDefinedGates import *

class Manager:

	def __init__(self,json_str=''):
		print("@@@@ Manager Constructor called @@@@")
		self.json_str=json_str
		self.gate_dict=json.loads(self.json_str)


class CircuitCreator:
	
	def __init__(self,json_str,input_lines=2,fromPython=True):
		print("@@@@ Gate Constructor called @@@@")
		self.json_str=json_str
		self.json_dict=json.loads(self.json_str)
		#gate_dict=Manager(json_str).gate_dict
		self.gate_list=[]
		for gate_dict in self.json_dict["instructions"]:
			self.gate_list.append(Gate(gate_dict,fromPython))	
			#print("------- Individual Gate Matrix of Gate : "+self.gate_list[len(self.gate_list)-1].gate_name+"----------")
			#print(self.gate_list[len(self.gate_list)-1].OperatorMatrix())

		self.qutip_circuit=QubitCircuit(input_lines,reverse_states=False)
		num_lines=input_lines
		self.qutip_circuit.user_gates={"X":PauliX, "Y":PauliY, "Z":PauliZ }
		for gate in self.gate_list:
			self.qutip_circuit.add_gate(gate.gate)
			'''
			if gate.isUserDefined:
				self.qutip_circuit.U_list.append(gate.OperatorMatrix())
				print("RAMAN GateName : "+gate.gate_name)
			'''

	def OperatorMatrix(self):
		return gate_sequence_product(self.qutip_circuit.propagators())

	def DumpCircuitImage(self,targetCkt="Self"):
		if(targetCkt=="Self"):
			self.qutip_circuit.png
		else:
			targetCkt.png
		return True

	def DumpDecomposedCircuitImage(self):
		self.DumpCircuitImage(self.Decompose())
		return True

	def ValidTopology(self):
		return True

	def Decompose(self):
		return self.qutip_circuit.resolve_gates()
		
class Gate:

	def __init__(self,gate_dict,fromPython):
		self.isUserDefined=False
		self.gate_dict=gate_dict
		print("===========================")
		print(self.gate_dict)
		self.ConstructGate(fromPython)
	
	def CheckGateValidity(self,gate_name):
		return True

	def ConstructGate(self,fromPython):
		self.gate_name=self.gate_dict["name"]
		self.isUserDefined=UserDefined(self.gate_name)
		print("Sehgal GATENAME : "+self.gate_name)
		if(self.gate_name=="CCNOT"):
			self.gate_name="TOFFOLI"
		if(self.gate_name=="CSWAP"):
			self.gate_name="FREDKIN"
		if(self.gate_name=="H"):
			self.gate_name="SNOT"
		self.num_bits=self.gate_dict["num_bits"]
		self.ctl_bits=self.gate_dict["ctl_bits"]
		if(self.ctl_bits=="None"):
			self.ctl_bits=None
		
		self.tgt_bits=self.gate_dict["tgt_bits"]
		self.ctl_enabled=self.gate_dict["ctl_enabled"]
		self.arg_enabled=self.gate_dict["arg_enabled"]
		self.arg_value=self.gate_dict["arg_value"]
		if(self.arg_value=="None"):
			self.arg_value=None
		print("Constructing Gate : "+self.gate_name)
		
		if(not fromPython):
			if(self.ctl_bits!=None):
				self.ctl_bits=list(map(int,self.ctl_bits.split(",")))
				#print("@@@@@@@@ Comparison with None failed @@@@@@@@")
			self.tgt_bits=list(map(int,self.tgt_bits.split(",")))
			if(self.arg_value!=None):
				self.arg_value=float(self.arg_value)
			self.num_bits=int(self.num_bits)
		'''
		print("Arg_Value : "+str(self.arg_value))
		print("Control bits : "+str(self.ctl_bits))
		print("Target bits : "+str(self.tgt_bits))
		'''
		#self.valid_gate=self.CheckGateValidity(self.gate_name)
		#if(self.valid_gate):
		#self.qc=QubitCircuit(num_lines)#self.num_bits)
		self.qc=QubitCircuit(self.num_bits)
		self.qc.user_gates={"X":PauliX, "Y":PauliY, "Z":PauliZ }

		'''
		if(self.ctl_enabled==1):
			if(self.arg_enabled==1):
				self.gate=circuit.Gate(self.gate_name,controls=self.ctl_bits,targets=self.tgt_bits,arg_value=self.arg_value)
			else:
				self.gate=circuit.Gate(self.gate_name,controls=self.ctl_bits,targets=self.tgt_bits)
		else:
			if(self.arg_enabled==1):
				self.gate=circuit.Gate(self.gate_name,targets=self.tgt_bits,arg_value=self.arg_value)
			else:
				self.gate=circuit.Gate(self.gate_name,targets=self.tgt_bits)
		'''
		'''
		After introduction of "None", the below single line replaces the above commented block.
		Keeping the commented block for the reference, Will be removed once the code is tested.
		'''
		self.gate=circuit.Gate(self.gate_name,controls=self.ctl_bits,targets=self.tgt_bits,arg_value=self.arg_value)

	def Decompose(self):
		qc = QubitCircuit(self.num_bits)
		qc.add_gate(self.gate)
		return qc.resolve_gates()
		#return True

	def OperatorMatrix(self):
		qc = QubitCircuit(self.num_bits)
		qc.add_gate(self.gate)
		return qc.propagators()
		#return (circuit.QubitCircuit(self.num_bits).add_gate(self.gate)).propagators()

	def ValidTopology(self):
		return True

	def GetAlternateGateSequence(self):
		return True
		

def main():
	'''
	#Used to Test Decomposition of CCNOT gate
	gateJson = '{\
				"header":{},\
				"config":{},\
				"instructions":[\
				 {"name":"CCNOT", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0,2], "tgt_bits" : [1]}\
				]}'

	'''
	'''
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"H", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"H", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"X", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None", "rowid" : 2, "columnid" : 4},\
				 {"name":"X", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None", "rowid" : 2, "columnid" : 4}\
				 ]}'
	'''
	
	
	#New JSON to take care of single input gates as well as gate that accept arg_values
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"H", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"RX", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [0], "arg_enabled" : 1, "arg_value" : 1.57},\
				 {"name":"RY", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [1], "arg_enabled" : 1, "arg_value" : 1.2},\
				 {"name":"RZ", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [2], "arg_enabled" : 1, "arg_value" : 1.34},\
				 {"name":"SQRTNOT", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [2], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"PHASEGATE", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None","tgt_bits" : [2], "arg_enabled" : 1, "arg_value" : 0.34},\
				 {"name":"CPHASE", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [2],"tgt_bits" : [0], "arg_enabled" : 1, "arg_value" : 0.87},\
				 {"name":"FREDKIN", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0],"tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"CSIGN", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0],"tgt_bits" : [1], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"CNOT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"SWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [0,1], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"CSWAP", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : "None", "rowid" : 2, "columnid" : 3},\
				 {"name":"CRX", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1], "arg_enabled" : 1, "arg_value" : 0, "rowid" : 2, "columnid" : 3},\
				 {"name":"CRY", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1], "arg_enabled" : 1, "arg_value" : 0, "rowid" : 2, "columnid" : 3},\
				 {"name":"X", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [0], "arg_enabled" : 0, "arg_value" : "None", "rowid" : 2, "columnid" : 4},\
				 {"name":"Y", "num_bits":1, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [1], "arg_enabled" : 0, "arg_value" : "None", "rowid" : 2, "columnid" : 4},\
				 {"name":"BERKELEY", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0},\
				 {"name":"TOFFOLI", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0,2], "tgt_bits" : [1], "arg_enabled" : 0, "arg_value" : "None"},\
				 {"name":"ISWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0}\
				 ]}'
	
	'''
	#Tested
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"RX", "num_bits":1, "tgt_bits" : [0], "arg_enabled" : 1, "arg_value" : "np.pi/2"},\
				 {"name":"CNOT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]},\
				 {"name":"SWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : [0], "tgt_bits" : [0,1]},\
				 {"name":"TOFFOLI", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0,1], "tgt_bits" : [2]},\
				 {"name":"CCNOT", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [0,2], "tgt_bits" : [1]},\
				 {"name":"CCNOT", "num_bits":3, "ctl_enabled" : 1, "ctl_bits" : [1,2], "tgt_bits" : [0]}\
				 ]}'
	'''

	'''
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"CNOT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]},\
				 {"name":"SWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : [0], "tgt_bits" : [0,1]},\
				 {"name":"Raman", "num_bits":2,"ctl_enabled" : 0 , "ctl_bits" : [0], "tgt_bits" : [1]}\
				 ]}'
	'''
	#gate=
	circCreator=CircuitCreator(gateJson,4)
	#print(circCreator.gate_list[0].OperatorMatrix())
	#print(circCreator.gate_list[1].OperatorMatrix())
	
	print(circCreator.OperatorMatrix())
	circCreator.DumpCircuitImage()
	#circCreator.DumpDecomposedCircuitImage()
	

	#print(circCreator.gate_list[2].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[0].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[1].OperatorMatrix())
	#print(gate)

if __name__ == "__main__":
        main()
