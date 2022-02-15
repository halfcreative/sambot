const { MessageEmbed } = require('discord.js');
const { getUserCharacter } = require("../../services/mongoService.js");
const { getIO } = require("../../services/raiderIOService.js");

export default async function getRaiderIO(msg, splitMessage) {
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
        const characterJSON = await getIO(userChar.realm, userChar.character);
        console.log(characterJSON);
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle(`Raider IO Details for ${characterJSON.name}`);
        messageEmbed.setThumbnail(`${characterJSON.thumbnail_url}`);
        let characterMessage = `${characterJSON.name}, the ${characterJSON.active_spec_name} ${characterJSON.class} \n`;
        characterMessage += `ilvl : ${characterJSON.gear.item_level_equipped}`;
        messageEmbed.setDescription(characterMessage);
        messageEmbed.addField('Current World Ranks', '\u200B')
        messageEmbed.addField('Overall', characterJSON.mythic_plus_ranks.overall.world, true);
        if (characterJSON.active_spec_role === 'HEALING') {
            messageEmbed.addField('Healers (All)', characterJSON.mythic_plus_ranks.healer.world, true);
            messageEmbed.addField(`Healers (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_healer.world, true);
        } else if (characterJSON.active_spec_role === 'TANK') {
            messageEmbed.addField('Tanks (All)', characterJSON.mythic_plus_ranks.tank.world, true);
            messageEmbed.addField(`Healers (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_tank.world, true);
        } else if (characterJSON.active_spec_role === 'DPS') {
            messageEmbed.addField('DPS (All)', characterJSON.mythic_plus_ranks.dps.world, true);
            messageEmbed.addField(`Healers (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_dps.world, true);
        }
        messageEmbed.addField('Current Region Ranks', '\u200B')
        messageEmbed.addField('Overall', characterJSON.mythic_plus_ranks.overall.region, true);
        if (characterJSON.active_spec_role === 'HEALING') {
            messageEmbed.addField('Healers (All)', characterJSON.mythic_plus_ranks.healer.region, true);
            messageEmbed.addField(`Healers (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_healer.region, true);
        } else if (characterJSON.active_spec_role === 'TANK') {
            messageEmbed.addField('Tanks (All)', characterJSON.mythic_plus_ranks.tank.region, true);
            messageEmbed.addField(`Tanks (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_tank.region, true);
        } else if (characterJSON.active_spec_role === 'DPS') {
            messageEmbed.addField('DPS (All)', characterJSON.mythic_plus_ranks.dps.region, true);
            messageEmbed.addField(`DPS (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_dps.region, true);
        }
        messageEmbed.addField('Current Realm Ranks', '\u200B')
        messageEmbed.addField('Overall', characterJSON.mythic_plus_ranks.overall.realm, true);
        if (characterJSON.active_spec_role === 'HEALING') {
            messageEmbed.addField('Healers (All)', characterJSON.mythic_plus_ranks.healer.realm, true);
            messageEmbed.addField(`Healers (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_healer.realm, true);
        } else if (characterJSON.active_spec_role === 'TANK') {
            messageEmbed.addField('Tanks (All)', characterJSON.mythic_plus_ranks.tank.realm, true);
            messageEmbed.addField(`Tanks (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_tank.realm, true);
        } else if (characterJSON.active_spec_role === 'DPS') {
            messageEmbed.addField('DPS (All)', characterJSON.mythic_plus_ranks.dps.realm, true);
            messageEmbed.addField(`DPS (${characterJSON.class})`, characterJSON.mythic_plus_ranks.class_dps.realm, true);
        }
        for (const season of characterJSON.mythic_plus_scores_by_season) {
            messageEmbed.addField(`Mythic+ Season ${season.season.split('-')[2]} Scores :`, '\u200B', false);
            messageEmbed.addField(`All Specs M+ Score:`, `${season.scores.all}`, true);
            if (season.scores.dps != 0) {
                messageEmbed.addField(`DPS Specs:`, `${season.scores.dps}`, true);
            }
            if (season.scores.tank != 0) {
                messageEmbed.addField(`Tank Specs:`, `${season.scores.tank}`, true);
            }
            if (season.scores.healer != 0) {
                messageEmbed.addField(`Healer Specs:`, `${season.scores.healer}`, true);
            }
        }
        messageEmbed.addField(`Highest Runs In Current Season: `, '\u200B', false);
        let dungeonNames = '';
        let levels = '';
        let scores = '';
        for (const dungeon of characterJSON.mythic_plus_best_runs) {
            dungeonNames += `${dungeon.short_name}\n`;
            levels += `${dungeon.mythic_level}\n`;
            scores += `${dungeon.score}\n`;
        }
        messageEmbed.addFields(
            { name: 'Dungeon', value: dungeonNames, inline: true },
            { name: 'Levels', value: levels, inline: true },
            { name: 'Scores', value: scores, inline: true }
        )
        messageEmbed.setFooter(`${characterJSON.profile_url}`)
        msg.channel.send(messageEmbed);
    } else {
        msg.channel.send(" User does not have a character set, please run ```.setChar server character```");
    }


}