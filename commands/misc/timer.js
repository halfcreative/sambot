
var timers = [];
module.exports = function dtimer(msg, splitMessage) {
    if (splitMessage[1]) {
        msg.channel.send('clearing out timers');
        timers = timers.filter(timer => timer.author != 'me');
    } else {
        timers.push({ author: 'me', timer: "timer" });
        msg.channel.send('stored one timer.');
        msg.channel.send(`${timers.length}`);
    }
}