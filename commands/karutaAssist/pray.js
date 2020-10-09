const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    if (results.success) {
        msg.channel.send('Praise Craig! Praise Brian!');
        msg.channel.send(`You are now devotion level ${results.userPrayObj.prayers}`);
    } else {
        msg.channel.send(`You're praying too much, try again later`);
    }
}