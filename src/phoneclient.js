function HTTPGET(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	return req.responseText;
}

var connection = new WebSocket('ws://192.168.1.95:8085/telemachus/datalink');

var serverdata =
{
  "+": ["v.altitude", "v.name"],
  "rate": 500
};

var openconnection = function(){
	connection.send(JSON.stringify(serverdata));
};

connection.onopen = function(){
   /*Send a small message to the console once the connection is established */
   console.log('Connection open!');
};

connection.onclose = function(){
   console.log('Connection closed');
};

connection.onmessage = function(e){
   var server_message = e.data;
   console.log(server_message);
};

var getData = function() {
		
	//Convert to JSON
	var json = JSON.parse(e.data);
	
	//Extract the data
	var altitude = Math.round(json.vertaltitude);
	var apoapsis = Math.round(json.apoapsis);
	var periapsis = Math.round(json.periapsis);
	var shipname = json.shipname;
	
	//Construct a key-value dictionary	
	var dict = {"KEY_NAME" : shipname, "KEY_ALT": altitude, "KEY_APO" : apoapsis, "KEY_PER" : periapsis};
	
	//Send data to watch for display
	Pebble.sendAppMessage(dict);
	console.log("SENT THE DATA!");
};

Pebble.addEventListener("ready",
  function(e) {
    //App is ready to receive JS messages
	openconnection();
    getData();
  }
);

Pebble.addEventListener("appmessage",
  function(e) {
    //Watch wants new data!
    getData();
  }
);
