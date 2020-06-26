module.exports = (client, msg) => {
    // console.log(msg);
    if (!msg.author.bot) {
        console.log(msg.author.username);
        if (msg.content === 'ping') {
            msg.reply('pong');
        }
    }

}