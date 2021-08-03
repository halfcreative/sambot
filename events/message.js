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
const getRaiderIO = require('../commands/wowAssist/getIO');
const getWowCharacter = require('../commands/wowAssist/getCharacter');
const setWowCharacter = require('../commands/wowAssist/setCharacter');
const nodeCheck = require('../commands/karutaAssist/nodeCheck');
const stalk = require('../commands/karutaAssist/stalk');


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
            case '.st':
            case '.stalk':
                stalk(client, msg, splitMessage);
                break;
            case '.char':
                getWowCharacter(msg, splitMessage);
                break;
            case '.io':
                getRaiderIO(msg, splitMessage);
                break;
            case '.setChar':
                setWowCharacter(msg, splitMessage);
                break;
            case '.roll':
                roll(msg, splitMessage);
                break;
            case '.ticker':
                ticker(msg, splitMessage);
                break;
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
                console.log("drop command");
                noBotCommandsInGeneral(msg);
                break;
            case '.deploySlashCommands':
                const data = {
                    name: 'tryme',
                    description: 'fuckin fight me bitch!',
                }
                console.log(msg.guild);
                console.log(client.guilds.cache.get('469682998619406353').command);
                const command = await client.guilds.cache.get('469682998619406353')?.commands.create(data);
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


