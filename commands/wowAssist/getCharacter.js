const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');
const { getUserCharacter } = require("../../services/mongoService");

module.exports = async function getWowCharacter(msg, splitMessage) {
    let userId;
    if (splitMessage[1]) {
        if (msg.mentions) {
            console.log(msg.mentions);
            if (msg.mentions.everyone) {
                msg.channel.send(`Sam has forbidden me from checking the IO of everyone.`);
            } else {
                if (msg.mentions.users.length > 1) {
                    msg.channel.send(`Sam has forbidden me from checking the ID of more than 1 person at a time.`);
                } else {
                    console.log(msg.mentions.users);
                    msg.mentions.users.map(mention => { userId = mention.id });
                }
            }
        }
    } else {
        userId = msg.author.id;
    }
    const userChar = await getUserCharacter(userId);
    if (userChar) {
        const characterJSON = await getCharacter(userChar.realm, userChar.character);
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
        messageEmbed.setThumbnail(`${characterJSON.thumbnail_url}`);
        let characterMessage = `${characterJSON.name}, the ${characterJSON.active_spec_name} ${characterJSON.class} \n`;
        messageEmbed.setDescription(characterMessage);
        messageEmbed.addField('Covenant', characterJSON.covenant.name, true);
        messageEmbed.addField('Renown', characterJSON.covenant.renown, true);
        messageEmbed.addField('iLvL', characterJSON.gear.item_level_equipped);
        messageEmbed.addFields(
            { name: 'Head', value: `**${characterJSON.gear.head.name}** (${characterJSON.gear.head.item_level}) `, inline: true },
            { name: 'Neck', value: `**${characterJSON.gear.neck.name}** (${characterJSON.gear.neck.item_level}) `, inline: true },
            { name: 'Shoulders', value: `**${characterJSON.gear.shoulder.name}** (${characterJSON.gear.shoulder.item_level}) `, inline: true },
            { name: 'Back', value: `**${characterJSON.gear.back.name}** (${characterJSON.gear.back.item_level}) `, inline: true },
            { name: 'Chest', value: `**${characterJSON.gear.chest.name}** (${characterJSON.gear.chest.item_level}) `, inline: true },
            { name: 'Waist', value: `**${characterJSON.gear.waist.name}** (${characterJSON.gear.waist.item_level}) `, inline: true },
            { name: 'Wrists', value: `**${characterJSON.gear.wrist.name}** (${characterJSON.gear.wrist.item_level}) `, inline: true },
            { name: 'Hands', value: `**${characterJSON.gear.hands.name}** (${characterJSON.gear.hands.item_level}) `, inline: true },
            { name: 'Legs', value: `**${characterJSON.gear.legs.name}** (${characterJSON.gear.legs.item_level}) `, inline: true },
            { name: 'Feet', value: `**${characterJSON.gear.feet.name}** (${characterJSON.gear.feet.item_level}) `, inline: true },
            { name: 'Finger 1', value: `**${characterJSON.gear.finger1.name}** (${characterJSON.gear.finger1.item_level}) `, inline: true },
            { name: 'Finger 2', value: `**${characterJSON.gear.finger2.name}** (${characterJSON.gear.finger2.item_level}) `, inline: true },
            { name: 'Trinket 1', value: `**${characterJSON.gear.trinket1.name}** (${characterJSON.gear.trinket1.item_level}) `, inline: true },
            { name: 'Trinket 2', value: `**${characterJSON.gear.trinket2.name}** (${characterJSON.gear.trinket2.item_level}) `, inline: true },
            { name: 'Mainhand', value: `**${characterJSON.gear.mainhand.name}** (${characterJSON.gear.mainhand.item_level}) `, inline: true }
        )
        if (characterJSON.gear.offhand) {
            messageEmbed.addField('Offhand', `**${characterJSON.gear.offhand.name}** (${characterJSON.gear.offhand.item_level}) `);
        }

        messageEmbed.setFooter(`${characterJSON.profile_url}`)
        msg.channel.send(messageEmbed);
    } else {
        msg.channel.send(" User does not have a character set, please run ```.setChar server character```");
    }


}