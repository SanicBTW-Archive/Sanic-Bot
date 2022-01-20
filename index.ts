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
import {ReturnDiscordStatus, ShutDownType} from './src/Returner';
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
        case "apagar": //idk if it fully works or something, ok it doesnt work funny check not working and stuff
            var state:ShutDownType = "None";

            if(interaction.options.getBoolean("forzar", false) == true){ //if the option is true
                if(interaction.memberPermissions?.has("ADMINISTRATOR")){
                    Logger("The following user is forcing the bot shutdown: " + interaction.user.tag, "INFO");
                    const funnyembed = new Discord.MessageEmbed()
                    .setDescription("Forzando el apagado del bot");

                    interaction.reply({embeds: [funnyembed]}).then((funny) => {
                        state = "Forced";
                        Logger("Shutting down the bot in 20s", "INFO");
                        setTimeout(function(){rl.close()}, 20000);
                    })
                } else {
                    Logger("The following user tried to shutdown the bot: " + interaction.user.tag, "INFO");
                    interaction.reply("No tienes permiso para apagar el bot");
                }
            } else {
                const sentfunnyembed = new Discord.MessageEmbed()
                .setDescription('Una confirmación para apagar el bot ue enviada a la terminal, esperando a la respuesta');

                const shutdownconfirmed = new Discord.MessageEmbed()
                .setDescription('El apagado fue confirmado por la terminal')
                .setColor('#008000');

                const shutdowndenied = new Discord.MessageEmbed()
                .setDescription('El apagado ha sido rechazado por la terminal')
                .setColor('#FF0000');

                const alreadyaskin = new Discord.MessageEmbed()
                .setDescription("Ya hay una persona que esta solicitando el apagado");

                const shutforced = new Discord.MessageEmbed()
                .setDescription("Hay un apagado en marcha (Forzado)");

                if(state == "None" || state != "Forced"){
                    interaction.reply({embeds: [sentfunnyembed]}).then(() => {
                        state = "Asking For It";
                        Logger("The following user wants to shutdown the bot: " + interaction.user.tag, "INFO");
                        rl.question('Do you want to shutdown the bot? (y/n)', (conf) => {
                            switch(conf)
                            {
                                case "y":
                                    interaction.editReply({embeds: [shutdownconfirmed]}).then(() => {
                                        Logger("Shutting down due to confirming shutdown", "DEBUG");
                                        rl.close();
                                    })
                                    break;
                                default:
                                    interaction.editReply({embeds: [shutdowndenied]}).then(() => {
                                        state = "Denied";
                                        rl.prompt();
                                    })
                                    break;
                            }
                        })
                    })
                } else if (state == "Asking For It" || state != "Forced"){
                    interaction.reply({embeds: [alreadyaskin]});
                } else if (state == "Forced"){
                    interaction.reply({embeds: [shutforced]});
                }
            }
            break;
    }
})

client.login(token);