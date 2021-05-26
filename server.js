const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const DefcommDB = require('DefcommDB');
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;

const db = new DefcommDB();

console.log(db);

app.get("/", (req, res) => {
    res.render("index", {});
});

app.get("/chat", (req, res) => {
    // users.push({ "username": req.query.username });
    res.render("chat", { username: req.query.username });
});

io.on("connection", socket => {
    // New user connects
    socket.on("New user", user => {
        console.log(user + " has connected");
        let msg = user + " ENTERS INTO THE ROOM";
        io.emit("srv message", {user: '', msg: msg});
    });
    // Disconnects
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
    // User sent a message
    socket.on("user message", data => {
        io.emit("srv message", {user: data.user, msg: data.msg });
    });
});

http.listen(port, () => {
    console.log(`Listening on ${port}`);
});