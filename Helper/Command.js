const { prefix } = require('../Config/DSettings.json');
const Discord = require('discord.js');
const Log = require('../Log/Log');
const Readline = require('readline');

/**
 * 
 * @param {Discord.Client} client - To get the on messageCreate event
 * @param {String} aliases - The command name
 * @param {Readline.Interface} rl - To prompt back after printing the debug thingy
 * @param {any} callback - Callback
 */
module.exports = (client, aliases, rl, callback ) => {
    if(typeof aliases === 'string'){
        aliases = [aliases];
    }

    client.on('messageCreate', (message) => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`;

            if(content.startsWith(`${command}`) || content === command){
                Log(`Executing the command ${command}`, 3);
                callback(message);
                rl.prompt();
            }
        })
    });
}