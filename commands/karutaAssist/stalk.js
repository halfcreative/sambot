const { MessageEmbed } = require("discord.js");

module.exports = async function stalk(client, msg, splitMessage) {
    if (splitMessage[1]) {
        console.log(splitMessage[1]);
        console.log(msg);
        console.log(client);
        let user = await client.users.fetch(splitMessage[1]);


        const stalkReport = new MessageEmbed();
        stalkReport.setTitle(`Stalking Report`);
        console.log(user);
        stalkReport.setDescription(`Stalking report for ${splitMessage[1]} (${user})`);
        let FetchedUser = await user.fetch();
        console.log(FetchedUser);
        stalkReport.addField(`Username`, FetchedUser.username);
        stalkReport.addField(`Discriminator`, FetchedUser.discriminator);
        stalkReport.addField(`Full Tag`, FetchedUser.tag);
        stalkReport.addField(`Locale`, FetchedUser.locale);

        stalkReport.setThumbnail(FetchedUser.displayAvatarURL());

        msg.channel.send(stalkReport);

        // let x = await msg.channel.users.fetch(splitMessage[1]);
        // console.log(x);
        // msg.channel.send(`${splitMessage[1]} belongs to user ${x}`);
    } else {
        msg.channel.send(`${msg.author}, pass an ID like: .stalk ${msg.author.id}`);
    }
}
