let users = {}
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('getCourse', () => {
            io.sockets.emit('getCourse');
        });
        socket.on('updateHome', () => {
            io.sockets.emit('updateHome');
        });
        socket.on('connected', data => {
            socket.nickname = data;
            io.sockets.emit('getUsername', data);
            users[socket.nickname] = socket;
            console.log('User ' + data + ' Connected');
        });
        socket.on('getUsername', (data) => {
            io.sockets.emit('getUsername', data);
        });
    });
}