#!python
import cherrypy
import MySQLdb
import json

def connect(thread_index):
    # Create a connection and store it in the current thread
    cherrypy.thread_data.db = MySQLdb.connect('localhost', 'barcq', 'barcq', 'barcq')

# Tell CherryPy to call "connect" for each thread, when it starts up
#cherrypy.engine.subscribe('start_thread', connect)

class DatabaseFunctions:

    def Insert(self, user_name, circuit_name,json_object):
        self.json_str=json_object
        self.json_dict=json.loads(self.json_str)
        print("============ JSON =============")
        print(json.dumps(self.json_dict["instructions"]))
        print("===============================")
        #cur = cherrypy.thread_data.db.cursor()
        # cur.execute("INSERT INTO user_circuits(user_name, circuit_name, json_object, time_stamp) values('%s', '%s', '%s', NOW())" % (user_name, circuit_name, json.dumps(self.json_dict["instructions"])))
        query = "INSERT INTO user_circuits(user_name, circuit_name, json_object, time_stamp) values('%s', '%s', '%s', NOW())" % (user_name, circuit_name, json.dumps(self.json_dict))
        self.ExecuteQuery(query)
        #cherrypy.thread_data.db.commit()    

    def Update(self):
        return True

    def Delete(self):
        return True

    def ExecuteQuery(self,query):
        cur = cherrypy.thread_data.db.cursor()
        cur.execute(query)
        cherrypy.thread_data.db.commit()    

DatabaseFunctions


class Root:
    def index(self):
        # Sample page that displays the number of records in "table"
        # Open a cursor, using the DB connection for the current thread
        c = cherrypy.thread_data.db.cursor()
        c.execute('select count(*) from test')
        res = c.fetchone()
        c.close()
        return "<html><body>Hello, you have %d records in your table</body></html>" % res[0]
    index.exposed = True

if __name__ == '__main__':
    cherrypy.quickstart(Root())