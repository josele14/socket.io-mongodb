const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const database = require('./DefcommBD');
app.set('view engine', 'pug');
let port = process.env.PORT || 3000;

// console.log(database);

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
        // database.send(data.user,data.msg);
        // Send data to database script
        $.ajax({
            url: 'localhost:3100',
            type: 'POST',
            data: {user: data.user, msg: data.msg },
            dataType: 'application/json; charset=utf-8',
            success: function(result){
            console.log('Ajax success transfer');
          },
          error: function(result){
            console.error('Ajax fail transfer');
          }
        });
    });
});

http.listen(port, () => {
    console.log(`Listening on ${port}`);
});