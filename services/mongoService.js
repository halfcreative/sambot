const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;

module.exports = {

    recordWork: async function (userId, power) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let result;
        try {
            await client.connect();
            const collection = client.db("sambot").collection("clanRecord");
            const attackRecord = await collection.findOne({ 'clanRecordType': 'attack' });
            const user = await collection.findOne({ 'userId': userId });
            const now = Date.now();
            if (user) {
                if (user.lastWorked > (now - 39600000)) {
                    //last worked variable is less than 11 hours ago, must not have committed last work command.
                    console.log("working so soon?");
                } else {
                    console.log("normal work");

                }
            } else {
                result = await collection.updateOne({ 'userId': userId }, { $inc: { totalAddedPower: power }, $set: { lastWorked: now, lastAddedPower: power } }, { upsert: true });
            }
        } catch {

        } finally {
            client.close();
        }
        return result;
    },
    pray: async function (user) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let prayers = null;
        const returnObj = {
            userPrayObj: null,
            rankUpgrade: false,
            success: false
        }
        try {
            await client.connect();
            const collection = client.db("sambot").collection("prayers");
            const userIsDevoted = await collection.findOne({ 'user': user.id });
            const now = Date.now();
            if (userIsDevoted && userIsDevoted.lastPrayed > (now - 300000)) {
                returnObj.userPrayObj = userIsDevoted;
            } else {
                if (userIsDevoted) {
                    const results = await collection.updateOne({ 'user': user.id }, { $inc: { prayers: 1 }, $set: { lastPrayed: now, rank: rankings((userIsDevoted.prayers + 1)) } }, { upsert: true });
                } else {
                    const results = await collection.updateOne({ 'user': user.id }, { $inc: { prayers: 1 }, $set: { lastPrayed: now, rank: rankings(1) } }, { upsert: true });
                }
                returnObj.userPrayObj = await collection.findOne({ 'user': user.id });
                if (userIsDevoted.rank != returnObj.userPrayObj.rank) {
                    returnObj.rankUpgrade = true;
                }
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

function rankings(count) {
    if (count > 20000) {
        return 'God';
    } else if (count > 7500) {
        return 'Pope';
    } else if (count > 5000) {
        return 'Cardinal';
    } else if (count > 2500) {
        return 'Archbishop';
    } else if (count > 1250) {
        return 'Bishop';
    } else if (count > 750) {
        return 'High Priest';
    } else if (count > 500) {
        return 'Low Priest';
    } else if (count > 250) {
        return 'Devotee';
    } else if (count > 125) {
        return 'Follower';
    } else if (count > 50) {
        return 'Peasant';
    } else {
        return 'Heathen';
    }

}