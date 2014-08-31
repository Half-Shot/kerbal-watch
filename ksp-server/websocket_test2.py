import json
import time
import urllib2
import websocket
from websocket import create_connection
#data1 = ("DATA PLZ") # Look this is the stuff i type to entertain myself while coding ok? 
ws = create_connection("ws://localhost:8090/kerbalwatch")
data1 = 0

while True:
	data1 = (data1 + 1)
	data2 = str(data1)
	print ("Sending le data...")
	ws.send(data2)
	print ("Receiving...")
	result =  ws.recv()
	print 'Message received: %s' % result
	time.sleep(0.1)
