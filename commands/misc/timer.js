module.exports = function dtimer(msg, splitMessage) {
    const rng = seedrandom();
    if (splitMessage[1] == 'short') {
        let time = 1000 * 60 * 10;
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 5 minutes. Grab now while you can.`); }, time);
        msg.channel.send(`${msg.author}, your roll is : ${roll}/${splitMessage[1]}`);
    } else if (!splitMessage[1]) {
        let time = 1000 * 60 * 20;
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. Grab now while you can.`); }, time);
        msg.channel.send(`${msg.author}, your roll is : ${roll}/100`);
    } else {
        msg.reply(':x: invalid input for .dtimer :x:');
    }
}