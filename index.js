import 'dotenv/config.js';
import fs from 'fs';
import Discord from 'discord.js';
import *  as events from './events/events.js';
const client = new Discord.Client();


fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        console.log("file", file)
        const eventName = file.split(".")[0]
        if (eventName != "events") {
            console.log(events[file.split(".")]);
            const eventHandler = events[file.split(".")[0]];
            client.on(eventName, (...args) => eventHandler(client, ...args))
        }
    })
})

client.login(process.env.BOT_TOKEN);

