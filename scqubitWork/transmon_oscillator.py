'''
Two transmons coupled to a resonator

Follow the link for details
https://scqubits.readthedocs.io/en/latest/guide/ipynb/hilbertspace.html#Example:-two-transmons-coupled-to-a-harmonic-mode
'''

import scqubits as qubit
import scqubits.utils.plotting as plot
import numpy as np
from scqubits import HilbertSpace, InteractionTerm, ParameterSweep
import qutip as qt
import matplotlib.pyplot as plt

tmon1 = qubit.Transmon(EJ=40,EC=0.2,ng=0.3, ncut=40, truncated_dim=4)

tmon2 = qubit.Transmon(EJ=15.0, EC=0.15, ng=0.0,  ncut=30,truncated_dim=4)

resonator = qubit.Oscillator(
    E_osc=4.5,
    truncated_dim=4  # up to 3 photons (0,1,2,3)
)

hilbertspace = qubit.HilbertSpace([tmon1, tmon2, resonator])
print(hilbertspace)

bare_hamiltonian = hilbertspace.bare_hamiltonian()
print("---------- Bare Hamiltonian -------------")
print(bare_hamiltonian)
#plt.show()
