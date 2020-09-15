module.exports = function dtimer(msg, splitMessage) {
    const rng = seedrandom();
    if (splitMessage[1] == parseInt(splitMessage[1])) {
        let time = 1000 * 60 * parseInt(splitMessage[1]);
        msg.channel.send(`${msg.author}, setting timer for ${parseInt(splitMessage[1])} minutes.`);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 5 minutes. Grab now while you can.`); }, time);
    } else if (splitMessage[1] == 'short') {
        let time = 1000 * 60 * 10;
        msg.channel.send(`${msg.author}, setting timer for 10 minutes.`);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 5 minutes. Grab now while you can.`); }, time);
    } else if (!splitMessage[1]) {
        let time = 1000 * 60 * 20;
        msg.channel.send(`${msg.author}, setting timer for 20 minutes.`);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. Grab now while you can.`); }, time);
    } else {
        msg.reply(':x: invalid input for .dtimer :x:');
    }
}