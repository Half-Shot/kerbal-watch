var WebSocketTest()
{
	var ws = new WebSocket("ws://192.168.1.95:8085/datalink");

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

var test = function(){
	console.log("It's working... for now");
}

Pebble.addEventListener("ready",
  function(e) {
    //App is ready to receive JS messages
    test();
  }
);

Pebble.addEventListener("appmessage",
  function(e) {
    //Watch wants new data!
    getData();
  }
);
