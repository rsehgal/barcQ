import json
from qutip import *
from qutip.qip import *
from qutip.qip.circuit import QubitCircuit, Gate
import numpy as np

class Manager:

	def __init__(self,json_str=''):
		print("@@@@ Manager Constructor called @@@@")
		self.json_str=json_str
		self.gate_dict=json.loads(self.json_str)


	

class CreateGate:
	
	def __init__(self,json_str):
		print("@@@@ Gate Constructor called @@@@")
		self.json_str=json_str
		self.json_dict=json.loads(self.json_str)
		#gate_dict=Manager(json_str).gate_dict
		for gate_dict in self.json_dict["instructions"]:
			MyGate(gate_dict)

class MyGate:

	def __init__(self,gate_dict):
		self.gate_dict=gate_dict
		self.ConstructGate()
	

	def ConstructGate(self):
		self.gate_name=self.gate_dict["name"]
		self.num_bits=self.gate_dict["num_bits"]
		self.ctl_bits=self.gate_dict["ctl_bits"]
		self.tgt_bits=self.gate_dict["tgt_bits"]
		print("Constructing Gate : "+self.gate_name)
		self.gate=Gate(self.gate_name, controls=[self.ctl_bits], targets=[self.tgt_bits])

		

def main():
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"CSIGN", "num_bits":2, "ctl_bits" : 0, "tgt_bits" : 1},\
				 {"name":"CNOT", "num_bits":2, "ctl_bits" : 0, "tgt_bits" : 1},\
				 {"name":"CSWAP", "num_bits":2, "ctl_bits" : 0, "tgt_bits" : 1},\
				 {"name":"Raman", "num_bits":2, "ctl_bits" : 0, "tgt_bits" : 1}\
				 ]}'
	#gate=
	CreateGate(gateJson)
	#print(gate)

if __name__ == "__main__":
	main()