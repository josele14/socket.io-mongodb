const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var mysql = require('mysql');
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;

/* MySQL */
// Credentials
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatdb"
});

// Connect to database
con.connect(function (err) {
    if (err) throw err; // If not connects, throw error
});

/* ROUTES */
app.get("/", (req, res) => {
    res.render("index", {});
});
app.get("/chat", (req, res) => {
    res.render("chat", { username: req.query.username, room: req.query.room });
});
app.get("/camera", (req, res) => {
    res.render("camera", { username: req.query.username, room: req.query.room });
});
app.get("/send", (req, res) => {
    console.log('Receive AJAX petition from ' + req.query.username);
    let room = parseInt(req.query.room.slice(5, 6), 10);
    let user = req.query.username;
    let msg = req.query.msg
    var sql = "INSERT INTO room (room, user, msg) VALUES (" +
        room + ", '" + user + "', '" + msg + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("<OK> msg from " + user + " inserted into room " + room);
    });
    res.send({ username: user, room: room, msg: msg });
});

/* SOCKET CONNECTIONS */
io.on("connection", socket => {
    /* Joining room event */
    socket.on("Join room", data => {
        let msg = data.user + " enters into room" + data.room;
        console.log(msg)
        socket.join(data.room); // Join selected room
        io.to(data.room).emit("srv message", { user: '', msg: msg });
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