module.exports = function dtimer(msg, splitMessage, timers) {
    if (splitMessage[1] == parseInt(splitMessage[1])) {
        if (parseInt(splitMessage[1]) < 120) {
            let time = 1000 * 60 * parseInt(splitMessage[1]);
            msg.channel.send(`${msg.author}, setting timer for ${parseInt(splitMessage[1])} minutes.`);
            let x = setTimeout(function () { msg.channel.send(`${msg.author}, your customer timer is now complete!`); }, time);
            timers.push(x);
            msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
        } else {
            if (msg.author.username == "torinora") {
                msg.reply("Why are you like this?");
            }
            msg.channel.send(`${msg.author}, requested time is too long. The limit for the timer is 2 hours.`)
        }
    } else if (splitMessage[1] == 'short') {
        let timex = 1000 * 60 * 10;
        let timey = 1000 * 60 * 5;
        msg.channel.send(`${msg.author}, setting timer for 10 minutes.`);
        let y = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. 5 minutes 'till last call.`); }, timey);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 5 minutes. Last call for a grab.`); }, timex);
        timers.push(x);
        timers.push(y);
        msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
    } else if (!splitMessage[1]) {
        let timex = 1000 * 60 * 20;
        let timey = 1000 * 60 * 15;
        msg.channel.send(`${msg.author}, setting timer for 20 minutes.`);
        let y = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 15 minutes. 5 minutes 'till last call.`); }, timey);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. Last call for a grab.`); }, timex);
        msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
    } else {
        msg.reply(':x: invalid input for .dtimer :x:');
    }
}