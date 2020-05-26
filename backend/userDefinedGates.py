from qutip.qip.circuit import Gate
from qutip import  sigmax,sigmay,sigmaz
from qutip import Qobj
import numpy as numpy
import qutip.qip.circuit
from qutip import *

user_defined_gates=["X","Y","Z"]
def UserDefined(name):
	return (name in user_defined_gates)


def PauliX():
	return sigmax()

def PauliY():
	return sigmay()

def PauliZ():
	return sigmaz()

qc = QubitCircuit(2,reverse_states=False)
qc.user_gates={"X":PauliX, "Y":PauliY, "Z":PauliZ }

def main():
	h_gate=Gate("SNOT",targets=[0])
	qc.add_gate(h_gate)
	x_gate=Gate("X",targets=[1])
	qc.add_gate(x_gate)
	mat=qc.propagators()[0]
	print(mat)
	zero=basis(2,0)
	one=basis(2,1)
	input=tensor(zero,zero)
	print("====== Input ========")
	print(input)
	print("====== Result =======")
	res=mat*input

	print(res)
	qc.png


if __name__ == "__main__":
    main()
