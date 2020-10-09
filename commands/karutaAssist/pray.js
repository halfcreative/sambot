const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    console.log(results);
    msg.channel.send('Praise Craig! Praise Brian!');
    msg.channel.send(`You are now devotion level ${results.prayers}`);
}