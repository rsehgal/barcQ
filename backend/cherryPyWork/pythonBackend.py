import os, os.path
import random
import string
import simplejson
import cherrypy
import json

import sys
sys.path.append("..")
from jsonClass import *


#MEDIA_DIR = os.path.join(os.path.abspath("."), u"media")

class StringGenerator(object):
    @cherrypy.expose
    def index(self):
        #return open('public/test.html')
        return open('../../frontend/GridInterface/samples/gridSkeleton.html')

    @cherrypy.expose
    def generate(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        cherrypy.session['mystring'] = some_string
        return some_string

    @cherrypy.expose
    def CodeGenerator(self, jsonObj):
        
        #cherrypy.response.headers['Content-Type'] = 'application/json'
        cherrypy.response.headers["Access-Control-Allow-Origin"] = "http://localhost"
        print("====================================")
        print("Code Generator called...........")
        print("JSONObj : "+jsonObj)
        
        # #return "Hello Raman.."
        data=simplejson.dumps(dict(title='Hello, Raman'))
        print(data)
        print("=============== RAMAN =====================")
        self.CreateCircuit(jsonObj)
        print("======== Going to call APPLY ==============")
        self.output=self.circCreator.Apply()
        print("############ OUTPUT #############")
        print(self.output)
        print("#################################")
        #return data
        return self.OutputToJson()

    '''
    This function will convert the output of the circuit to the JSON format
    which will be sent back to the frontend for plotting
    '''
    def OutputToJson(self):
        yList=self.output[:,0]
        yStringList=[abs(item)[0]**2 for item in yList]
        xList=[bin(val) for val in range(2**self.numOfInputLines)]
        jsonData={"xdata":xList,"ydata":yStringList}
        # print("++++++++++++++++++++++++++++++")
        # print(xList)
        # print(yStringList)
        jsonConvObj=json.dumps(jsonData)
        print(jsonConvObj)
        return jsonConvObj
        


    def Apply(self):
        return self.circCreator.Apply()

    #Python code to call QuTiP function
    def CreateCircuit(self,gateJson):
        self.numOfInputLines=self.FindNumOfInputLines(gateJson)
        self.numOfInputLines=self.numOfInputLines+1
        print("====== numOfInputLines : "+str(self.numOfInputLines)+" ============")
        self.circCreator=CircuitCreator(gateJson,self.numOfInputLines,False)
        #print(self.circCreator.OperatorMatrix())
        # self.circCreator.DumpCircuitImage()

    def FindNumOfInputLines(self,gateJson):
        json_dict=json.loads(gateJson)
        ctl_bits_List=[]
        tgt_bits_List=[]
        for gate_dict in json_dict["instructions"]:
            print("@@@@@@@@@@@@@@@@@@")
            print(gate_dict)
            print("@@@@@@@@@@@@@@@@@@")
            if(gate_dict["ctl_bits"]=="None"):
                gate_dict["ctl_bits"]=None

            if(gate_dict["ctl_bits"]!=None):
                gate_dict["ctl_bits"]=list(map(int,gate_dict["ctl_bits"].split(",")))
                #print("@@@@@@@@ Comparison with None failed @@@@@@@@")
            gate_dict["tgt_bits"]=list(map(int,gate_dict["tgt_bits"].split(",")))

            print(gate_dict["ctl_bits"])
            print(gate_dict["tgt_bits"])
            print("@@@@@@@@@@@@@@@@@@")

            if(gate_dict["ctl_bits"]!=None):
                for ctlBit in gate_dict["ctl_bits"]:
                    ctl_bits_List.append(ctlBit)
            for tgtBit in gate_dict["tgt_bits"]:
                    tgt_bits_List.append(tgtBit)

        maxCtl=0
        if(len(ctl_bits_List)>0):
            maxCtl=max(ctl_bits_List)
        maxTgt=max(tgt_bits_List)
        if(maxCtl > maxTgt):
            return maxCtl
        else:
            return maxTgt

        #return 4
        '''
        print("***************************************")
        print(lists.ctl_bits_List)
        print("***************************************")
        maxCtl=max(lists.ctl_bits_List)
        maxTgt=max(lists.tgt_bits_List)
        if(maxCtl > maxTgt):
            return maxCtl
        else:
            return maxTgt
        '''
    @cherrypy.expose
    def display(self):
        return cherrypy.session['mystring']

if __name__ == '__main__':
     conf = {

         '/': {
             'tools.sessions.on': True,
             'tools.staticdir.root': os.path.abspath(os.getcwd())
         },
         '/static': {
             'tools.staticdir.on': True,
             #'tools.staticdir.dir': './public'
             #'tools.staticdir.dir': '/home/rsehgal/barcQ/frontend'
             'tools.staticdir.dir': '../../frontend'
         },
         '/images': {
             'tools.staticdir.on': True,
             #'tools.staticdir.dir': './public'
             #'tools.staticdir.dir': '/home/rsehgal/barcQ/frontend/images'
             'tools.staticdir.dir': '../../frontend/images'
         },
         '/css': {
             'tools.staticdir.on': True,
             #'tools.staticdir.dir': './public'
             #'tools.staticdir.dir': '/home/rsehgal/barcQ/frontend/css'
             'tools.staticdir.dir': '../../frontend/css'
         },
         '/js': {
             'tools.staticdir.on': True,
             #'tools.staticdir.dir': './public'
             #'tools.staticdir.dir': '/home/rsehgal/barcQ/frontend/js'
             'tools.staticdir.dir': '../../frontend/js'
         },
         '/jsonschemas': {
             'tools.staticdir.on': True,
             #'tools.staticdir.dir': './public'
             #'tools.staticdir.dir': '/home/rsehgal/barcQ/frontend/jsonschemas'
             'tools.staticdir.dir': '../../frontend/jsonschemas'
         }
     }
     cherrypy.config.update({'server.socket_host': 'localhost','server.socket_port':8000})
     cherrypy.quickstart(StringGenerator(), '/', conf)
