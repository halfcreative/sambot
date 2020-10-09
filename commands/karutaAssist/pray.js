const { pray } = require("../../services/mongoService");

module.exports = function prayer(msg) {
    let results = pray(msg.auther);
    console.log(results);
    msg.channel.send('Praise Craig! Praise Brian!');
}