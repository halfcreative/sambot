const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');

module.exports = async function getWowCharacter(msg) {
    const characterJSON = await getCharacter();
    console.log(characterJSON);
    const messageEmbed = new MessageEmbed();
    messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
    messageEmbed.setDescription(`${characterJSON}`);
    msg.channel.send(messageEmbed);

}