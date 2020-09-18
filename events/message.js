const ticker = require('../commands/finance/ticker');
const roll = require('../commands/misc/roll');
const dtimer = require('../commands/misc/timer');

module.exports = async (client, timers, msg) => {
    // Check first if message is bot
    if (!msg.author.bot) {

        const adminUsers = ['104675306261991424'];
        const premiumUsers = ['273637618275713034'];

        const splitMessage = msg.content.split(' ');

        if (adminUsers.includes(msg.author.id)) {
            //user is admin
            switch (splitMessage[0]) {
                case '.ping':
                    msg.reply('pong');
                    msg.reply('🙇');
                    break;
            }
        } else if (premiumUsers.includes(msg.author.id)) {
            //user is premium
            switch (splitMessage[0]) {
                case '.ping':
                    if (msg.author.id == "273637618275713034") {
                        msg.reply('owo *notices ping*');
                    }
                    break;
            }
        }
        // General Commands
        switch (splitMessage[0]) {
            case '.roll':
                roll(msg, splitMessage);
                break;
            case '.ticker':
                ticker(msg, splitMessage);
                break;
            default:
                break;
        }

    } else {
        // Reactions to messages from bots
        // console.log(msg);
    }
}
