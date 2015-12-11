"use strict";

var map;

// images
var tileset = new Image();
tileset.src = 'assets/img/tileset.png';

var characterSprite = new Image();
characterSprite.src = 'assets/img/character.png';

var npcSprite = new Image();
npcSprite.src = 'assets/img/npc.png';

// socket stuff
var emitInterval = 1;
var emitCount = 0;

var direction = {
	down: 0,
	up: 1,
	right: 2,
	left: 3
};

var player = {
	x: 0,
	y: 0,
	direction: direction.down,
	walking: false,
	animFrame: 0.0
};
var players = {};

var socket;
var setupSocket = function() {
	socket = io.connect();
	players = {};
	
	socket.on('connect', function() {
		player.x = Math.floor(Math.random() * 5);
		player.y = Math.floor(Math.random() * 5);
		socket.emit('join', player);
	});
	
	socket.on('map', function(data) {
		map = data;
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
				p = data.data;
				p.lastUpdate = data.date;
				
				players[data.player] = p;
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
	if (map && tileset.complete && characterSprite.complete) {
		// update all the things
		if (!(keysdown.left || keysdown.right || keysdown.up || keysdown.down)) {
			player.walking = false;
		} else {
			if (keysdown.left) {
				player.x -= 3 / 30;
				player.direction = direction.left;
				
				if (!player.walking) player.animFrame = 1;
				player.walking = true;
			} 
			if (keysdown.right) {
				player.x += 3 / 30;
				player.direction = direction.right;
				
				if (!player.walking) player.animFrame = 1;
				player.walking = true;
			}
			if (keysdown.up) {
				player.y -= 3 / 30;
				player.direction = direction.up;
				
				if (!player.walking) player.animFrame = 1;
				player.walking = true;
			}
			if (keysdown.down) {
				player.y += 3 / 30;
				player.direction = direction.down;
				
				if (!player.walking) player.animFrame = 1;
				player.walking = true;
			}
		}
		
		if (player.walking) {
			player.animFrame += 4 / 30;
			if (player.animFrame >= 4) {
				player.animFrame = 0;
			}
		} else {
			player.animFrame = 0;
		}
		
		// draw all the things
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var y = 0; y < 480/32; y++) {
		if (y < map.tiles.length) {
			for (var x = 0; x < 640/32; x++) {
			if (x < map.tiles[y].length) {
				var tile = map.tiles[y][x];
				context.drawImage(tileset, tile.x*32, tile.y*32, 32, 32, x*32, y*32, 32, 32);
			}
			}
		}
		}

		var pList = Object.keys(players);
		var drawOrder = sortCharacters();
		for (var i = 0; i < drawOrder.length; i++) {
			var index = drawOrder[i];
			
			if (index == -1) {
				context.drawImage(characterSprite, Math.floor(player.animFrame)*32, player.direction*48, 32, 48, Math.floor(player.x*32), Math.floor(player.y*32-32), 32, 48);
			} else {
				var obj = players[pList[index]];
				context.drawImage(npcSprite, Math.floor(obj.animFrame)*32, obj.direction*48, 32, 48, Math.floor(obj.x*32), Math.floor(obj.y*32-32), 32, 48);
			}
		}
		
		
	}
	
	// emit all the things
	emitCount -= 1;
	if (emitCount <= 0) {
		emitCount = emitInterval;
		
		socket.emit('update', player);
	}
	
	// update
	setTimeout(updateCanvas, 1000/30);
}

var sortCharacters = function() {
	var list = [-1];
	var playerNames = Object.keys(players);
	
	for (var i = 0; i < playerNames.length; i++) {
		for (var ii = 0; ii <= list.length; ii++) {
			if (ii == list.length) {
				list.push(i);
				break;
			} else {
				var index = list[ii];
				
				var other;
				if (index == -1) {
					other = player;
				} else {
					other = players[playerNames[index]];
				}
				
				if (players[playerNames[i]].y < other.y) {
					list.splice(ii, 0, i);
					break;
				}
			}
		}
	}
	
	return list;
}

// input stuff
var keycodes = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	w: 87,
	a: 65,
	s: 83,
	d: 68
};
var keyNames = [];
var keycodeValues = [];

var keysdown = {};

var setupInput = function() {
	keyNames = Object.keys(keycodes);
	for (var i = 0; i < keyNames.length; i++) {
		keysdown[keyNames[i]] = false;
		
		keycodeValues.push(keycodes[keyNames[i]]);
	}

	window.addEventListener('keydown', function(e) {
		var k = e.keyCode;
		
		var index = keycodeValues.indexOf(k);
		if (index > -1) {
			e.preventDefault();
			
			keysdown[keyNames[index]] = true;
		}
	});
	
	window.addEventListener('keyup', function(e) {
		var k = e.keyCode;
		
		var index = keycodeValues.indexOf(k);
		if (index > -1) {
			e.preventDefault();
			
			keysdown[keyNames[index]] = false;
		}
	});
}

// init
window.onload = function() {
	setupInput();
	setupCanvas();
	setupSocket();
	
	updateCanvas();
}