import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import urllib2
import json
 
jsonurl = ("http://localhost:8085/telemachus/datalink?vertaltitude=v.altitude&gforce=v.geeForce&paused=p.paused&shipname=v.body&periapsis=o.PeA&apoapsis=o.ApA")

class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print 'New connection'
        #data = json.load(urllib2.urlopen(jsonurl))
	data = ("SAMPLE DATA")
        self.write_message(data)
      
    def on_message(self, message):
	print 'Message received: %s' % message
 
    def on_close(self):
        print 'Connection closed'
	
 
application = tornado.web.Application([
    (r'/kerbalwatch', WSHandler),
])
 
if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8090)
    tornado.ioloop.IOLoop.instance().start()
