module.exports = function roll(msg, splitMessage) {
    console.log('msg', msg);

    msg.channel.send(`kv ${splitMessage[1]}`);

}