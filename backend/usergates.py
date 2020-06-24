from qutip import *
def x(N=None, target=0):
	if N is not None:
		return gate_expand_1toN(sigmax(), N, target)
	else:
		return sigmax()

def y(N=None, target=0):
	if N is not None:
		return gate_expand_1toN(sigmay(), N, target)
	else:
		return sigmay()

def z(N=None, target=0):
	if N is not None:
		return gate_expand_1toN(sigmaz(), N, target)
	else:
		return sigmaz()


def main():
	print(x(N=1,target=0))
	print(y(N=1,target=0))
	print(z(N=1,target=0))


if __name__ == "__main__":
        main()