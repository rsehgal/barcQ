import scqubits as qubit
import scqubits.utils.plotting as plot
import numpy as np
import matplotlib.pyplot as plt

transmon = qubit.Transmon(EJ=30.02,EC=1.2,ng=0.3, ncut=31)
print(transmon.eigenvals(evals_count=12))
ng_list = np.linspace(-2, 2, 220)
temp=transmon.plot_evals_vs_paramvals('ng', ng_list, evals_count=5, subtract_ground=False);
#print(temp)
transmon.plot_phi_wavefunction(esys=None, which=[0,1,2,3,4], mode='real');
plt.show()
