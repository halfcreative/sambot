const ticker = require('../commands/finance/ticker');
const roll = require('../commands/misc/roll');
const id = require('../commands/karutaAssist/id');
const timer = require('../commands/misc/timer');
const sub = require('../commands/karutaAssist/sub');
const prayer = require('../commands/karutaAssist/pray');
const reactToKaruta = require('../commands/karutaAssist/reactToKaruta');
const clanAudit = require('../commands/karutaAssist/clanAudit');
const { viewChurch } = require('../services/mongoService');
const church = require('../commands/karutaAssist/church');
const noBotCommandsInGeneral = require('../commands/karutaAssist/noBotCommandsInGeneral');


var serverNotificationSubscribers = [];
module.exports = async (client, msg) => {
    // Check first if message is bot
    if (!msg.author.bot) {

        const adminUsers = ['104675306261991424'];
        const premiumUsers = ['273637618275713034'];

        const splitMessage = msg.content.split(' ');

        var isAdmin = adminUsers.includes(msg.author.id);
        var isPremium = premiumUsers.includes(msg.author.id);

        if (isAdmin) {
            //user is admin
            switch (splitMessage[0]) {
                case '.ping':
                    msg.reply('pong');
                    msg.reply('🙇');
                    break;
            }
        } else if (isPremium) {
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
                breakmodule.exports = function id(msg, splitMessage) {
                    if (splitMessage[1]) {
                        console.log(splitMessage[1]);
                        console.log('msg mentions', msg.mentions);
                        if (msg.mentions) {
                            if (msg.mentions.everyone) {
                                msg.channel.send(`Sam has forbidden me from checking the ID of everyone.`);
                            } else {
                                for (let user of msg.mentions.users) {
                                    msg.channel.send(`${user[1].username} has a user id of ${user[1].id}`);
                                }
                            }
                        }
                    } else {
                        msg.channel.send(`${msg.author}, your ID is : ${msg.author.id}`);
                    }
                }
            case '.id':
                id(msg, splitMessage);
                break;
            case '.dtimer':
                timer(msg, splitMessage, isAdmin);
                break;
            case '.pray':
                prayer(msg);
                break;
            case '.church':
                church(msg);
                break
            case '.audit':
                clanAudit(msg);
                break;
            case '.dsub':
                serverNotificationSubscribers = sub(serverNotificationSubscribers, msg, splitMessage, isAdmin);
                break;
            case 'kd':
            case 'kdrop':
            case 'k!drop':
                noBotCommandsInGeneral(msg);
                break;
            default:
                break;
        }
    } else {
        // Reactions to messages from bots
        // console.log(msg);
        reactToKaruta(msg);

    }
}


