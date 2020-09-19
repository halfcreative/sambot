
var timers = [];
module.exports = function dtimer(msg, splitMessage, isAdmin) {
    let userTimers = timersForAuthor(msg.author.id);
    if (splitMessage[1]) {
        if (splitMessage[1] == parseInt(splitMessage[1])) {
            // User input a number as a parameter
            let minutes = parseInt(splitMessage[1])
            if (minutes > 120) {
                msg.channel.send(`Your input of ${splitMessage[1]} minutes exceeds the maximum time permitted (120 minutes).`);
            } else {
                if (userTimers[0]) {
                    msg.channel.send(`You already have a timer set. Overwriting existing timer.`);
                    clearTimers(msg, msg.author.id);
                }
                let timeNow = new Date();
                const timerReminder = {
                    timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your custom timer is has completed.`); clearTimers(msg, msg.author.id); }, (minutes * 60 * 1000)),
                    dateSet: timeNow.toTimeString(),
                    dateEnd: new Date(timeNow.getTime() + (minutes * 60 * 1000))
                }
                const timer = {
                    author: { id: msg.author.id, name: msg.author.username },
                    reminders: [timerReminder],
                }
                timers.push(timer);
                msg.channel.send(`${msg.author}, setting 1 timer with a reminder in ${minutes} minutes.`);
            }
        } else {
            switch (splitMessage[1]) {
                case 'short':
                    if (userTimers[0]) {
                        msg.channel.send(`You already have a timer set. Overwriting existing timer.`);
                        clearTimers(msg, msg.author.id);
                    }
                    let timeNow = new Date();
                    const time1 = 5 * 1000 * 60;
                    const time2 = 10 * 1000 * 60;
                    const lastCallReminder = {
                        timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 10 minutes. Last call to grab a card.`); }, time1),
                        dateSet: timeNow,
                        dateEnd: new Date(timeNow.getTime() + time1)
                    }
                    const cutOffReminder = {
                        timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 5 minutes. Avoid grabbing anything unless necessary.`); clearTimers(msg, msg.author.id); }, time2),
                        dateSet: timeNow.toTimeString(),
                        dateEnd: new Date(timeNow.getTime() + time2)
                    }
                    const timer = {
                        author: { id: msg.author.id, name: msg.author.username },
                        reminders: [lastCallReminder, cutOffReminder],
                    }
                    timers.push(timer);
                    msg.channel.send(`Timer has been set. You will recieve 2 reminders. A 'last call' reminder in 15 minutes, and a 'cutoff' reminder in 20.`);
                    break;
                case 'clear':
                    msg.channel.send('clearing out timers');
                    clearTimers(msg, msg.author.id);
                    break;
                case 'view':
                    if (isAdmin) {
                        msg.channel.send(`There ${timers.length == 1 ? 'is' : 'are'} ${timers.length} timer${timers.length == 1 ? '' : 's'} in the timer array.`);
                        let notMyTimers = timers.filter(timer => timer.author.id != id);
                        for (const timer of notMyTimers) {
                            msg.channel.send(`1 timer for ${timer.author.username} with ${timer.reminders.length} reminder${timer.reminders.length == 1 ? '' : 's'}.`);
                        }
                    }
                    if (userTimers[0]) {
                        msg.channel.send(`${msg.author}, you have 1 timer set, with ${userTimers[0].reminders.length} reminders.`);
                        for (const reminder of userTimers[0].reminders) {
                            msg.channel.send(`1 reminder for ${reminder.dateEnd}.`);
                        }
                        let timeNow = new Date();
                        msg.channel.send(`The time now is ${timeNow}.`);
                    } else {
                        msg.channel.send(`${msg.author}, you have no timers set.`);
                    }
                    break;
            }
        }
    } else {
        if (userTimers[0]) {
            msg.channel.send(`You already have a timer set. Overwriting existing timer.`);
            clearTimers(msg, msg.author.id);
        }
        let timeNow = new Date();
        const time1 = 15 * 1000 * 60;
        const time2 = 20 * 1000 * 60;
        const lastCallReminder = {
            timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 15 minutes. Last call to grab a card.`); }, time1),
            dateSet: timeNow,
            dateEnd: new Date(timeNow.getTime() + time1)
        }
        const cutOffReminder = {
            timeout: setTimeout(function () { msg.channel.send(`${msg.author}, your drop will come up in 10 minutes. Avoid grabbing anything unless necessary.`); clearTimers(msg, msg.author.id); }, time2),
            dateSet: timeNow.toTimeString(),
            dateEnd: new Date(timeNow.getTime() + time2)
        }
        const timer = {
            author: { id: msg.author.id, name: msg.author.username },
            reminders: [lastCallReminder, cutOffReminder],
        }
        timers.push(timer);
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
    } else {
        msg.channel.send(`No timers found for ${msg.author}.`);
    }
}