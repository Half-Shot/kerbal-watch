import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import urllib2
import json
import time
 
jsonurl = ("http://localhost:8085/telemachus/datalink?vertaltitude=v.altitude&gforce=v.geeForce&paused=p.paused&shipname=v.body&periapsis=o.PeA&apoapsis=o.ApA")

class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print 'New connection'
      
    def on_message(self, message):
	print 'Message received: %s' % message
	try:
           data = json.load(urllib2.urlopen(jsonurl))
	except:
	   print ("Could not retrieve data from game!")
	   data = ("FAILED")
        self.write_message(data)
	print ("Sent data back")
 
    def on_close(self):
        print 'Connection closed'
	
 
application = tornado.web.Application([
    (r'/kerbalwatch', WSHandler),
])
 
if __name__ == "__main__":
    print ("\nServer is running")
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8090)
    tornado.ioloop.IOLoop.instance().start()

while True:
	#time.sleep(0.25)
	data = json.load(urllib2.urlopen(jsonurl))
	ws.write_message(data)
	
