//#region Imports
import Discord, { Intents } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
var client:Discord.Client = new Discord.Client({intents: Intents.FLAGS.GUILDS})!;
import { token } from './src/Config/Secrets.json';
import DiscordSettings from './src/Config/DiscordConfig.json';
import { Refresh } from './src/SlashReg';
import * as readline from 'readline';
import { Logger } from './src/Logger';
import Versions from './src/Data/Version.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
import {InitConsoleCommands} from './src/TerminalHelper/Commands';
import {InitFunctions} from './src/TerminalHelper/ConfigFunctions';
import {ReturnDiscordStatus} from './src/Returner';
//#endregion

client.on('ready', async () => {
    await Refresh().then(async () => {
        await InitFunctions().then(() => {
            Logger(`Logged in as ${client.user?.tag}`, 'INFO');
            var funny = ReturnDiscordStatus(); //it gets the status from the discord config json file
            client.user?.setPresence({
                activities: [{
                    name: Versions.DiscordBotVer
                }], status: funny
            })
            InitConsoleCommands(client, rl);
        })    
    })
});

client.on('interactionCreate', async(interaction) => {
    if(!interaction.isCommand()) return;

    switch(interaction.commandName)
    {
        case "ping":
            const pingypingy:any = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
            ).setColor('#008000');
    
            await interaction.reply({embeds: [pingypingy], ephemeral:true})
    
            break;
        case "apagar":
            if(interaction.options.getBoolean("forzar", false) == true){ //if the option is true
                if(interaction.memberPermissions?.has("ADMINISTRATOR")){
                    Logger("The following user is forcing the bot shutdown: " + interaction.user.tag, "INFO");
                    const funnyembed = new Discord.MessageEmbed()
                    .setDescription("Forzando el apagado del bot");

                    interaction.reply({embeds: [funnyembed]}).then((funny) => {
                        Logger("Shutting down the bot in 20s", "INFO");
                        setTimeout(function(){rl.close()}, 20000);
                    })
                } else {
                    Logger("The following user tried to shutdown the bot: " + interaction.user.tag, "INFO");
                    interaction.reply("No tienes permiso para apagar el bot");
                }
            } else {
                interaction.reply("xd");
            }
            break;
    }
})

client.login(token);