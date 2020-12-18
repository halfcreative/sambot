const fetch = require('node-fetch');

module.exports = function getIO(realm, name) {
    return fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${name}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks%2Cmythic_plus_highest_level_runs%2Cmythic_plus_recent_runs%2Cgear`).then(response => response.json());
}
module.exports = function getIO(realm, name) {
    return fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${name}&fields=gear%2Ccovenant%2Cguild`).then(response => response.json());
}
