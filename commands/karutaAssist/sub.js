module.exports = function subscribeToServerDrops(currentSubscribers, msg, splitmsg) {
    let updatedSubscribers = currentSubscribers;

    if (splitmsg[1]) {
        switch (splitmsg[1]) {
            case 'unsub':
            case 'break':
                msg.channel.send(`Unsubscribing from server drop notifications`);
                updatedSubscribers = currentSubscribers()
                break;
            default:
                msg.channel.send(`Invalid arguements for command dsub`)
                break;
        }
    } else {
        let subbed = checkForUser(currentSubscribers, msg.author);
        if (subbed) {
            msg.channel.send(`${msg.author}, you are already subscribed to server drops.`);
        } else {
            updatedSubscribers.push(msg.author);
            msg.channel.send(`${msg.author}, you are now subscribed to server drops.`);
        }
    }

    return updatedSubscribers;
}

function checkForUser(array, user) {
    let subbedArray = array.filter(subscriber => subscriber.id == user.id);
    return subbedArray > 0;
}