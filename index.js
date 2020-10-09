require("dotenv").config();
const fs = require('fs');
const Discord = require("discord.js");
const express = require("express");
const client = new Discord.Client();
const wakeupService = require("./services/wakeupService"); // my module!


const PORT = 3000; // whatever port you like
const DYNO_URL = "https://sambot0036.herokuapp.com"; // the url of your dyno

const app = express(); // instantiate Express app

app.listen(PORT, () => {
    wakewakeUpDyno(DYNO_URL);
})
fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

client.login(process.env.BOT_TOKEN);

