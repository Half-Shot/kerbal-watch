var socket = "ws://192.168.1.95:8085/datalink";

socket.onopen = function(event) {
	console.log("Connected to: " + event.currentTarget.URL);
	socket.send("{"+": ["v.altitude"]}");


var getData = function() {
		
	//Convert to JSON
	var json = JSON.parse(response);
	
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
    getData();
  }
);

Pebble.addEventListener("appmessage",
  function(e) {
    //Watch wants new data!
    getData();
  }
);
