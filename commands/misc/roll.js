const seedrandom = require('seedrandom');

module.exports = function roll(msg, splitMessage) {
    const rng = seedrandom();
    if (splitMessage[1] == parseInt(splitMessage[1])) {
        let roll = Math.ceil(rng() * parseInt(splitMessage[1]));
        msg.channel.send(`${msg.author}, your roll is : ${roll}/${splitMessage[1]}`);
    } else if (!splitMessage[1]) {
        let roll = Math.ceil(rng() * 100);
        msg.channel.send(`${msg.author}, your roll is : ${roll}/100`);
    } else {
        msg.reply(':x: invalid input for .roll :x:');
    }
}
