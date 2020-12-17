const { MessageAttachment } = require("discord.js");
const { noBotCommands } = require("../preparedMessages/preparedMessages");


module.exports = function noBotCommandsInGeneral(msg) {

    if (msg.channel.name != "anime-degens-nsfw") {
        noBotCommands(msg);
    }
}