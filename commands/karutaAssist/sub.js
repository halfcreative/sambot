module.exports = function subscribeToServerDrops(currentSubscribers, msg, splitmsg, admin) {
    let updatedSubscribers = currentSubscribers;

    if (splitmsg[1]) {
        switch (splitmsg[1]) {
            case 'unsub':
            case 'break':
                msg.channel.send(`Unsubscribing from server drop notifications`);
                updatedSubscribers = currentSubscribers()
                break;
            case 'view':
                if (admin) {
                    msg.channel.send(`Current subscriber count is ${updatedSubscribers.length}`);
                    msg.channel.send(`Current subscriber list :`);
                    for (const subber of updatedSubscribers) {
                        msg.channel.send(` - ${subber.username}`);
                    }
                } else {
                    msg.channel.send(`You do not have permissions for that command`);
                }
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