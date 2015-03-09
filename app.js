/**
  Copyright (C) 2014 ATOS

    This file is part of AEON.

    AEON is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AEON is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AEON.  If not, see <http://www.gnu.org/licenses/>.

  Authors:
    Javier Garcia <javier.garcia@atos.net>
    Jose Gato Luis <jose.gato@atos.net>


  */


//var AeonSDK = require('../lib/aeonSDK.js');
var AeonSDK = require('aeonsdk-node');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() +
    s4() + s4() + s4() + s4();
}

var uuid = guid();
console.log(uuid)
var SUB_URL = "";
var YOUR_ID = "app_"+uuid;
var YOUR_DESC = "app_"+uuid+"_desc";

var control = function control(msg){
    console.log("Control: ", msg);
    subscription = sdk.getSubscription();

}

var received = function received(msg) {
    console.log("Received: ", msg)
}

if(process.argv.length != 3){
    console.log("Use: node receivemessage.js ls|dtube|sensors|devEvents|imgRecog|transportEvents|alert");
    return;
}


if(process.argv[2] == "ls")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/444196bf-9452-4bad-95a5-0aab2bf7b4ee";
else if(process.argv[2] == "dtube")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/4d6d1e27-205c-44a0-bfd8-28a8edca0374";
else if(process.argv[2] == "sensors")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/06ab4ff0-4cf8-45b8-a40a-dd03750e61c9";
else if(process.argv[2] == "devEvents")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/85082ece-c08a-4d20-af85-d9bf5804a355";
else if(process.argv[2] == "transportEvents")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/75f2913d-2821-4a27-8049-e6e67203d433";
else if(process.argv[2] == "imgRecog")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/92d3be12-8a3a-4dc0-abec-3de1357e0efc";
else if(process.argv[2] == "alert")
    SUB_URL = "http://aeon-back.herokuapp.com/subscribe/66ba3dda-f6b4-488a-a2b4-c64c49b384e6";
else{
    console.log("Use: node receivemessage.js ls|dtube|sensors|devEvents|transportEvents|imgRecog|alert");
    return;
}

var userData = {
  "id":YOUR_ID,
  "desc": YOUR_DESC
};

sdk = new AeonSDK(SUB_URL, userData);

console.log("=========================================");
console.log("Channel: "+process.argv[2]);
console.log("Channel URL: "+SUB_URL);
console.log("=========================================");

sdk.subscribe(received, control);
console.log("Ok, we are subscribed, waiting for messages");

// setTimeout(function(){
//     sdk.pauseSubscription();
//     console.log("lets pause 3 secs");

//     setTimeout(function(){
//         sdk.continueSubscription();
//         console.log("lets continue");
//         setTimeout(function(){
//             sdk.deleteSubscription();
//             console.log("Closing. Bye bye");

//         }, 3000);
//     }, 3000);

// }, 3000);

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(80);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:80/");