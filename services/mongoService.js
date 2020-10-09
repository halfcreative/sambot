const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:sam@cluster0-ajadg.mongodb.net/rpg?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {

    pray: async function (user) {
        await client.connect();
        const collection = client.db("sambot").collection("prayers");
        const results = await collection.updateOne({ 'user': player.id }, { $inc: { prayers: 1 } });
        client.close();
        return results;
    },

}