const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;
const mongoScript = require('./mongo')

/* ROUTES */
app.get("/", (req, res) => {
    res.render("index", {});
});
app.get("/chat", (req, res) => {
    res.render("chat", { username: req.query.username, room: req.query.room } );
});
app.get("/send", (req, res) => {
    res.send( {
        username: req.query.username,
        room: req.query.room, 
        msg: req.query.msg
    } );
});

/* SOCKET CONNECTIONS */
io.on("connection", socket => {
    /* Joining room event */
    socket.on("Join room", data => {
        let msg = data.user + " enters into room" + data.room;
        console.log(msg)
        socket.join(data.room); // Join selected room
        io.to(data.room).emit("srv message", {user: '', msg: msg});
    });
    /* User disconnection event */
    socket.on("disconnect", () => {
        // socket.leave(data.room); // Leave selected room
        console.log("A user has disconnected");
    });
    /* User room message event */
    socket.on("user message", data => {
        // Emits user message to his/her room
        io.to(data.room).emit("srv message", {
            user: data.user,
            msg: data.msg
        });
    });
});

/* SERVER LISTENING */
http.listen(port, () => {
    console.log(`Listening on ${port}`);
});