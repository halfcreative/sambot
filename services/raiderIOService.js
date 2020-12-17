const fetch = require('node-fetch');

module.exports = function getCharacter() {
    fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=stormrage&name=pipopapo`).then(response => response.json()).then(json => console.log(json));
}
