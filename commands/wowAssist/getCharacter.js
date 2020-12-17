const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');

module.exports = async function getWowCharacter(msg) {
    const characterJSON = await getCharacter();
    console.log(characterJSON);
    const messageEmbed = new MessageEmbed();
    messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
    messageEmbed.setImage('https://render-us.worldofwarcraft.com/character/stormrage/180/234904756-avatar.jpg?alt=wow/static/images/2d/avatar/37-0.jpg');
    let characterMessage = `${characterJSON.name}, the ${characterJSON.active_spec_name} ${characterJSON.class} \n`;
    for (const season of characterJSON.mythic_plus_scores_by_season) {
        characterMessage += `Mythic+ Season ${season.season.split('-')[2]} Scores : \n`;
        characterMessage += `All Specs : ${season.scores.all}\n`;
        if (season.scores.dps != 0) {
            characterMessage += `DPS Specs : ${season.scores.dps}\n`;
        }
        if (season.scores.tank != 0) {
            characterMessage += `Tank Specs : ${season.scores.tank}\n`;
        }
        if (season.scores.healer != 0) {
            characterMessage += `Healer Specs : ${season.scores.healer}\n`;
        }
    }
    characterMessage += ``;
    messageEmbed.setDescription(characterMessage);
    msg.channel.send(messageEmbed);

}