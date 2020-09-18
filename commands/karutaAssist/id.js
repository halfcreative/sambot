module.exports = function roll(msg, splitMessage) {
    console.log('msg', msg);
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log('msg mentions', msg.mentions);
    } else {
        msg.channel.send(`${msg.author}, your ID is : ${msg.author.id}`);
    }
}