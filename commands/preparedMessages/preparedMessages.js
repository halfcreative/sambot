const { MessageAttachment } = require("discord.js");

module.exports = function noBotCommands(msg) {
    const attachment = new MessageAttachment('https://media1.tenor.com/images/69d1f3a27cb2dc1fcf0f39dd2e4fe641/tenor.gif?itemid=18284220');
    msg.channel.send(attachment);
}