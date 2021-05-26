var MongoClient = require('mongodb').MongoClient;

const debug = true;
if (debug) console.log('--- DEBUG MODE ---');

class DefcommBD {
    
    /** Connection URI. Update 'username', 'password', and 'your-cluster-url' to reflect your cluster.
     *  @see MongoDB_Node_Driver https://docs.mongodb.com/ecosystem/drivers/node/
     */
    uri;
    /** The Mongo Client you will use to interact with your database
     * @see MongoClient https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html
     */
    client;

    constructor(){
        if(debug) console.log("constructor");
        this.init();
    }

    /** Send user message to database
     * @param {String} user Usename
     * @param {String} msg Text typed by this user
     */
    async send(user, msg) {
        if(debug) console.log("send");
        if(debug) console.log("user: " + user);
        if(debug) console.log("msg: " + msg);
        try {
            // Connect to the MongoDB cluster
            client.connect(() => {
                client.emit("send");
            });
            // insertOne document. Create a collection if not exists.
            client.on("send", () => {
                let newMsg = {
                    user: user,
                    msg: msg,
                    timestamp: Date.now()
                };
                let result = client.db("ChatDB").collection("Room").insertOne(newMsg);
                if (debug) console.log(`One document inserted with oid: ` + $(result.insertedId));
                client.emit("ends");
            });
        } catch (e) {
            console.error('Something get wrong!');
        } finally {
            client.on("ends", () => {
                client.close();
            });
        }
    }

    /** Get all data messages from the database */
    async getMessages() {
        console.log("getMessages")
        let result = await client.db("ChatDB").collection("Room").findOne({});
        console.log(result);
        // console.log(typeof (result));
        return result;
    }

    /** Initiliaze principal requirements for database connection */
    init() {
        this.uri = "mongodb+srv://cyohteam:developersjr2020@jslworks.hadha.mongodb.net/ChatDB?retryWrites=true&w=majority";
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

exports.module = DefcommBD;