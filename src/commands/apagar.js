const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apagar')
        .setDescription('Apagar el bot')
        .addBooleanOption(option => option.setName("forzar").setDescription('Forzar el apagado')),
        //addBooleanOption(input => input.setName("Forzar").setDescription("Forzar apagado del bot sin pedir permiso a la terminal"))
};