const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const database = require('./DefcommBD');
app.set('view engine', 'pug');
let port = process.env.PORT || 3100;
var MongoClient = require('mongodb').MongoClient;

/** Connection URI. Update 'username', 'password', and 'your-cluster-url' to reflect your cluster.
 *  @see MongoDB_Node_Driver https://docs.mongodb.com/ecosystem/drivers/node/
 */
const uri = "mongodb+srv://cyohteam:developersjr2020@jslworks.hadha.mongodb.net/ChatDB?retryWrites=true&w=majority";

/** The Mongo Client you will use to interact with your database
 * @see MongoClient https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html
 */
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const debug = true;
if (debug) console.log('--- DEBUG MODE ---');

//////////////////////////////////////////////////////////

/** Send user message to database
 * @param {String} user Usename
 * @param {String} msg Text typed by this user
 */
await function send(user, msg) {
    if(debug) console.log("send");
    if(debug) console.log("user: " + user);
    if(debug) console.log("msg: " + msg);
    try {
        // Connect to the MongoDB cluster
        await client.connect(() => {
            client.emit("send");
        });
        // insertOne document. Create a collection if not exists.
        client.on("send", () => {
            let newMsg = {
                user: user,
                msg: msg,
                timestamp: Date.now()
            };
            let result = await client.db("ChatDB").collection("Room").insertOne(newMsg);
            if (debug) console.log(`One document inserted with oid: ` + $(result.insertedId));
            client.emit("ends");
        });
    } catch (e) {
        console.error('Something get wrong!');
    } finally {
        console.log("getMessages");
        client.on("ends", () => {
            client.close();
        });
    }
}

/** Get all data messages from the database */
async function getMessages() {
    let result = await client.db("ChatDB").collection("Room").findOne({});
    console.log(result);
    // console.log(typeof (result));
    return result;
}
socket.on("srv message", data => {
    this.send(data.user,data.msg);
}).bind(this);

http.listen(port, () => {
    console.log(`Listening on ${port}`);
});