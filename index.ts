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
import FunnyExec from './src/commands/Functions';
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

    FunnyExec(interaction.commandName, client, interaction, interaction, rl)
})

client.login(token);