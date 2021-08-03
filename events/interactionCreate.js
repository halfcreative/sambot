module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'tryMe') {
        await interaction.reply('later');
    }
}
