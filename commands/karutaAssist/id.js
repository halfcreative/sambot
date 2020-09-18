module.exports = function roll(msg, splitMessage) {
    console.log('msg', msg);
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log('msg mentions', msg.mentions);
        if (msg.mentions) {
            if (msg.mentions.everyone) {
                msg.channel.send(`Sam has forbidden me from checking the ID of everyone.`);
            } else {
                for (let user of msg.mentions.users) {
                    console.log(user);
                    msg.channel.send(`${user.userName} has a user id of ${user.id}`);
                }
            }
        }
    } else {
        msg.channel.send(`${msg.author}, your ID is : ${msg.author.id}`);
    }
}