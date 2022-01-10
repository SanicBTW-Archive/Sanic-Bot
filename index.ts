//#region Imports
import Discord from 'discord.js';
var client:Discord.Client = new Discord.Client!;
import { token } from './src/Config/DiscToken.json';
import DiscordSettings from './src/Config/DiscordConfig.json';
import * as readline from 'readline';
import clc from 'cli-color';
import { Logger } from './src/Logger';
import Versions from './src/Data/Version.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: clc.cyan("> ")
});
import {InitConsoleCommands} from './src/TerminalHelper/Commands';
import {InitFunctions} from './src/TerminalHelper/ConfigFunctions';
//#endregion

client.on('ready', async () => {
    await InitFunctions().then(() => {
        Logger(`Logged in as ${client.user?.tag}`, 'INFO');
        client.user?.setPresence({ status: "dnd",
        activity: {
            name: Versions.DiscordBotVer
        }});
        InitConsoleCommands(client, rl);
    })
});

client.login(token);