const Log = require('../Log/Log');
const Discord = require('discord.js');
const readline = require('readline');

/**
 * 
 * @param {readline.Interface} rl - Main component, for questions mainly
 * @param {Discord.Client} client - To change status thingy
 * @param {String} whattodo - Operation to realize, Change or Restore
 */
module.exports = (rl, client, whattodo) => {
    if(whattodo == "change")
    {
        rl.question("Change activity name to ", (newpresencename) => {
            if(newpresencename.length > 0)
            {
                rl.question("Change the status to: (online, idle, dnd) ", (newpresencestatus) => {
                    if(newpresencestatus == "online" || newpresencestatus == "idle" || newpresencestatus == "dnd")
                    {
                        client.user.setPresence({
                            activities: [{
                                name: newpresencename
                            }], status: newpresencestatus
                        });
                        Log("New activity name: " + newpresencename, 4);
                        Log("New status: " + newpresencestatus, 4);
                        rl.prompt();
                    }
                })
            }
        })
    }
    else if (whattodo == "restore")
    {
        Log("wip", 0);
    }
}