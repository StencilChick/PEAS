"use strict";

var canvas;
var context;

var colour = 'green';

var map = {tiles: []};
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
		
		console.log(x + ', ' + y);
		map.tiles[y][x] = {colour: colour};
	});
	
	// buttons
	document.getElementById('outputMap').addEventListener('click', function(e) {
		e.preventDefault();
		
		document.getElementById('output').innerHTML = JSON.stringify(map);
	});
	
	document.getElementById('grass').addEventListener('click', function(e) {
		e.preventDefault();
		colour = 'forestgreen';
	});
	document.getElementById('path').addEventListener('click', function(e) {
		e.preventDefault();
		colour = 'blanchedalmond';
	});
}

var updateCanvas = function() {
	for (var y = 0; y < 480/32; y++) {
		for (var x = 0; x < 640/32; x++) {
			if (map.tiles[y][x] != undefined) {
				context.fillStyle = map.tiles[y][x].colour;
				context.fillRect(x*32, y*32, 32, 32);
			}
		}
	}

	setTimeout(updateCanvas, 1000/30);
}

window.onload = function() {
	canvas = document.getElementById('view');
	context = canvas.getContext('2d');
	setupMap();

	setupInput();
	updateCanvas();
}