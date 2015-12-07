var users = {};


var configureSockets = function(io) {
	io.sockets.on('connection', function(socket) {
		// join
		socket.on('join', function(data) {
			socket.name = '' + Date.now() + Math.floor(Math.random() * 100);
			socket.lastData = data;
			socket.join('map0');
		
			socket.broadcast.to('map0').emit('join', formatData(socket, data));
			var uKeys = Object.keys(users);
			for (var i = 0; i < uKeys.length; i++) {
				var obj = users[uKeys[i]];
				
				socket.emit('join', formatData(obj, obj.lastData));
			}
			
			users[socket.name] = socket;
		});
		
		// update position
		socket.on('update', function(data) {
			if (data.date) {
				if (data.date < socket.lastData.date) return;
			}
			
			socket.lastData = data;
			socket.broadcast.to('map0').emit('update', formatData(socket, data));
		});
		
		// disconnect
		socket.on('disconnect', function() {
			socket.broadcast.to('map0').emit('leave', formatData(socket, {}));
			socket.leave('map0');
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