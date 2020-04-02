import json
from qutip import *
from qutip.qip import *
#from qutip.qip.circuit import QubitCircuit, Gate
import qutip.qip.circuit
import numpy as np
from IPython.display import Image

class Manager:

	def __init__(self,json_str=''):
		print("@@@@ Manager Constructor called @@@@")
		self.json_str=json_str
		self.gate_dict=json.loads(self.json_str)


	

class CircuitCreator:
	
	def __init__(self,json_str,input_lines=2):
		print("@@@@ Gate Constructor called @@@@")
		self.json_str=json_str
		self.json_dict=json.loads(self.json_str)
		#gate_dict=Manager(json_str).gate_dict
		self.gate_list=[]
		for gate_dict in self.json_dict["instructions"]:
			self.gate_list.append(Gate(gate_dict))	

		self.qutip_circuit=QubitCircuit(input_lines)
		for gate in self.gate_list:
			self.qutip_circuit.add_gate(gate.gate)

	def OperatorMatrix(self):
		return gate_sequence_product(self.qutip_circuit.propagators())

	def DumpCircuitImage(self):
		self.qutip_circuit.png
		return True
		
class Gate:

	def __init__(self,gate_dict):
		self.gate_dict=gate_dict
		self.ConstructGate()
	
	def CheckGateValidity(self,gate_name):
		return True

	def ConstructGate(self):
		self.gate_name=self.gate_dict["name"]
		self.num_bits=self.gate_dict["num_bits"]
		self.ctl_bits=self.gate_dict["ctl_bits"]
		self.tgt_bits=self.gate_dict["tgt_bits"]
		self.ctl_enabled=self.gate_dict["ctl_enabled"]
		print("Constructing Gate : "+self.gate_name)
		#self.valid_gate=self.CheckGateValidity(self.gate_name)
		#if(self.valid_gate):
		if(self.ctl_enabled==1):
			self.gate=circuit.Gate(self.gate_name,controls=self.ctl_bits,targets=self.tgt_bits)
		else:
			self.gate=circuit.Gate(self.gate_name,targets=self.tgt_bits)

	def Decompose(self):
		return True

	def OperatorMatrix(self):
		qc = QubitCircuit(self.num_bits)
		qc.add_gate(self.gate)
		return qc.propagators()
		#return (circuit.QubitCircuit(self.num_bits).add_gate(self.gate)).propagators()
		

def main():
	
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"CNOT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1]},\
				 {"name":"SWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : [0], "tgt_bits" : [0,1]}\
				 ]}'
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
	circCreator=CircuitCreator(gateJson,3)
	print(circCreator.gate_list[0].OperatorMatrix())
	print(circCreator.gate_list[1].OperatorMatrix())
	print(circCreator.OperatorMatrix())
	circCreator.DumpCircuitImage()
	#print(circCreator.gate_list[2].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[0].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[1].OperatorMatrix())
	#print(gate)

if __name__ == "__main__":
        main()
