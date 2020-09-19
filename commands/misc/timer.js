
var timers = [];
module.exports = function dtimer(msg, splitMessage, isAdmin) {
    if (splitMessage[1]) {
        if (splitMessage[1] == parseInt(splitMessage[1])) {
            // User input a number as a parameter

        } else {
            switch (splitMessage[1]) {
                case 'clear':
                    msg.channel.send('clearing out timers');
                    timers = timers.filter(timer => timer.author != msg.author.id);
                    break;
                case 'view':
                    if (isAdmin) {

                    }
                    break;
            }
        }
    } else {
        let timeout = setTimeout(function () { msg.channel.send(`${msg.author}, your timer is ready `); }, 1000);
        timers.push({ author: msg.author.id, timer: timeout });
        msg.channel.send(`${timers.length}`);
    }
}