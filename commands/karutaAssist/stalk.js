module.exports = function stalk(msg, splitMessage) {
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log('msg mentions', msg.mentions);
        let x = await msg.channel.users.fetch(splitMessage[1]);
        console.log(x);
        msg.channel.send(`${splitMessage[1]} belongs to user ${x}`);
    } else {
        msg.channel.send(`${msg.author}, pass an ID like: .stalk ${msg.author.id}`);
    }
}
