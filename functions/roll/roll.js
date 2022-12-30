const seedrandom = require('seedrandom');
const axios = require('axios').default;

exports.handler = async (event) => {

    const body = JSON.parse(event.Records[0].Sns.Message);
    console.info("Event Body:", body);

    const minMax = {
        min: 0,
        max: 100
    }
    if (body.data.options) {
        console.info("Options", body.data.options);
        const max_value = body.data.options.filter(option => {
            return option.name === "max_value"
        })[0];
        if (max_value) {
            minMax.max = max_value?.value
        }
        const min_value = body.data.options.filter(option => {
            return option.name === "min_value"
        })[0];
        if (min_value) {
            minMax.min = min_value?.value
        }
    }

    console.info(`Generating a number between ${minMax.min} and ${minMax.max}`);
    const rng = seedrandom();
    // Explanation on this random : https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    const roll = Math.floor(rng() * (minMax.max - minMax.min + 1)) + minMax.min;

    const response = {
        "content": `Your roll is ${roll}/${minMax.max}`
    }

    await axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
        .then(function (response) {
            console.info("response:", response);
        })
        .catch(function (error) {
            console.error(error);
        });

}