var maps = require('./maps');

var users = {};

var configureSockets = function(io) {
	io.sockets.on('connection', function(socket) {
		// join
		socket.on('join', function(data) {
			socket.name = '' + Date.now() + Math.floor(Math.random() * 100);
			socket.lastData = data;
			socket.join('map0');
			socket.currentRoom = 'map0';
			
			socket.emit('map', maps.map0);
		
			socket.broadcast.to('map0').emit('join', formatData(socket, data));
			var uKeys = Object.keys(users);
			for (var i = 0; i < uKeys.length; i++) {
				var obj = users[uKeys[i]];
				
				if (obj.currentRoom == socket.currentRoom) {
					socket.emit('join', formatData(obj, obj.lastData));
				}
			}
			
			users[socket.name] = socket;
		});
		
		// update position
		socket.on('update', function(data) {
			if (data.date) {
				if (data.date < socket.lastData.date) return;
			} else {
				data.date = Date.now();
			}
			
			socket.lastData = data;
			socket.broadcast.to(socket.currentRoom).emit('update', formatData(socket, data));
		});
		
		// move socket ot new map
		socket.on('transport', function(data) {
			socket.leave(socket.currentRoom);
			socket.broadcast.to(socket.currentRoom).emit('leave', formatData(socket, {}));
			
			var newPos = {x: 0, y: 0};
			if (data.direction == 'left') {
				newPos.x = 19;
				newPos.y = socket.lastData.y;
			} else if (data.direction == 'right') {
				newPos.x = 0;
				newPos.y = socket.lastData.y;
			}
			socket.emit('updatePos', newPos);
			
			socket.emit('map', maps[data.map]);
			socket.join(data.map);
			socket.currentRoom = data.map;
			
			socket.lastData.x = newPos.x;
			socket.lastData.y = newPos.y;
			socket.broadcast.to(socket.currentRoom).emit('join', formatData(socket, socket.lastData));
			var uKeys = Object.keys(users);
			for (var i = 0; i < uKeys.length; i++) {
				var obj = users[uKeys[i]];
				
				if (obj != socket && obj.currentRoom == socket.currentRoom) {
					socket.emit('join', formatData(obj, obj.lastData));
				}
			}
		});
		
		// disconnect
		socket.on('disconnect', function() {
			socket.broadcast.to(socket.currentRoom).emit('leave', formatData(socket, {}));
			socket.leave(socket.currentRoom);
			delete users[socket.name];
		});
	});
};
module.exports.configureSockets = configureSockets;


var formatData = function(socket, data) {
	var date;
	if (data.date) { date = data.date; }
	else { date = Date.now(); }
	
	return {player: socket.name, date: date, data: data};
};