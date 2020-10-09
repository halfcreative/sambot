const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:sam@cluster0.rhfb4.mongodb.net/sambot?retryWrites=true&w=majority";

module.exports = {

    pray: async function (user) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let prayers = null;
        const returnObj = {
            userPrayObj: null,
            success: false
        }
        try {
            await client.connect();
            const collection = client.db("sambot").collection("prayers");
            const userIsDevoted = await collection.findOne({ 'user': user.id });
            console.log(userIsDevoted);
            const now = Date.now();
            if (userIsDevoted?.lastPrayed < now + 60000) {
                returnObj.userPrayObj = userIsDevoted;
            } else {
                const results = await collection.updateOne({ 'user': user.id }, { $inc: { prayers: 1 }, $set: { lastPrayed: new Date().now() } }, { upsert: true });
                returnObj.userPrayObj = await collection.findOne({ 'user': user.id });
                returnObj.success = true;
            }
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
        return returnObj;
    },

}