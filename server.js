const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;

/* ROUTES */
app.get("/", (req, res) => {
    res.render("index", {});
});
app.get("/chat", (req, res) => {
    res.render("chat", { username: req.query.username, room: req.query.room });
});

/* SOCKET CONNECTIONS */
io.on("connection", socket => {
    /* New user connection event */
    socket.on("New user", data => {
        console.log(data.user + " has connected");
        socket.join(data.room);
        let msg = data.user + " ENTERS INTO THE ROOM" + data.room;
        console.log(msg)
        io.emit("srv message", {user: '', msg: msg});
    });
    /* User disconnection event */
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
    /* User message event */
    socket.on("user message", data => {
        // Get room and send data       data.room -> recibir sala y gestionar la emisión de mensajes
        io.emit("srv message", {user: data.user, msg: data.msg }); // esto emite a todos
    });
});

/* SERVER LISTENING */
http.listen(port, () => {
    console.log(`Listening on ${port}`);
});