const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = (process.env.PORT || 5000);
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/test', (req, res) => {
    res.json({'answer': "API working!"});
});

app.get('*', (req, res) => {
    console.log("redirecting to react...")
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

io.on('connection', socket => {
    var newUser = true;
    socket.on('add user', username => {
        if(!newUser) return;
        newUser = false;
        console.log("Client connected!");

        // TODO: request username
        //socket.username = username;

        socket.broadcast.emit('user joined', {
            username: socket.username,
        });
    });
    socket.on('message', message => {
        //console.log("recebi message: ");
        //console.log(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('reveal', p => {
        //console.log("revealing " + p.cardId + " on seed " + p.seed);
        socket.broadcast.emit('reveal', p);
    })
    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on ${port}`));