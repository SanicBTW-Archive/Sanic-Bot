//#region Imports
import * as readline from 'readline';
import clc from 'cli-color';
import Discord from 'discord.js';
import { Logger } from '../Logger';
//#endregion
//#region what
var prompt:boolean = false;
//#endregion

export function InitConsoleCommands(client:Discord.Client, rl:readline.Interface, Channels:any[]){
    rl.prompt();
    
    rl.on('line', (line) => {
        let args = line.split(" ");

        switch(args[0])
        {
            case "channel":
                Logger(Channels, "DEBUG");
                //0 is the custom name or the original name
                //1 is the channel id
                Logger(`${Channels[1]}`, "DEBUG");
                Logger(`${Channels[2]}`, "DEBUG");
                break;
            case "exit":
                rl.close();
                break;
        }
        rl.prompt();
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Terminating process", 'WARNING');
        process.exit();
    })
}