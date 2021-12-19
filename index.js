//#region Essentials and Imports
//#region Discord Essentials
//Essentials
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Files and config
const { token } = require('./Config/DiscToken.json');
const DSettings = require('./Config/DSettings.json');
const DCData = require('./Data/DiscCommands.json'); //Discord Command Data

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
const yts = require('yt-search');
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
        status: DSettings.dstatus,
        activity: {
            name: Versions.discbver,
            type: 'PLAYING',
        },
    });

    Load('Channel IDS');

    Log(`Logged in as ${client.user.tag}`, 0);

    RLCommands(rl, client);
});

client.on('message', async (message) => {
    if (!message.content.startsWith(DSettings.prefix) || message.author.bot) return;
    let args = message.content.substring(DSettings.prefix.length).split(" ");

    if(args[0] === DCData.Ping.name)
    {
        const calcping = new Discord.MessageEmbed()
        .setTitle('Calculando el ping del bot...');

        message.channel.send(calcping).then(resultMessage => {
            const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;

            const pingresult = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
            ).setColor('#008000');

            resultMessage.edit(pingresult);
        });
    }
    else if(args[0] === DCData.Music.cmd1)
    {
        //Now it doesn't crash, instead it only stops playing music lol, looking into it
        const vc = message.member.voice;

        if(!vc) return message.reply('Necesitas estar en un canal de voz');
        if(!args[1]) return message.reply('Necesitas proporcionar una URL o una palabra para buscar');

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        try {
            let connection = await vc.channel.join();
            const streamurl = ytdl(video.url, {filter: 'audioonly'});
            connection.play(streamurl);

            const MusicEmbed = new Discord.MessageEmbed()
            .setTitle(`Reproduciendo ${video.title}`)
            .setDescription(`${video.title}`)
            .setImage(`${video.thumbnail}`)

            message.channel.send(MusicEmbed);
        }
        catch (error) {
            Log(error, 2);
            return message.channel.send("Hubo un error intentando reproducir la cancion, error: " + error);
        }
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
});
client.login(token);