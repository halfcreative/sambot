const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.auther);
    console.log(results);
    msg.channel.send('Praise Craig! Praise Brian!');
}