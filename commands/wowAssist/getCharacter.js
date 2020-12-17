const { MessageEmbed } = require('discord.js');
const getCharacter = require('../../services/raiderIOService');

module.exports = async function getWowCharacter(msg) {
    const characterJSON = await getCharacter();
    console.log(characterJSON);
    const messageEmbed = new MessageEmbed();
    messageEmbed.setTitle(`Character Details for ${characterJSON.name}`);
    messageEmbed.setImage('https://render-us.worldofwarcraft.com/character/stormrage/180/234904756-avatar.jpg?alt=wow/static/images/2d/avatar/37-0.jpg');
    messageEmbed.setDescription(`${characterJSON}`);
    msg.channel.send(messageEmbed);

}