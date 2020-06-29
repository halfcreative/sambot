const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:sam@cluster0-ajadg.mongodb.net/rpg?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {

    saveChar: async function (player, character) {
        await client.connect();
        const collection = client.db("rpg").collection("character");
        await collection.updateOne({ 'player': player.id }, { $set: { name: character.getName() } }, { upsert: true });
        client.close();
    },
    getChar: async function (player) {
        await client.connect();
        const collection = client.db("rpg").collection("character");
        const character = await collection.findOne({ player: player.id });
        // perform actions on the collection object
        client.close();
        return character;
    }
}