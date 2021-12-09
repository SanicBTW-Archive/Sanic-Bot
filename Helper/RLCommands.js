//#region Imports
const Log = require('../Log/Log');
const Discord = require('discord.js');
const readline = require('readline');
const CMDSData = require('../Data/RLCommands.json'); //kind of useless or something, i think about doing cool stuff but i end up doing nothing xd
const StatusHelper = require('./StatusHelper');
const {ChannelIDSDataLIST} = require('./Lists');
//#endregion
//dumb shit, its funny how i added the name field instead of grabbing it from the main field that its literally the name of the command lol
//i dont know how to explain

/**
 * 
 * @param {readline.Interface} rl - Basically the main component of this
 * @param {Discord.Client} client - To access a bunch of stuff
 */
module.exports = (rl, client) => {
    rl.prompt();

    rl.on('line', (line) => {
        let args = line.split(" "); //it kinda works ig

        if(!args[0])
        {
            rl.prompt();
        }
        else if(args[0] === CMDSData.Ping.name)
        {
            Log(`Current bot ping is ${client.ws.ping}`, 0);
            rl.prompt();
        }
        else if(args[0] === CMDSData.Exit.name)
        {
            rl.close();
        }
        else if(args[0] === CMDSData.Status.name)
        {
            if(args[1] === CMDSData.Status.reqarg1)
            {
                StatusHelper(rl, client, "change");
            }
            else if(args[1] === CMDSData.Status.reqarg2)
            {
                StatusHelper(rl, client, "restore");
            }
            else if(!args[1])
            {
                Log("You must use '" + CMDSData.Status.reqarg1 + "' or '" + CMDSData.Status.reqarg2 + "' in order to use this command", 1);
                rl.prompt();
            }
        }
        else if(args[0] === CMDSData.Uptime.name)
        {

        }
        else if(args[0] === CMDSData.Help.name)
        {

        }
        else if(args[0] === CMDSData.Send.name)
        {
            client.channels.cache.get(ChannelIDSDataLIST[0].ChannelID).send("funciona supongo");
        }
    }).on('close', () => {
        client.destroy();
        process.exit(0);
    })
}