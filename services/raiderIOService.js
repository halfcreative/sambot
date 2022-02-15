import fetch from 'node-fetch';

module.exports = {
    getIO(realm, name) {
        return fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${name}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks%2Cmythic_plus_best_runs%2Cmythic_plus_recent_runs%2Cgear`).then(response => response.json());
    },
    getCharacter(realm, name) {
        return fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${name}&fields=gear%2Ccovenant%2Cguild`).then(response => response.json());
    }

}
