const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URL;

module.exports = {

    currentAttackCycle: async function () {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let attackCycleNumber = 0;
        try {
            await client.connect();
            const collection = client.db("sambot").collection("clanRecord");
            const attackRecord = await collection.findOne({ 'clanRecordType': 'attack' });
            attackCycleNumber = attackRecord.attackCycle;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return attackCycleNumber;
    },


    clanAttack: async function () {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let result;
        try {
            await client.connect();
            const collection = client.db("sambot").collection("clanRecord");
            const attackRecord = await collection.findOne({ 'clanRecordType': 'attack' });
            const now = Date.now();
            // if (attackRecord.lastAttacked > (now - 1800000)) {
            //     console.log("attacking so soon?");
            //     // Working on a new attack cycle
            //     result = await collection.updateOne({ 'clanRecordType': 'attack' }, { $set: { lastAttacked: now } }, { upsert: true });
            // } else {
            console.log("normal attack")
            result = await collection.updateOne({ 'clanRecordType': 'attack' }, { $inc: { attackCycle: 1 }, $set: { lastAttacked: now } }, { upsert: true });
            // }
        } catch {

        } finally {
            client.close();
        }
        return result;
    },

    getMemberContributions: async function () {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let users = [];
        try {
            await client.connect();
            const collection = client.db("sambot").collection("clanRecord");
            users = await collection.find({ 'userId': { $exists: true } }).sort({ totalAddedPower: -1 }).toArray();
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return users;
    },

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
                if (attackRecord.attackCycle != user.attackCycle) {
                    console.log("new attack cycle");
                    // Working on a new attack cycle
                    if (user.lastWorked > (now - 39600000)) {
                        //last worked variable is less than 11 hours ago, must not have committed last work command.
                        console.log("working so soon?");
                        result = await collection.updateOne({ 'userId': userId }, { $inc: { runningTotalAllCycles: (power - user.lastAddedPower) }, $set: { totalAddedPower: power, lastWorked: now, lastAddedPower: power, attackCycle: attackRecord.attackCycle, workCount: 1 } }, { upsert: true });
                    } else {
                        console.log("normal work ");
                        result = await collection.updateOne({ 'userId': userId }, { $inc: { runningTotalAllCycles: power, workCountAllCycles: 1 }, $set: { totalAddedPower: power, lastWorked: now, lastAddedPower: power, attackCycle: attackRecord.attackCycle, workCount: 1 } }, { upsert: true });
                    }
                } else {
                    console.log("current attack cycle");
                    if (user.lastWorked > (now - 39600000)) {
                        //last worked variable is less than 11 hours ago, must not have committed last work command.
                        console.log("working so soon?");
                        result = await collection.updateOne({ 'userId': userId }, { $inc: { runningTotalAllCycles: (power - user.lastAddedPower), totalAddedPower: (power - user.lastAddedPower) }, $set: { lastWorked: now, lastAddedPower: power } }, { upsert: true });
                    } else {
                        console.log("normal work");
                        result = await collection.updateOne({ 'userId': userId }, { $inc: { runningTotalAllCycles: power, totalAddedPower: power, workCount: 1, workCountAllCycles: 1 }, $set: { lastWorked: now, lastAddedPower: power } }, { upsert: true });
                    }
                }
            } else {
                result = await collection.updateOne({ 'userId': userId }, { $inc: { runningTotalAllCycles: power, totalAddedPower: power, workCount: 1, workCountAllCycles: 1 }, $set: { lastWorked: now, lastAddedPower: power, workCount: 1, attackCycle: attackRecord.attackCycle } }, { upsert: true });
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

    viewChurch: async function () {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let users = [];
        try {
            await client.connect();
            const collection = client.db("sambot").collection("prayers");
            const tmpUsers = await collection.find({}).sort({ prayers: -1 }).toArray();
            users = tmpUsers;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return users;
    },

    setUserCharacter: async function (user, realmName, characterName) {
        console.log(user);
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const collection = client.db("sambot").collection("wowChar");
        const results = await collection.updateOne({ 'user': user.id }, { $set: { realm: realmName, character: characterName } }, { upsert: true });
        client.close();
    },

    getUserCharacter: async function (userId) {
        console.log('user', userId);
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let userChar;
        try {
            await client.connect();
            const collection = client.db("sambot").collection("wowChar");
            const result = await collection.findOne({ 'user': userId });
            userChar = result;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
        console.log('userChar', userChar);
        return userChar;
    },

}

function rankings(count) {
    if (count > 110000) {
        return 'God';
    } else if (count > 100000) {
        return 'Seraph'
    } else if (count > 90000) {
        return 'Cherub'
    } else if (count > 80000) {
        return 'Throne'
    } else if (count > 70000) {
        return 'Dominion';
    } else if (count > 60000) {
        return 'Virtue';
    } else if (count > 50000) {
        return 'Power';
    } else if (count > 40000) {
        return 'Principality';
    } else if (count > 30000) {
        return 'Archangel';
    } else if (count > 20000) {
        return 'Angel';
    } else if (count > 10000) {
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