const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    console.log(results);
    msg.channel.send('Praise Craig! Praise Brian!');
    msg.channel.send(`You have prayed ${results.prayers}`)
}