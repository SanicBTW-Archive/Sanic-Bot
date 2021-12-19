//#region Essentials and Imports
//#region Discord Essentials
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Voice = require('@discordjs/voice');
const { token } = require('./Config/DiscToken.json');
const DSettings = require('./Config/DSettings.json');
const DiscCommands = require('./Helper/DiscCommands');
//#endregion
//#region Import Modules
const fs = require('fs');
const clc = require('cli-color');
const readline = require('readline');
//#endregion
//#region Terminal Essentials
//#region Essentials
const Log = require('./Log/Log');
const Versions = require('./Data/Versions.json');
const Load = require('./Helper/Load');
const {ChannelIDSData, ChannelIDSDataLIST} = require('./Helper/Lists');
//#endregion
const RLCommands = require('./Helper/RLCommands');
//#endregion
//#region Readline setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: clc.cyan("> ")
});
//#endregion
//#endregion

client.on('ready', () => {
    client.user.setPresence({
        activities: [{
            name: Versions.discbver
        }], status: DSettings.dstatus
    });

    Load('Channel IDS');

    Log(`Logged in as ${client.user.tag}`, 0);

    RLCommands(rl, client);

    DiscCommands(client, rl);
});

/*
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(DSettings.prefix) || message.author.bot) return;
    let args = message.content.substring(DSettings.prefix.length).split(" ");

    if(args[0] === "ping")
    {

    }
    else if(args[0] === "play")
    {

    }
    else if(args[0] === "stop")
    {

    }
    else if(args[0] === "apagar")
    {

    }
    else if(args[0] === "preguntar consola")
    {

    }
    else if(args[0] === "purge")
    {

    }
    else if(args[0] === "add channelid")
    {

    }
    else if(args[0] === "repetir")
    {

    }
    else if(args[0] === "channelid")
    {

    }
})*/

client.login(token);