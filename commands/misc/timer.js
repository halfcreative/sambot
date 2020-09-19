
var timers = [];
module.exports = function dtimer(msg, splitMessage, isAdmin) {
    if (splitMessage[1]) {
        if (splitMessage[1] == parseInt(splitMessage[1])) {
            // User input a number as a parameter

        } else {
            switch (splitMessage[1]) {
                case 'clear':
                    msg.channel.send('clearing out timers');
                    clearTimers(msg.author.id);
                    // timers = timers.filter(timer => timer.author != msg.author.id);
                    break;
                case 'view':
                    if (isAdmin) {
                    }
                    msg.channel.send(`There are ${timers.length} timers in the timer array`);
                    break;
            }
        }
    } else {
        let LastCallTimeout = setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 15 minutes. Last call to grab a card.`); }, 5000);
        let Timeout = setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 10 minutes. Avoid grabbing anything unless necessary.`); clearTimers(); }, 10000);
        timers.push({ author: msg.author.id, timer: Timeout });
        timers.push({ author: msg.author.id, timer: LastCallTimeout });
        msg.channel.send(`Setting 2 timers. You will recieve a 'last call' reminder in 15 minutes, and a 'cutoff' reminder in 20.`);
    }
}

function clearTimers(id) {
    timers = timers.filter(timer => timer.author != id)
}