var ws = new WebSocket('ws://192.168.43.4:8090/kerbalwatch');
var response;

ws.onmessage = function(e){
	response = e.data;
	console.log("Recieved data");
	getData();
}

var getData = function(e) {
	
	console.log("Parsing data...");

	//Convert to JSON
	var json = JSON.parse(response);
	
	//Extract the data
	var altitude = Math.round(json.vertaltitude);
	var apoapsis = Math.round(json.apoapsis);
	var periapsis = Math.round(json.periapsis);
	var shipname = json.shipname;
	var paused = json.paused;
	
	//Construct a key-value dictionary	
	var dict = {"KEY_NAME" : shipname, "KEY_ALT": altitude, "KEY_APO" : apoapsis, "KEY_PER" : periapsis, "KEY_PAUSE" : paused};
	
	//Send data to watch for display
	Pebble.sendAppMessage(dict);
	console.log("Sent data to Pebble");
};

Pebble.addEventListener("ready",
  function(e) {
    //App is ready to receive JS messages
    console.log("Pebble is READY");
    ws.send("START")
  }
);

Pebble.addEventListener("appmessage",
  function(e) {
    //Watch wants new data!
    console.log("Recieved request from Pebble");
    ws.send('GET');
  }
);
