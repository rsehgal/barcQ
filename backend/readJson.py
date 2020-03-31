import json
x =  '{ "name":"John", "age":30, "city":"New York"}'
y=json.loads(x)
print(y)

gateJson = '{"name":"CSIGN", "num_bits":2, "ctl_bits" : 0, "tgt_bits" : 1}'
gateLoad=json.loads(gateJson)
print(gateLoad)

'''
from qutip.qip.circuit import QubitCircuit, Gate
from qutip import *
import numpy as np
swap_gate=Gate("SWAP", targets=[0, 1])
print(swap_gate)
qu=basis(2,0)
print(cphase(np.pi/2))
'''