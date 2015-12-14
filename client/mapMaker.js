"use strict";

var canvas;
var context;

var form;

var tileset = new Image();
tileset.src = '/assets/img/tileset.png';

var mouseDown = 0;

//var map = {tiles: []};
var map = {
	"tiles": [[{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"4","y":"5","collider":true},{"x":"1","y":"5","collider":true},{"x":"1","y":"5","collider":true},{"x":"1","y":"5","collider":true},{"x":"3","y":"5","collider":true},{"x":"1","y":"6","collider":true},{"x":"2","y":"6","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"1","y":"6","collider":true},{"x":"2","y":"6","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"3","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"2","y":"4","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"4","y":"6","collider":true},{"x":"3","y":"6","collider":true},{"x":"2","y":"4","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"4","y":"6","collider":true},{"x":"1","y":"5","collider":true},{"x":"3","y":"5","collider":true},{"x":"2","y":"6","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"3","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"1","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"6","collider":true},{"x":"4","y":"5","collider":true},{"x":"3","y":"5","collider":true},{"x":"2","y":"6","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"6","collider":true},{"x":"2","y":"6","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"3","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"1","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"1","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"3","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"3","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"2","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"1","y":"3","collider":false},{"x":"2","y":"3","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"1","y":"4","collider":true}],[{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"1","y":"4","collider":true},{"x":"4","y":"6","collider":true},{"x":"1","y":"5","collider":true}],[{"x":"1","y":"4","collider":true},{"x":"2","y":"4","collider":true},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"2","collider":false},{"x":"2","y":"2","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"0","collider":false},{"x":"0","y":"4","collider":true},{"x":"4","y":"6","collider":true},{"x":"1","y":"5","collider":true},{"x":"1","y":"5","collider":true},{"x":"1","y":"5","collider":true}]],
	"left": "map0"
};
var setupMap = function() {
	for (var y = 0; y < 480/32; y++) {
		var row = [];
		for (var x = 0; x < 640/32; x++) {
			row.push(undefined);
		}
		map.tiles.push(row);
	}
}

var setupInput = function() {
	// canvas
	canvas.addEventListener('click', function(e) {
		e.preventDefault();
		
		var canvasRect = canvas.getBoundingClientRect();
		var x = Math.floor((e.pageX - canvasRect.left) / 32);
		var y = Math.floor((e.pageY - canvasRect.top) / 32);
		
		map.tiles[y][x] = {x: form['x'].value, y: form['y'].value, collider: form['collider'].checked};
	});
	
	// buttons
	document.getElementById('outputMap').addEventListener('click', function(e) {
		e.preventDefault();
		
		document.getElementById('output').innerHTML = JSON.stringify(map);
	});
}

var updateCanvas = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (var y = 0; y < 480/32; y++) {
		for (var x = 0; x < 640/32; x++) {
			if (map.tiles[y][x] != undefined) {
				var tile = map.tiles[y][x];
				context.drawImage(tileset, tile.x*32, tile.y*32, 32, 32, x*32, y*32, 32, 32);
				
				if (tile.collider) {
					context.fillStyle = 'rgba(255, 0, 0, 0.5)';
					context.fillRect(x*32, y*32, 32, 32);
				}
			}
		}
	}

	setTimeout(updateCanvas, 1000/30);
}

window.onload = function() {
	canvas = document.getElementById('view');
	context = canvas.getContext('2d');
	
	form = document.forms['tileForm'];
	
	setupMap();

	setupInput();
	updateCanvas();
}