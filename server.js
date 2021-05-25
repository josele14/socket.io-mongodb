const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;

const users = new Array();

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.render("index", {});
});

app.get("/chat", (req, res) => {
    users.push({ "username": req.query.username });
    // res.sendFile(__dirname + "/chat.html");
    res.render("chat", { username: req.query.username });
});

io.on("connection", socket => {
    // const sessionID = socket.id;
    // console.log(`New user ${sessionID} connected`);
    socket.on("New user", user => {
        console.log(user + " has connected");
        let msg = user + " ENTERS INTO THE ROOM";
        io.emit("srv message", {user: '', msg: msg});
    });
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
    socket.on("user message", data => {
        io.emit("srv message", {user: data.user, msg: data.msg });
    });
});



http.listen(port, () => {
    console.log(`Listening on ${port}`);
});