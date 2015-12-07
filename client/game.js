"use strict";

var connectSocket = function(e) {
	var socket = io.connect();
	
	socket.on('connect', function() {
		socket.emit('join', {x: 0, y: 0});
	});
}