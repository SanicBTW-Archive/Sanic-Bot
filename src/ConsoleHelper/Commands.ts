//#region Imports
import * as readline from 'readline';
import clc from 'cli-color';
import Discord from 'discord.js';

//#endregion

export function InitConsoleCommands(client:Discord.Client, rl:readline.Interface){
    rl.prompt();
}