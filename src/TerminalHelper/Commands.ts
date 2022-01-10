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

        switch(args[0])
        {
            case "exit":
                rl.close();
                break;
            default:
                rl.prompt();
                break;
        }
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Finishing process", 'WARNING');
        process.exit();
    })
}