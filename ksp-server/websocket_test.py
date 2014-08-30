import json
import urllib2
import websocket
from websocket import create_connection
data1 = ("CLIENT HERE")
print ("Making connection...")
ws = create_connection("ws://localhost:8090/kerbalwatch")
print ("Sending le data...")
ws.send(data1)
print ("Receiving...")
result =  ws.recv()
print 'Message received: %s' % result
ws.close()
