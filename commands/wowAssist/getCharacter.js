const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');

module.exports = function getWowCharacter(msg) {
    const characterJSON = getCharacter();
    console.log(characterJSON);
    const messageEmbed = new MessageEmbed();
    messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
    messageEmbed.setDescription(`${characterJSON}`);

}