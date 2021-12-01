const Log = require('../Helper/Log');
const { debuglogs } = require('../Config/TerminalSettings.json');
const Discord = require('discord.js');

//Bro i have to improve the params thingy

/**
 * 
 * @param {any} channel - Has to be a list to access the necessary items
 * @param {String} message - What do you want to send
 * @param {Discord.Client} client - To get the cache thingy
 */
module.exports = (channel, message, client) => {
    if(debuglogs.state == "Enabled"){
        Log("Channel ID Chosen: " + channel, 2);
        Log("Chosen Channel ID Length: " + channel.length, 2);
    }

    if(channel.length == 18){
        client.channels.cache.get(channel).send(message);
    } else {
        Log("Couldn't find a Channel ID on that list number", 3);
    }
}