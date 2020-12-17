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
    characterMessage += ``;
    messageEmbed.setDescription(characterMessage);
    msg.channel.send(messageEmbed);

}