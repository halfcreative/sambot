const { MessageEmbed } = require("discord.js");

module.exports = async function stalk(client, msg, splitMessage) {
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log(msg);
        console.log(client);
        console.log((client.users.fetch(splitMessage[1])));
        console.log("getting user");
        let x = await client.users.fetch(splitMessage[1]);
        console.log(x);
        console.log("send");


        const stalkReport = new MessageEmbed();
        stalkReport.setTitle(`Stalking Report for user with ID (${splitMessage[1]})`);
        stalkReport.setThumbnail(x.displayAvatarUrl);
        stalkReport.setDescription(`${splitMessage[1]} is associated with user ${x.username}#${x.discriminator}`)
        msg.channel.send(stalkReport);

        // let x = await msg.channel.users.fetch(splitMessage[1]);
        // console.log(x);
        // msg.channel.send(`${splitMessage[1]} belongs to user ${x}`);
    } else {
        msg.channel.send(`${msg.author}, pass an ID like: .stalk ${msg.author.id}`);
    }
}
