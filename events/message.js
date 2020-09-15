const ticker = require('../commands/finance/ticker');
const roll = require('../commands/misc/roll');
const createChar = require('../commands/rpg/createChar');
const dtimer = require('../commands/misc/timer');

module.exports = async (client, timers, msg) => {
    // Check first if message is bot
    if (!msg.author.bot) {
        // Reactions to messages from humans
        // Check next if the message is from me
        const splitMessage = msg.content.split(' ');
        switch (msg.author.username) {
            case "Halfcreative":
                // Commands for myself
                if (msg.content.startsWith('.viewAvatar')) {
                    console.log(msg.mentions.members);
                    const mention = msg.mentions.members.first();
                    msg.reply(mention.user.displayAvatarURL());
                } else if (msg.content === '.ping') {
                    msg.reply('pong');
                    msg.reply('🙇');
                }
            default:
                // Commands for all users
                switch (splitMessage[0]) {
                    case '.roll':
                        roll(msg, splitMessage);
                        break;
                    case '.ticker':
                        ticker(msg, splitMessage);
                        break;
                    case '.dtimer':
                        dtimer(msg, splitMessage, timers);
                        break;
                    case '.ping':
                        if (msg.author.username == "torinora") {
                            msg.reply('owo *notices ping*');
                        }
                    default:
                        // console.log(msg);
                        // console.log(splitMessage);
                        break;
                }
                break;
        }
    } else {
        // Reactions to messages from bots
        // console.log(msg);
    }
}
