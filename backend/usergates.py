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

def gate_expand_ntoN(mat,targets,N):
	targetStartIndex = targets[0]
	targetEndIndex = targets[len(targets)-1]
	idenListBeg = []
	idenListEnd = []
	for idenIndex in range(targetStartIndex):
		idenListBeg.append(qeye(2))
	#print("@@@@@@@@@@@@@ IDEN_LIST_BEG @@@@@@@@@@@")
	#print(idenListBeg)
	for idenIndex in range(targetEndIndex+1,N):
		idenListEnd.append(qeye(2))
	#print("@@@@@@@@@@@@@ IDEN_LIST_END @@@@@@@@@@@")
	#print(idenListEnd)
	#qftMatrix = qft(len(targets))
		
	#finalMatrix = qft(len(targets))
	finalMatrix = mat
		
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

def main():
	print(x(N=1,target=0))
	print(y(N=1,target=0))
	print(z(N=1,target=0))


if __name__ == "__main__":
        main()