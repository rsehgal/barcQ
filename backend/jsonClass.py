import json
from qutip import *
from qutip.qip import *
#from qutip.qip.circuit import QubitCircuit, Gate
import qutip.qip.circuit
import numpy as np
from IPython.display import Image
from userDefinedGates import *
from usergates import *
from qutip.qip.algorithms.qft import *
import math

userDefinedGatesList=["X","Y","Z"]

class Manager:

	def __init__(self,json_str=''):
		print("@@@@ Manager Constructor called @@@@")
		self.json_str=json_str
		self.gate_dict=json.loads(self.json_str)


class CircuitCreator:
	
	def __init__(self,json_str,input_lines=2,fromPython=True,basis=2):
		self.N=input_lines
		self.basis=basis
		self.inputQbitsList=[]

		self.input_lines=input_lines
		self.PrepareInputState()
		print("*********** Prepared Input state **************")
		print(self.inputState)
		print("***********************************************")

		print("@@@@ Gate Constructor called @@@@")
		self.json_str=json_str
		self.json_dict=json.loads(self.json_str)
		#gate_dict=Manager(json_str).gate_dict
		self.gate_list=[]
		for gate_dict in self.json_dict["instructions"]:
			self.gate_list.append(Gate(gate_dict,fromPython))	
			#print("------- Individual Gate Matrix of Gate : "+self.gate_list[len(self.gate_list)-1].gate_name+"----------")
			#print(self.gate_list[len(self.gate_list)-1].OperatorMatrix())

		#self.qutip_circuit=QubitCircuit(input_lines,reverse_states=True)
		print("======= ALL THE GATE IMPLEMENTED ============")
		num_lines=input_lines
		
		#self.qutip_circuit.user_gates={"X":PauliX, "Y":PauliY, "Z":PauliZ }
		
		'''
		for gate in self.gate_list:
			if gate.gate_name in userDefinedGatesList:

			else:
				self.qutip_circuit.add_gate(gate.gate)
		'''

	def AddGate(self):
		return True

	def Propagators(self):
		self.U_list=[]
		for gate in self.gate_list:
			if gate.name == "X":
				self.U_list.append(x(self.N,target=gate.targets[0]))
			elif gate.name == "Y":
				self.U_list.append(y(self.N,target=gate.targets[0]))
			elif gate.name == "Z":
				self.U_list.append(z(self.N,target=gate.targets[0]))
			elif gate.name == "RX":
				self.U_list.append(rx(gate.arg_value, self.N, gate.targets[0]))
			elif gate.name == "RY":
				self.U_list.append(ry(gate.arg_value, self.N, gate.targets[0]))
			elif gate.name == "RZ":
				self.U_list.append(rz(gate.arg_value, self.N, gate.targets[0]))
			elif gate.name == "SQRTNOT":
				self.U_list.append(sqrtnot(self.N, gate.targets[0]))
			elif gate.name == "SNOT":
				self.U_list.append(snot(self.N, gate.targets[0]))
			elif gate.name == "PHASEGATE":
				self.U_list.append(phasegate(gate.arg_value, self.N,gate.targets[0]))
			elif gate.name == "CRX":
				self.U_list.append(controlled_gate(rx(gate.arg_value), N=self.N, control=gate.controls[0], target=gate.targets[0]))
			elif gate.name == "CRY":
				self.U_list.append(controlled_gate(ry(gate.arg_value), N=self.N, control=gate.controls[0],target=gate.targets[0]))
			elif gate.name == "CRZ":
				self.U_list.append(controlled_gate(rz(gate.arg_value),N=self.N, control=gate.controls[0],target=gate.targets[0]))
			elif gate.name == "CPHASE":
				self.U_list.append(cphase(gate.arg_value, self.N, gate.controls[0], gate.targets[0]))
			elif gate.name == "CNOT":
				self.U_list.append(cnot(self.N, gate.controls[0], gate.targets[0]))
			elif gate.name == "CSIGN":
				self.U_list.append(csign(self.N, gate.controls[0], gate.targets[0]))
			elif gate.name == "BERKELEY":
				self.U_list.append(berkeley(self.N, gate.targets))
			elif gate.name == "SWAPalpha":
				self.U_list.append(swapalpha(gate.arg_value, self.N,  gate.targets))
			elif gate.name == "SWAP":
				self.U_list.append(swap(self.N, gate.targets))
			elif gate.name == "ISWAP":
				self.U_list.append(iswap(self.N, gate.targets))
			elif gate.name == "SQRTSWAP":
				self.U_list.append(sqrtswap(self.N, gate.targets))
			elif gate.name == "SQRTISWAP":
				self.U_list.append(sqrtiswap(self.N, gate.targets))
			elif gate.name == "FREDKIN":
				self.U_list.append(fredkin(self.N, gate.controls[0], gate.targets))
			elif gate.name == "TOFFOLI":
				self.U_list.append(toffoli(self.N, gate.controls, gate.targets[0]))
			elif gate.name == "GLOBALPHASE":
				self.U_list.append(globalphase(gate.arg_value, self.N))
			elif gate.name == "CGLOBALPHASE":
				self.U_list.append(controlled_gate(globalphase(gate.arg_value), N=self.N, control=gate.controls[0], target=gate.targets[0]))
			elif gate.name == "QFT":
				#self.U_list.append(self.QFTMatrix(gate.targets))
				self.U_list.append(gate_expand_ntoN(mat=qft(len(gate.targets)),target_list=gate.targets,N=self.N))
			elif gate.name == "IQFT":
				#self.U_list.append((self.QFTMatrix(gate.targets)).dag())
				self.U_list.append(gate_expand_ntoN(mat=qft(len(gate.targets)),target_list=gate.targets,N=self.N).dag())
			elif gate.name == "ADDA":
				self.U_list.append(gate_expand_ntoN(mat=PhiAddA(math.floor(len(gate.targets)/2)),target_list=gate.targets,N=self.N))
			elif gate.name == "IADD":
				self.U_list.append(gate_expand_ntoN(mat=PhiAddA(math.floor(len(gate.targets)/2)),target_list=gate.targets,N=self.N).dag())
			elif gate.name == "CQFT":
				self.U_list.append(gate_expand_ntoN(mat=ControlledUnitaryMatrix(qft(len(gate.targets)),gate.controls,gate.targets),control_list=gate.controls,target_list=gate.targets,N=self.N))
				
			#gate_expand_ntoN(ctlCNOT,[0],[2,3],N=4)


		print("========= printing Propagators +===============")
		print(self.U_list)
		print("===============================================")
		return self.U_list

	# def PhiAddA(self,N=None):
	# 	matList=[]
	# 	matList.append(controlled_gate(rz(np.pi),N=2*N+1, control=[N-1],target=[0]))
	# 	for indexB in range(1,N+1):
	# 		for indexA in range(N+1,2*N+1):
	# 			matList.append(controlled_gate(rz(np.pi/(indexB)),N=2*N+1, control=[indexA],target=[indexB]))
	# 	return  self.Gate_Sequence_Product(matList)
	
	def QFTMatrix(self,targets):
		targetStartIndex = targets[0]
		targetEndIndex = targets[len(targets)-1]
		idenListBeg = []
		idenListEnd = []
		for idenIndex in range(targetStartIndex):
			idenListBeg.append(qeye(2))
		#print("@@@@@@@@@@@@@ IDEN_LIST_BEG @@@@@@@@@@@")
		#print(idenListBeg)
		for idenIndex in range(targetEndIndex+1,self.N):
			idenListEnd.append(qeye(2))
		#print("@@@@@@@@@@@@@ IDEN_LIST_END @@@@@@@@@@@")
		#print(idenListEnd)
		#qftMatrix = qft(len(targets))
		
		finalMatrix = qft(len(targets))
		#finalMatrix = mat
		
		#print("@@@@@@@@@@@@@ QFTMatrix @@@@@@@@@@@")
		#print(qftMatrix)

		#print("Length of idenListBeg : "+str(len(idenListBeg)))
		startingTensor=qeye(2)
		#finalMatrix=0
		if len(idenListBeg) != 0:
			
			for index in range(1,len(idenListBeg)):
				startingTensor = tensor(startingTensor,qeye(2))
			finalMatrix = tensor(startingTensor,finalMatrix)
		#print("@@@@@@@@@@@@@ startingTensor @@@@@@@@@@@")
		#print(startingTensor)

		#print("Length of idenListEnd : "+str(len(idenListEnd)))
		endingTensor=qeye(2)
		if len(idenListEnd) != 0:
			
			for index in range(1,len(idenListEnd)):
				endingTensor = tensor(endingTensor,qeye(2))
			finalMatrix = tensor(finalMatrix,endingTensor)
		#print("@@@@@@@@@@@@@ endingTensor @@@@@@@@@@@")
		#print(endingTensor)

		#finalMatrix = tensor(startingTensor,qftMatrix,endingTensor)
		#print("@@@@@@@@@@@@@ finalMatrix @@@@@@@@@@@")
		#rint(finalMatrix)

		return finalMatrix
		
        
	''' 	
	def UserDefinedGatesPropagator(self):
		if gate.name == "X":
                self.U_list.append(rx(gate.arg_value, self.N, gate.targets[0]))
            elif gate.name == "RY":
                self.U_list.append(ry(gate.arg_value, self.N, gate.targets[0]))
	'''

	'''
	Function to apply the resultant operator matrix to the prepared input states
	'''
	def Apply(self):
		print("****** Data from Apply *******")
		print(self.OperatorMatrix())
		#print(self.inputState)
		print("******************************")
		return self.OperatorMatrix()*self.inputState
		
	def PrepareInputState(self):
		for qbitIndex in range(self.input_lines):
			self.inputQbitsList.append(basis(self.basis,0))
			self.inputState=tensor(self.inputQbitsList)

	def Gate_Sequence_Product(self,matList):
		matLength=len(matList)
		matProd=matList[matLength-1]
		print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		print(matProd.shape)

		for index in range(matLength-1):
			print((matList[matLength-2-index]).shape)
			matProd=matProd*matList[matLength-2-index]
		
		print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		return matProd



	def OperatorMatrix(self):
		#return gate_sequence_product(self.qutip_circuit.propagators())
		
		#return gate_sequence_product(self.Propagators(),left_to_right=False)
		return self.Gate_Sequence_Product(self.Propagators())

	def DumpCircuitImage(self,targetCkt="Self"):
		if(targetCkt=="Self"):
			#self.qutip_circuit.png
			return True
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

		#Adding for new Propagator function
		self.name=self.gate_name
		self.controls=self.ctl_bits
		self.targets=self.tgt_bits
		#self.arg_value already correctly defined

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
				 {"name":"ISWAP", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0},\
				 {"name":"QFT", "num_bits":2, "ctl_enabled" : 0, "ctl_bits" : "None", "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0},\
				 {"name":"CQFT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0}\
				 ]}'
	
	
	'''
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"CQFT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [1,2], "arg_enabled" : 0, "arg_value" : 0}\
				 ]}'
	'''
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
	
	
	'''
	# DEMONSTRATION OF CONTROLLED QFT
	#
	# Below block can be used to see the operator matrix of controlled QFT gate.
	# Its working nicely
	
	gateJson = '{\
				 "header":{},\
				 "config":{},\
				 "instructions":[\
				 {"name":"CQFT", "num_bits":2, "ctl_enabled" : 1, "ctl_bits" : [0], "tgt_bits" : [2], "arg_enabled" : 0, "arg_value" : 0}\
				 ]}'
	circCreator=CircuitCreator(gateJson,3)
	print(circCreator.OperatorMatrix())
	'''
	
	
	
	
	#circCreator.DumpCircuitImage()
	#circCreator.DumpDecomposedCircuitImage()
	

	#print(circCreator.gate_list[2].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[0].OperatorMatrix())
	#print(CircuitCreator(gateJson).gate_list[1].OperatorMatrix())
	#print(gate)

if __name__ == "__main__":
        main()
