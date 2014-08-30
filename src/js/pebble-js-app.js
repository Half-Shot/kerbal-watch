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
    test();
  }
);
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
    test();
  }
);
