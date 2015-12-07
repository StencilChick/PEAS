var configureSockets = function(io) {
	io.sockets.on('connection', function(socket) {
		socket.join('map0');
		
		socket.on('update', function(data) {
			socket.broadcast.to('map0').emit('update', data);
		});
		
		socket.on('disconnect', function(socket) {
			socket.leave('map0');
		});
	});
};
module.exports.configureSockets = configureSockets;