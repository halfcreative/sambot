const ticker = require('../commands/finance/ticker');
const roll = require('../commands/misc/roll');
const id = require('../commands/karutaAssist/id');
const timer = require('../commands/misc/timer');
const sub = require('../commands/karutaAssist/sub');


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
                break;
            case '.id':
                id(msg, splitMessage);
            case '.dtimer':
                timer(msg, splitMessage, isAdmin);
            case '.dsub':
                serverNotificationSubscribers = sub(serverNotificationSubscribers, msg, splitMessage, isAdmin);
            default:
                break;
        }
    } else {
        // Reactions to messages from bots
        // console.log(msg);
        let serverDrop = checkForServerDrop(msg);
        if (serverDrop) {
            console.log(`Number of subs ${serverNotificationSubscribers.length}`);
            if (serverNotificationSubscribers.length > 0) {
                let string = '';
                for (const user of serverNotificationSubscribers) {
                    string += `${user}, `
                }
                string += ` Karuta is dropping a server drop`;
                msg.channel.send(string);
            }
        } else {
            // msg.channel.send('No one to notify');
        }
    }
}

function checkForServerDrop(msg) {
    let serverDrop = false;
    if (msg.content) {
        console.log(msg.content.split(' ')[0]);
        if (msg.content.split(' ')[0] == "I\'m") {
            serverDrop = true;
        }
    }
    console.log(`Is this a server Drop?, ${serverDrop}`);
    return serverDrop;
}
