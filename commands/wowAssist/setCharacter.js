import { MessageEmbed } from 'discord.js';
import { setUserCharacter } from '../../services/mongoService.js';

export default async function setWowCharacter(msg, splitMessage) {
    if (splitMessage[1] && splitMessage[2]) {
        setUserCharacter(msg.author, splitMessage[1], splitMessage[2]);
        msg.channel.send(`setting server to ${splitMessage[1]}, and character to ${splitMessage[2]}`)
    } else {
        msg.channel.send('Not Enough Parameters Passed : .setChar servername charactername');
    }
}