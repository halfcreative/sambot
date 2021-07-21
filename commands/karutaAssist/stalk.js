const { MessageEmbed } = require("discord.js");

module.exports = async function stalk(client, msg, splitMessage) {
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log(msg);
        console.log(client);
        let user = await client.users.fetch(splitMessage[1]);


        const stalkReport = new MessageEmbed();
        stalkReport.setTitle(`Stalking Report for user with ID #${splitMessage[1]}`);
        stalkReport.setThumbnail(user.avatarURL)
        console.log(user);
        stalkReport.setDescription(`${user} is associated with user ${user.username}#${user.discriminator}`);
        let FetchedUser = await user.fetch();
        stalkReport.addField(`Fetched Object`, `${FetchedUser} is the fetched version of this object`);
        console.log(`${FetchedUser}`);
        msg.channel.send(stalkReport);

        // let x = await msg.channel.users.fetch(splitMessage[1]);
        // console.log(x);
        // msg.channel.send(`${splitMessage[1]} belongs to user ${x}`);
    } else {
        msg.channel.send(`${msg.author}, pass an ID like: .stalk ${msg.author.id}`);
    }
}
