module.exports = (client, msg) => {
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
        const data = {
            name: 'ping',
            description: 'Replies with Pong!',
        };

        const command = await client.guilds.cache.get('469682998619406353')?.commands.create(data);
        console.log(command);
    }
}
