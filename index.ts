//#region Imports
//fix this order or something lol
//#region Discord Imports
import Discord from 'discord.js';
var client:Discord.Client = new Discord.Client!;
import { token } from './src/Config/DiscToken.json';
import DiscordSettings from './src/Config/DiscordConfig.json';
//#endregion
//#region Import modules
import * as readline from 'readline';
import clc from 'cli-color';
//#endregion
//#region Terminal Essentials
//#region Essentials
import { Logger } from './src/Logger';
import Versions from './src/Data/Version.json';
//#endregion
//#region ReadLine Setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: clc.cyan("> ")
});
//#endregion
//#endregion
import {InitConsoleCommands} from './src/ConsoleHelper/Commands';
//#endregion

client.on('ready', () => {
    Logger(`Logged in as ${client.user?.tag}`, 0);
    client.user?.setPresence({ status: "dnd",
    activity: {
        name: Versions.DiscordBotVer
    }});
    InitConsoleCommands(client, rl);
});

client.login(token);