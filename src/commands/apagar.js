const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apagar')
        .setDescription('Apagar el bot')
        .addBooleanOption(option => option.setName("forzar").setDescription('Forzar el apagado')),
};