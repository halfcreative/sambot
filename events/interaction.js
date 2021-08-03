module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'tryme') {
        await interaction.reply('later');
    }
}
