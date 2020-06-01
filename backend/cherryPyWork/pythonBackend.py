import os, os.path
import random
import string

import cherrypy

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
    def CodeGenerator(self):
        print("====================================")
        print("Code Generator called...........")
        print("====================================")
        return "Hello Raman.."

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
     cherrypy.quickstart(StringGenerator(), '/', conf)