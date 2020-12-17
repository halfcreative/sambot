const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');
const { getUserCharacter } = require("../../services/mongoService");

module.exports = async function getWowCharacter(msg) {
    const userChar = await getUserCharacter(msg.author);
    const characterJSON = await getCharacter(userChar.realm, userChar.character);
    const messageEmbed = new MessageEmbed();
    messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
    messageEmbed.setThumbnail(`${characterJSON.thumbnail_url}`);
    let characterMessage = `${characterJSON.name}, the ${characterJSON.active_spec_name} ${characterJSON.class} \n`;
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
    messageEmbed.addField('Overall', characterJSON.mythic_plus_ranks.overall.region, true);
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
    for (const dungeon of characterJSON.mythic_plus_highest_level_runs) {
        dungeonNames += `${dungeon.short_name}\n`;
        levels += `${dungeon.mythic_level}\n`;
        scores += `${dungeon.score}\n`;
    }
    messageEmbed.addFields(
        { name: 'Dungeon', value: dungeonNames, inline: true },
        { name: 'Levels', value: levels, inline: true },
        { name: 'Scores', value: scores, inline: true }
    )
    messageEmbed.setFooter(`(Raider IO Profile)[${characterJSON.profile_url}]`)
    msg.channel.send(messageEmbed);

}