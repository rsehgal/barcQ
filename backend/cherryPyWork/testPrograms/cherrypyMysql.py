#!python
import cherrypy
import MySQLdb

def connect(thread_index):
    # Create a connection and store it in the current thread
    cherrypy.thread_data.db = MySQLdb.connect('localhost', 'barcq', 'barcq', 'barcq')

# Tell CherryPy to call "connect" for each thread, when it starts up
cherrypy.engine.subscribe('start_thread', connect)


class Root:
    def index(self):
        # Sample page that displays the number of records in "table"
        # Open a cursor, using the DB connection for the current thread
        c = cherrypy.thread_data.db.cursor()
        c.execute('select count(*) from user_circuits')
        res = c.fetchone()
        c.close()
        return "<html><body>Hello, you have %d records in your table</body></html>" % res[0]
    index.exposed = True

cherrypy.quickstart(Root())