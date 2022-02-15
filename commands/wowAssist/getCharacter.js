const { MessageEmbed } = require('discord.js');
const { getCharacter } = require('../../services/raiderIOService.js');
const { getUserCharacter } = require("../../services/mongoService.js");

export default async function getWowCharacter(msg, splitMessage) {
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
        console.log(characterJSON);
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
        messageEmbed.setThumbnail(`${characterJSON.thumbnail_url}`);
        let characterMessage = `${characterJSON.name}, the ${characterJSON.active_spec_name} ${characterJSON.class} \n`;
        messageEmbed.setDescription(characterMessage);
        messageEmbed.addField('Covenant', characterJSON.covenant.name, true);
        messageEmbed.addField('Renown', characterJSON.covenant.renown, true);
        messageEmbed.addField('iLvL', characterJSON.gear.item_level_equipped);
        messageEmbed.addFields(
            { name: 'Head', value: `**${characterJSON.gear.items.head.name}** (${characterJSON.gear.items.head.item_level}) `, inline: true },
            { name: 'Neck', value: `**${characterJSON.gear.items.neck.name}** (${characterJSON.gear.items.neck.item_level}) `, inline: true },
            { name: 'Shoulders', value: `**${characterJSON.gear.items.shoulder.name}** (${characterJSON.gear.items.shoulder.item_level}) `, inline: true },
            { name: 'Back', value: `**${characterJSON.gear.items.back.name}** (${characterJSON.gear.items.back.item_level}) `, inline: true },
            { name: 'Chest', value: `**${characterJSON.gear.items.chest.name}** (${characterJSON.gear.items.chest.item_level}) `, inline: true },
            { name: 'Waist', value: `**${characterJSON.gear.items.waist.name}** (${characterJSON.gear.items.waist.item_level}) `, inline: true },
            { name: 'Wrists', value: `**${characterJSON.gear.items.wrist.name}** (${characterJSON.gear.items.wrist.item_level}) `, inline: true },
            { name: 'Hands', value: `**${characterJSON.gear.items.hands.name}** (${characterJSON.gear.items.hands.item_level}) `, inline: true },
            { name: 'Legs', value: `**${characterJSON.gear.items.legs.name}** (${characterJSON.gear.items.legs.item_level}) `, inline: true },
            { name: 'Feet', value: `**${characterJSON.gear.items.feet.name}** (${characterJSON.gear.items.feet.item_level}) `, inline: true },
            { name: 'Finger 1', value: `**${characterJSON.gear.items.finger1.name}** (${characterJSON.gear.items.finger1.item_level}) `, inline: true },
            { name: 'Finger 2', value: `**${characterJSON.gear.items.finger2.name}** (${characterJSON.gear.items.finger2.item_level}) `, inline: true },
            { name: 'Trinket 1', value: `**${characterJSON.gear.items.trinket1.name}** (${characterJSON.gear.items.trinket1.item_level}) `, inline: true },
            { name: 'Trinket 2', value: `**${characterJSON.gear.items.trinket2.name}** (${characterJSON.gear.items.trinket2.item_level}) `, inline: true },
            { name: 'Mainhand', value: `**${characterJSON.gear.items.mainhand.name}** (${characterJSON.gear.items.mainhand.item_level}) `, inline: true }
        )
        if (characterJSON.gear.items.offhand) {
            messageEmbed.addField('Offhand', `**${characterJSON.gear.items.offhand.name}** (${characterJSON.gear.items.offhand.item_level}) `);
        }

        messageEmbed.setFooter(`${characterJSON.profile_url}`)
        msg.channel.send(messageEmbed);
    } else {
        msg.channel.send(" User does not have a character set, please run ```.setChar server character```");
    }


}