const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('añadir_canal')
        .setDescription('Añade un canal para usar en la terminal')
        .addChannelOption(option2 => option2.setName("channel").setDescription("El id del canal y el nombre").setRequired(true))
        .addStringOption(option => option.setName("custname").setDescription("El nombre custom del canal").setRequired(false)),
};