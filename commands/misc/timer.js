
var timers = [];
module.exports = function dtimer(msg, splitMessage, isAdmin) {
    let userTimers = timersForAuthor(msg.author.id);
    if (splitMessage[1]) {
        if (splitMessage[1] == parseInt(splitMessage[1])) {
            // User input a number as a parameter

        } else {
            switch (splitMessage[1]) {
                case 'clear':
                    msg.channel.send('clearing out timers');
                    clearTimers(msg, msg.author.id);
                    // timers = timers.filter(timer => timer.author != msg.author.id);
                    break;
                case 'view':

                    if (isAdmin) {
                        msg.channel.send(`There are ${timers.length} timers in the timer array`);
                    } else {


                    }
                    break;
            }
        }
    } else {
        if (userTimers[0]) {
            msg.channel.send(`You already have a timer set. Overwriting existing timer.`);
            clearTimers(msg.author.id);
        }
        let timeNow = new Date();
        let lastCallReminder = {
            timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 15 minutes. Last call to grab a card.`); }, 5000),
            dateSet: timeNow,
            dateEnd: timeNow + 5000
        }
        let cutOffReminder = {
            timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 10 minutes. Avoid grabbing anything unless necessary.`); clearTimers(msg, msg.author.id); }, 10000),
            dateSet: timeNow,
            dateEnd: timeNow + 10000
        }
        let timer = {
            author: { id: msg.author.id, name: msg.author.username },
            reminders: [lastCallReminder, cutOffReminder],
        }

        timers.push({ author: { id: msg.author.id, name: msg.author.username }, timer: timer });
        msg.channel.send(`Timer has been set. You will recieve 2 reminders. A 'last call' reminder in 15 minutes, and a 'cutoff' reminder in 20.`);
    }
}

function timersForAuthor(id) {
    return timers.filter(timer => timer.author.id == id);
}

function clearTimers(msg, id) {
    let timer = timersForAuthor(id);
    if (timer.length > 0) {
        for (const reminder of timer[0].reminders) {
            clearTimeout(reminder.timeout);
        }
        timers = timers.filter(timer => timer.author.id != id)
    }
    msg.channel.send(`No timers found for ${msg.author}`);
}