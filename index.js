const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const loginToken = "NzI2MDk5NTE3Mzg0MTYzNDA4.XvYXUg.eWhe-t-ffOFddxVCugnqHq6uvIQ";

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})


client.login(loginToken);