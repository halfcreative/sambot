const fetchUrl = require("fetch").fetchUrl;

module.exports = function getCharacter() {
    fetchUrl(`https://raider.io/api/v1/characters/profile?region=us&realm=stormrage&name=pipopapo`).then(response => {
        console.log(response);
    })
}
