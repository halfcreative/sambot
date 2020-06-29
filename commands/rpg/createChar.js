const Character = require('../../models/rpgModels');
const mongoDB = require('../../services/mongoService');

module.exports = async function createChar(msg, splitMessage) {

    // Command should be 
    // .createChar Alan human 



    let character = new Character(msg.author);
    character.setName(splitMessage[1]);

    let char = await mongoDB.getChar(msg.author);
    console.log(char);
    if (char) {
        msg.channel.send('You already have a character');
        msg.channel.send(`character name : ${char.name}`);
    } else {
        console.log(character);
        await mongoDB.saveChar(msg.author, character).then(success => {
            msg.channel.send('Character Successfully Created!');
        }
        ).catch(err => {
            msg.channel.send('Failed to create new character');
        });
    }

}