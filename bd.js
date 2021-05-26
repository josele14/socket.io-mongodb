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
        client.on("ends", () => {
            client.close();
        });
    }
}

/** Get all data messages from the database */
async function getMessagesFrom() {
    let result = await client.db("ChatDB").collection("Room").findOne({});
    console.log(result);
    // console.log(typeof (result));
    return result;
}

exports.module = { send: send(user, msg), getMessagesFrom: getMessagesFrom() };