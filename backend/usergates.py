from qutip import *
import numpy as np
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

def PhiAddA(N=None):
	matList=[]
	ctl=int(2*N)
	#matList.append(controlled_gate(rz(np.pi),N=2*N+1, control=ctl,target=0))
	#matList.append(controlled_gate(rz(np.pi),N=ctl+1, control=ctl,target=0))
	matList.append(cphase(np.pi,N=ctl+1, control=ctl,target=0))
	print("@@@@@@@@@@@@ INSIDE PHIADDA @@@@@@@@@@@@")
	print("phase : "+str(np.pi)+" : ctl : "+str(ctl)+" : tgt : "+str(0))
	print(matList[0].shape)
	outerCounter=0
	contList=list(range(int(N)+1,int(2*N)+1))
	#print(range(int(N)+1,int(2*N)+1))
	print(contList)

	for indexB in range(2,int(N)+2):

		if(indexB==(int(N)+1)):
			phaseDeno=1
			for indexA in range(int(N)+1,int(2*N)+1):
				phaseDeno=phaseDeno+1
				#matList.append(controlled_gate(rz(np.pi/(indexB)),N=int(2*N)+1, control=indexA,target=indexB))
				#matList.append(cphase(np.pi/indexB,N=int(2*N)+1, control=indexA,target=indexB))

				matList.append(cphase(2*np.pi/(2**phaseDeno),N=int(2*N)+1, control=indexA,target=indexB-1))
				print("phase : "+str(2*np.pi/(2**phaseDeno))+" : ctl : "+str(indexA)+" : tgt : "+str(indexB-1))
		
		else:
			phaseDeno=0 #outerCounter
			cont=contList[len(contList)-indexB]
			#for indexA in range(int(N)+1,int(2*N)+1):
			for indexA in range(indexB):
				phaseDeno=phaseDeno+1
				#matList.append(controlled_gate(rz(np.pi/(indexB)),N=int(2*N)+1, control=indexA,target=indexB))
				#matList.append(cphase(np.pi/indexB,N=int(2*N)+1, control=indexA,target=indexB))
				matList.append(cphase(2*np.pi/(2**phaseDeno),N=int(2*N)+1, control=cont,target=indexB-1))
				print("phase : "+str(2*np.pi/(2**phaseDeno))+" : ctl : "+str(cont)+" : tgt : "+str(indexB-1))
				cont=cont+1
			outerCounter=outerCounter+1
		
	#return  self.Gate_Sequence_Product(matList)
	matLength=len(matList)
	matProd=matList[matLength-1]
	for index in range(matLength-1):
		matProd=matProd*matList[matLength-2-index]
	'''
	res=cphase(np.pi/4,5,4,2)*cphase(np.pi/2,5,3,2)*cphase(np.pi/2,5,4,1)*cphase(np.pi,5,3,1)*cphase(np.pi,5,4,0)
	ones=np.ones(32)
	print("=========== Debug ++++++++++++")
	print(ones*(res-matProd))
	print("++++++++++++ =================")
	'''
	return matProd
	#return res

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