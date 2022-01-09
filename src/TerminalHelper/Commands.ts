//#region Imports
import * as readline from 'readline';
import clc from 'cli-color';
import Discord from 'discord.js';
import { Logger } from '../Logger';

//#endregion

export function InitConsoleCommands(client:Discord.Client, rl:readline.Interface){
    rl.prompt();
    
    rl.on('line', (line) => {
        let args = line.split(" ");

        if(!args[0]) return rl.prompt();
        if(args[0] == "exit") return rl.close();
        if(args[0] == "settings") { }
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Finishing process", 'WARNING');
        process.exit();
    })
}