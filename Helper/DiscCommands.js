//#region Imports
const Discord = require('discord.js');
const Command = require('./Command');
const Readline = require('readline');
const DCData = require('../Data/DiscCommands.json'); //Discord Command Data
//#endregion

/**
 * 
 * @param {Discord.Client} client - Idk what to type here
 * @param {Readline.Interface} rl - Neither here
 */
module.exports = (client, rl) => {
    //Ping
    Command(client, DCData.Ping.name, rl, message => {
        const calcping = new Discord.MessageEmbed()
        .setTitle('Calculando el ping del bot...');

        message.reply({embeds: [calcping]}).then(resultMessage => {
            const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;

            const pingresult = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
            ).setColor('#008000');

            resultMessage.edit({ embeds: [pingresult]});
        });
    });

    //Play
    Command(client, DCData.Play.name, rl, message => {
        
    });
}