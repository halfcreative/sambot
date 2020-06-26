const { MessageEmbed } = require('discord.js');
module.exports = (client, msg) => {
    // Check first if message is bot
    if (!msg.author.bot) {
        console.log(msg.author.username);
        // Check next if the message is from me
        if (msg.author.username === "Halfcreative") {
            console.log(msg.content);
            if (msg.content === ":person_bowing:") {
                console.log('bow');
                msg.reply(':person_bowing');
            }
            if (msg.content.startsWith('viewAvatar')) {
                console.log(msg.mentions.members);
                const mention = msg.mentions.members.first();
                msg.reply("as you wish, my master: " + mention.user.displayAvatarURL());
            }
            if (msg.content === 'ping') {
                msg.reply('pong');
                msg.reply('🙇');
            }

        } else {

        }
    } else {
        if (msg.author.username === "Karuta") {
            if (msg.content.endsWith("damaged")) {

            }
        }
    }

}