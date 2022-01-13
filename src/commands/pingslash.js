const {SlashCommandBuilder} = require('@discordjs/builders');

const data = new SlashCommandBuilder().setName('ping').setDescription("Returns the bot ping also useful to check if bots working or not");