function HTTPGET(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	return req.responseText;
}

var getData = function() {
	//Get weather info
	var response = HTTPGET("http://192.168.1.95:8085/telemachus/datalink?vertaltitude=v.altitude&gforce=v.geeForce&paused=p.paused&shipname=v.body&periapsis=o.PeA&apoapsis=o.ApA");
		
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