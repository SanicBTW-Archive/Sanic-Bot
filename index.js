//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
//#endregion

//#region Config stuff and channel ids etc, i should really merge all together
const fs = require("fs");

const config = require('./Config/settings.json');

const inqquest = require('./Config/cmdessentials');
const { executedcmdslist, shutdownlistig, tempchannelids} = require('./Config/lists');

const spprchnlids = require('./Config/channelids.json');

const annchnls = require('./Config/annchannelids.json');

const idkwhylol = require('./Config/changelog.json');
//#endregion

//#region Vorpal Stuff including terminal colors and shit its just the importing stuff lol
const clc = require('cli-color');
const vorpal = require('vorpal')();
process.title = 'Sanic Bot Terminal ' + idkwhylol.terminalver;
//#endregion

client.on('ready', () => {
    vorpal.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)`));

    client.user.setPresence({
        activities: [{
            name: config.activityname
        }], status: config.status
    });

    //#region Slash commands stuff
    const mainguild = client.guilds.cache.get(config.mainguild);

    let commands

    if(mainguild) commands = mainguild.commands
    else commands = client.application.commands

    commands.cache.clear;

    commands.create({
        name: 'ping',
        description: 'Replies with bot ping and message ping',
    })

    commands.create({
        name: 'changelog',
        description: 'Sends an embed with the current changelog'
    })
    //#endregion

    //#region Vorpal Commands

    //#region Vorpal config fr
    vorpal.delimiter(clc.cyan('>')).show();
    
    const exit = vorpal.find('exit');
    if(exit) exit.remove();
    //#endregion
    
    //#region Shutdown command
    vorpal
        .command('shutdown')
        .description('Shuts down the bot and exits the console')
        .action(function(callback){
            try{
                const requestedchannelidstuff = "Channel ID Name: " + tempchannelids[0].channelIDName + "\nChannel ID: " + tempchannelids[0].channelIDSubmit + "\n\n";

                fs.writeFileSync(__dirname + '/Temp/tempchannelids.txt', requestedchannelidstuff);
                this.log(clc.green('Channel ids that were added to the list are now saved on a text file!'))

                this.log(clc.cyan('Shutting down the bot and closing the console'));
                client.destroy();
            }
            catch (error) {
            console.error(error);
            }
        });
    //#endregion
    
    //#region Controlling command
    vorpal
        .command('controlling')
        .description('Tells you what bot you are controlling')
        .action(function(args, callback){
            this.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`));
            callback();
        });
    //#endregion

    //#region Change status command
    vorpal
        .command('status')
        .description('Changes the status of the bot')
        .option('-r, --restart')
        .option('-c, --change')
        .action(function(args, callback){
            const self = this;
            
            //For the restart option
            if(args.options.restart){
                client.user.setPresence({
                    activities:[{
                        name: config.activityname
                    }], status: config.status
                })
                self.log(clc.green('Activity name and status went back to normal!'))
            }
            //For the change option
            else if (args.options.change){
                return this.prompt(inqquest.statusquestions).then((answers) => {
                    client.user.setPresence({
                        activities: [{
                            name: answers.newprsnc.toString()
                        }], status: answers.selstatus.toString()
                    })
                    self.log(clc.green('The activity name changed to: ') + answers.newprsnc.toString());
                    self.log(clc.green('And the status changed to: ') + answers.selstatus.toString());
                })
            } 
            //Say something if no option was given
            else {
                self.log(clc.red('You need to add an option in order to use this command("-r or -c")'))
            }
            callback();
        })
    //#endregion

    //#region Send messages command
    vorpal
        .command('send')
        .description('Sends a message to a specified channel (Using .json files to get the channel ids lol)')
        .option('-n, --normalmsg', 'Sends a normal message, no embed lol')
        .option('-e, --embedmsg', 'Sends an embed, restricted to specified channels in the annchannelids.json')
        .action(function(args, callback){
            const self = this;
            //I should improve this + the message content detection but i have to work on it
            if(args.options.normalmsg)
            {
                return this.prompt(inqquest.normalmsgquestions).then((answers) => {
                    if(answers.msgcont.length > 0){
                        switch(answers.selchnlid)
                        {
                            //I should make this compatible with threads but I don't know how to lol
                            case 'General (Prueba bot)':
                                client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(answers.msgcont);
                                break;
                            case 'Prueba (Prueba bot)':
                                client.channels.cache.get(spprchnlids['Prueba (Prueba bot)']).send(answers.msgcont);
                                break;
                        }
                    }
                })
            }
            //For the embed messsage, still in worklol
            else if (args.options.embedmsg) self.log(clc.yellow('WIP'));
            else self.log(clc.red('You need to add an option in order to use the command ("-n or -e")'))
            callback();
        })
    //#endregion    

    //#region Ping command
    vorpal
    .command('ping')
    .description('Tells you the actual bot ping ig')
    .action(function(args, callback) {
        if(client.ws.ping > "150")
            this.log('The current ping is: ' + clc.red(`${client.ws.ping}ms`))
        else if(client.ws.ping > "100")
            this.log('The current ping is: ' + clc.yellow(`${client.ws.ping}ms`))
        else if (client.ws.ping < "100")
            this.log('The current ping is: ' + clc.green(`${client.ws.ping}ms`))
        callback();
    })
    //#endregion

    //#region Uptime command
        vorpal
        .command('uptime')
        .description('Tells you how long has been the bot on')
        .action(function(args, callback) {
            let totalSeconds = (client.uptime / 1000);
            let dias = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;

            let horas = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;

            let minutos = Math.floor(totalSeconds / 60);
            let segundos = Math.floor(totalSeconds % 60);
            

            this.log(clc.green(`${dias} days `) + clc.cyan(`${horas} hours `) + 
            clc.yellow(`${minutos} minutes `) + clc.red(`${segundos} seconds`));
            callback();
        })
    //#endregion

    //#region Last executed command needs to be ported to new command handler
    //#endregion

    //#region Shutdown confirmation hidden command, needs to be ported to new command handler lol
    //#endregion

    //#endregion
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    const { commandName, options } = interaction

    if (commandName == 'ping'){

        interaction.reply({
            content: 'Bot Ping: ' + client.ws.ping
        })
    } else if (commandName == 'changelog'){
        const testebmed = new Discord.MessageEmbed()
        .setTitle('hola')

        interaction.reply({
            data: {
                embeds: {
                    title: 'hoal'
                }
            }
        })
    }

})

client.login(config.token);