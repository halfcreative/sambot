const { recordWork } = require("../../services/mongoService");

module.exports = async function reactToKaruta(msg) {
    let messageType = checkKarutaMessageType(msg);
    if (messageType == 1) {
        // console.log(`Number of subs ${serverNotificationSubscribers.length}`);
        // if (serverNotificationSubscribers.length > 0) {
        //     let string = '';
        //     for (const user of serverNotificationSubscribers) {
        //         string += `${user}, `
        //     }
        //     string += ` Karuta is dropping a server drop`;
        //     msg.channel.send(string);
        // }
    } else if (messageType == 2) {
        parseWorkMessage(msg);

    } else {

    }
}
function checkKarutaMessageType(msg) {
    let karutaMessage = 0;
    if (msg.content) {
        if (msg.content.split(' ')[0] == "I\'m") {
            karutaMessage = 1; // 1 = server drop
        }
    } else if (msg.embeds && msg.embeds[0]) {
        if (msg.embeds[0].title == "Work") {
            karutaMessage = 2; // 2 = work
        }
        // karutaMessage = 2; // 2 = work
    }
    return karutaMessage;
}

function parseWorkMessage(msg) {
    const regex = /([0-9])\w+/g;
    const regex2 = /\*\*([0-9])\w+\*\* power/g;
    let userId = msg.embeds[0].description.split(' ')[0].match(regex)[0];
    let powerGained = parseInt(msg.embeds[0].description.match(regex2)[0].match(regex)[0]);
    console.log("user", userId);
    console.log("powerGained", powerGained);
    recordWork(userId, powerGained);
}