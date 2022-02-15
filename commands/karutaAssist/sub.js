
export function subscribeToServerDrops(currentSubscribers, msg, splitmsg, admin) {
    let updatedSubscribers = currentSubscribers;

    // if (splitmsg[1]) {
    //     switch (splitmsg[1]) {
    //         case 'unsub':
    //         case 'break':
    //             msg.channel.send(`Unsubscribing from server drop notifications`);
    //             updatedSubscribers = currentSubscribers.filter(subscriber => subscriber.id != msg.author.id);
    //             break;
    //         case 'view':
    //             if (admin) {
    //                 msg.channel.send(`Current subscriber count is ${updatedSubscribers.length}`);
    //                 const subscribersList = new MessageEmbed();
    //                 subscribersList.setTitle('Current Subscriber List');
    //                 let list = '';
    //                 for (const subber of updatedSubscribers) {
    //                     list += `- ${subber.username} \n`;
    //                 }
    //                 subscribersList.setDescription(list);
    //                 msg.channel.send(subscribersList);
    //             } else {
    //                 msg.channel.send(`You do not have permissions for that command`);
    //             }
    //             break;
    //         default:
    //             msg.channel.send(`Invalid arguements for command dsub`)
    //             break;
    //     }
    // } else {
    //     const subbed = checkForUser(updatedSubscribers, msg.author);
    //     if (subbed) {
    //         msg.channel.send(`${msg.author}, you are already subscribed to server drops.`);
    //     } else {
    //         updatedSubscribers.push(msg.author);
    //         msg.channel.send(`${msg.author}, you are now subscribed to server drops.`);
    //     }
    // }

    return updatedSubscribers;
}

function checkForUser(array, user) {
    const subbedArray = array.filter(subscriber => subscriber.id == user.id);
    return subbedArray.length > 0;
}