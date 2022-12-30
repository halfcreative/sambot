require('dotenv').config()
const axios = require('axios').default;


const GUILDS = process.env.GUILD_IDS.split(',');


for (let guild of GUILDS) {
    const url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${guild}/commands`

    const headers = {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`,
        "Content-Type": "application/json"
    }

    const command_data = {
        "name": "roll",
        "type": 1,
        "description": "Generates a random number",
        "options": [
            {
                name: "max_value",
                description: "The maximum value you can role, inclusive.",
                type: 4,
                required: false,
            },
            {
                name: "min_value",
                description: "The minimum value you can role, inclusive.",
                type: 4,
                required: false,
            }
        ]
    }

    axios.post(url, JSON.stringify(command_data), {
        headers: headers,
    });
}