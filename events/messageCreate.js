module.exports = async (client, message) => {
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
        const data = {
            name: 'tryme',
            description: 'fuckin fight me bitch!',
        };

        const command = await client.guilds.cache.get('469682998619406353')?.commands.create(data);
        console.log(command);
    }
}
