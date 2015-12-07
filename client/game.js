"use strict";

// socket stuff
var player = {
	x: 0,
	y: 0
};
var players = {};

var socket;

var setupSocket = function() {
	socket = io.connect();
	players = {};
	
	socket.on('connect', function() {
		player.x = Math.floor(Math.random() * 5);
		player.y = Math.floor(Math.random() * 5);
		socket.emit('join', {x: player.x, y: player.y});
	});
	
	socket.on('join', function(data) {
		players[data.player] = data.data;
		players[data.player].lastUpdate = Date.now();
	});
	
	socket.on('leave', function(data) {
		delete players[data.player];
	});
	
	socket.on('update', function(data) {
		if (data.player in players) {
			if (data.date > players[data.player].lastUpdate) {
				var p = players[data.player];
				p.lastUpdate = data.date;
				
				p.x = data.data.x;
				p.y = data.data.y;
			}
		}
	});
}

// display stuff
var canvas;
var context;

var setupCanvas = function() {
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
}

var updateCanvas = function() {
	// draw all the things
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = 'red';
	var pList = Object.keys(players);
	for (var i = 0; i < pList.length; i++) {
		var obj = players[pList[i]];
		
		context.fillRect(obj.x*32, obj.y*32, 32, 32);
	}
	
	context.fillStyle = 'green';
	context.fillRect(player.x*32, player.y*32, 32, 32);
	
	// update
	setTimeout(updateCanvas, 1000/30);
}

var setupInput = function() {
	window.addEventListener('keydown', function(e) {
		var k = e.keyCode;
		if (k == 37) {
			player.x -= 1;
		} else if (k == 38) {
			player.y -= 1;
		} else if (k == 39) {
			player.x += 1;
		} else if (k == 40) {
			player.y += 1;
		}
		
		socket.emit('update', player);
	});
}

// init
window.onload = function() {
	setupInput();
	setupCanvas();
	setupSocket();
	
	updateCanvas();
}