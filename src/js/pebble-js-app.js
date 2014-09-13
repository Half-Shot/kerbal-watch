var initialized = false;
var ws = new WebSocket('ws://192.168.1.95:8090/kerbalwatch');
var getDataLoop = setInterval(function () {getData()}, 200);
var updatePebbleLoop = setInterval(function () {updatePebble()}, 100);
var response;
var dict;

ws.onmessage = function(e){
	response = e.data;
	console.log("Recieved data");
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
	ws.send("GET")
};

var updatePebble = function(dict) {
	Pebble.sendAppMessage(dict);
	console.log("Sent data to Pebble");
}

Pebble.addEventListener("ready",
  function(e) {
    //App is ready to receive JS messages
    console.log("Pebble is READY");
	initialized = true;
  }
);

Pebble.addEventListener("appmessage",
  function(e) {
    //Watch wants new data!
    console.log("Recieved request from Pebble");
  }
);

Pebble.addEventListener("showConfiguration", function() {
  console.log("Showing configuration");
  Pebble.openURL('http://largepixelcollider.net/kerbalwatch/configurable.html');
});
