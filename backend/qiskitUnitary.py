import numpy as np
from qiskit import *
from qiskit import Aer

#Changing the simulator 
backend = Aer.get_backend('unitary_simulator')

#The circuit without measurement
circ = QuantumCircuit(2)
circ.crz(1.57079632,0,1)

#job execution and getting the result as an object
job = execute(circ, backend)
result = job.result()

#get the unitary matrix from the result object
print(result.get_unitary(circ, decimals=3))
