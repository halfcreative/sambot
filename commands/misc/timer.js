module.exports = function dtimer(msg, splitMessage, timers) {
    console.log("timers", timers);
    if (splitMessage[1] == parseInt(splitMessage[1])) {
        if (parseInt(splitMessage[1]) < 120) {
            let exitingTimers = timers.filter((timerOBJ) => { return timerOBJ.author == msg.author });
            if (exitingTimers.length > 0) {
                msg.channel.send(`${msg.author}, you already have a timer set removing existing timer`);
                clearTimeout(exitingTimers[0].timer);
                timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author.id);
            }
            let time = 1000 * 60 * parseInt(splitMessage[1]);
            msg.channel.send(`${msg.author}, setting timer for ${parseInt(splitMessage[1])} minutes.`);
            let x = setTimeout(function () { msg.channel.send(`${msg.author}, your custom timer is now complete!`); timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author.id) }, time);
            let timerObj = { author: msg.author.id, timer: x };
            timers.push(timerObj);
            msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
        } else {
            if (msg.author.username == "torinora") {
                msg.reply("Why are you like this?");
            }
            msg.channel.send(`${msg.author}, requested time is too long. The limit for the timer is 2 hours.`)
        }
    } else if (splitMessage[1] == 'short') {
        let exitingTimers = timers.filter(timerOBJ => timerOBJ.author == msg.author);
        if (exitingTimers.length > 0) {
            msg.channel.send(`${msg.author}, you already have a timer set removing existing timer`);
            clearTimeout(exitingTimers[0].timer);
            timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author);
        }
        let timex = 1000 * 60 * 10;
        let timey = 1000 * 60 * 5;
        msg.channel.send(`${msg.author}, setting timer for 10 minutes.`);
        let y = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. 5 minutes 'till last call.`); }, timey);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 5 minutes. Last call for a grab.`); timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author.id) }, timex);
        let timerObjx = { author: msg.author.id, timer: x };
        let timerObjy = { author: msg.author.id, timer: y };
        timers.push(timerObjx);
        timers.push(timerObjy);
        msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
    } else if (splitMessage[1] == "view") {
        msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
        for (let timer of timers) {
            msg.channel.send(`Timer for ${timer.author} : ${timer.timer.toString()}`);
        }
    } else if (splitMessage[1] == "clear") {
        let exitingTimers = timers.filter(timerOBJ => timerOBJ.author == msg.author);
        if (exitingTimers.length > 0) {
            msg.channel.send(`Clearing out timers for ${msg.author}`);
            for (let timer of exitingTimers) {
                clearTimeout(timer.timer);
            }
            timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author);
        } else {
            msg.channel.send(`${msg.author} has no running timers`);
        }
    } else if (!splitMessage[1]) {
        let exitingTimers = timers.filter((timerOBJ) => { return timerOBJ.author == msg.author });
        if (exitingTimers.length > 0) {
            msg.channel.send(`${msg.author}, you already have a timer set removing existing timer`);
            clearTimeout(exitingTimers[0].timer);
            timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author.id);
        }
        let timex = 1000 * 60 * 20;
        let timey = 1000 * 60 * 15;
        msg.channel.send(`${msg.author}, setting timer for 20 minutes.`);
        let y = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 15 minutes. 5 minutes 'till last call.`); }, timey);
        let x = setTimeout(function () { msg.channel.send(`${msg.author}, your drop is ready in 10 minutes. Last call for a grab.`); timers = timers.filter(timerOBJ => timerOBJ.author !== msg.author.id) }, timex);
        let timerObjx = { author: msg.author.id, timer: x };
        let timerObjy = { author: msg.author.id, timer: y };
        timers.push(timerObjx);
        timers.push(timerObjy);
        msg.channel.send(`Sambot is currently tracking ${timers.length} timers`);
    } else {
        msg.reply(':x: invalid input for .dtimer :x:');
    }
}