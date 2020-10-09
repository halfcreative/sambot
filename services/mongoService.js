const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:sam@cluster0.rhfb4.mongodb.net/sambot?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {

    pray: async function (user) {
        let results = null;
        try {
            await client.connect();
            const collection = client.db("sambot").collection("prayers");
            results = await collection.updateOne({ 'user': user.id }, { $inc: { prayers: 1 } }, { upsert: true });
            console.log(results);
        } catch (e) {
            console.log(e);
        } finally {

            client.close();
        }
        return results;
    },

}