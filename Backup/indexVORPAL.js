//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
//#endregion

//#region Config stuff and channel ids etc, i should really merge all together
const fs = require("fs");

const { token, prefix, activityname, status, 
mainaccowner, altaccowner} = require('./Config/settings.json');

const inqquest = require('./Config/cmdessentials');
const { executedcmdslist, shutdownlistig, defaultembedcolor} = require('./Config/lists');

const spprchnlids = require('./Config/channelids.json');

const annchnls = require('./Config/annchannelids.json');

//Previously called idkwhylol
const {terminalver, newterminalfeatures, terminalbugfixes, terminalissues,
newfeatures, bugfixes, issues, todo, } = require('./Config/changelog.json');
//#endregion

//#region Vorpal Stuff including terminal colors and shit its just the importing stuff lol
const clc = require('cli-color');
const vorpal = require('vorpal')();
process.title = 'Sanic Bot Terminal ' + terminalver;
//#endregion

client.on('ready', () => {
    vorpal.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)`));

    client.user.setPresence({
        activities: [{
            name: activityname
        }], status: status
    });

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
                //const requestedchannelidstuff = "Channel ID Name: " + tempchannelids[0].channelIDName + "\nChannel ID: " + tempchannelids[0].channelIDSubmit + "\n\n";

                //fs.writeFileSync(__dirname + '/Temp/tempchannelids.txt', requestedchannelidstuff);
                //this.log(clc.green('Channel ids that were added to the list are now saved on a text file!'))

                this.log(clc.cyan('Shutting down the bot and closing the console'));
                client.destroy();
                process.exit();
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
        .command('status <action>')
        .description('Changes the status of the bot (Supported args: restart, change)')
        .action(function(args, callback){
            const self = this;
            
            //For the restart arg
            if (args.action == 'restart') {
                client.user.setPresence({
                    activities:[{
                        name: activityname
                    }], status: status
                })
                self.log(clc.green('Activity name and status went back to normal!'))
            }
            //For the change arg
            else if (args.action == 'change') {
                return this.prompt(inqquest.statusquestions).then((answers) => {
                    if (answers.selstatus == 'invisible') self.log(clc.redBright('aint changing to invisible'));
                    else {
                        client.user.setPresence({
                            activities: [{
                                name: answers.newprsnc
                            }], status: answers.selstatus
                        })
                        self.log(clc.green('The activity name changed to: ') + answers.newprsnc);
                        self.log(clc.green('And the status changed to: ') + answers.selstatus);
                    }
                    
                })
            } 
            //Say something if wrong arg was given    
            else self.log(clc.red('You need to provide a correct arg in order to use this command("restart", "change")'))
            callback();
        })
    //#endregion

    //#region Send messages command
    vorpal
        .command('send')
        .description('Sends a message to a specified channel (Using .json files to get the channel ids lol)')
        .action(function(args, callback){
            const self = this;
            //I should improve this + the message content detection but i have to work on it
            return this.prompt(inqquest.msgtypethingy).then((answers) => {
                switch (answers.msgtype) {
                    case 'Normal':
                        return this.prompt(inqquest.normalmsgquestions).then((answers) => {
                            switch (answers.selchnlid) {
                                case 'General (Prueba bot)':
                                    if (answers.msgcont.length > 0) {
                                        client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(answers.msgcont);
                                    } else vorpal.log('if this is printed then idk why tf its my main code not working bruh');
                                    break;
                                case 'Prueba (Prueba bot)':
                                    if (answers.msgcont.length > 0) {
                                        client.channels.cache.get(spprchnlids['Prueba (Prueba bot)']).send(answers.msgcont);
                                    } else vorpal.log('if this is printed then idk why tf its my main code not working bruh');
                                    break;
                            }
                        })
                        break;

                    case 'Embed':
                        return this.prompt(inqquest.embedmsgquestions).then((answers) => {
                            //This code sucks ass like really it sucks, should search a way to optimize it

                            //var fixeddefaultcolorig = defaultembedcolor[0].defaultcolor.toString();

                            const mainembed = new Discord.MessageEmbed()
                                .setTitle(answers.embedtitle)
                                .setDescription(answers.embeddesc)
                                .setFooter(answers.embedfooter)
                                .setColor(answers.embedcolor);

                            //const diffembed = new Discord.MessageEmbed()
                                //.setTitle(answers.embedtitle)
                                //.setDescription(answers.embeddesc)
                                //.setFooter(answers.embedfooter)
                                //.setColor(fixeddefaultcolorig);

                            if (answers.embedtitle.length > 0) {
                                if (answers.embeddesc.length > 0) {
                                    if (answers.embedfooter.length > 0) {
                                        if (answers.embedcolor.length > 0) {
                                            switch (answers.selchnlid) {
                                                case 'Noticias (Prueba bot)':
                                                    client.channels.cache.get(annchnls['Noticias (Prueba bot)']).send({ embeds: [mainembed] })
                                                    break;
                                            }
                                        } else if (!answers.embedcolor.length > 0) {
                                            vorpal.log(clc.red('Working on this, currently this isnt working'))
                                            /*
                                            switch (answers.selchnlid) {
                                                case 'Noticias (Prueba bot)':
                                                    client.channels.cache.get(annchnls['Noticias (Prueba bot)']).send({ embeds: [diffembed] })
                                                    break;
                                            }
                                            */
                                        }
                                    }
                                }
                            }
                        })
                        break;

                    case 'Custom':
                        return this.prompt(inqquest.custommsgtype).then((answers) => {
                            switch (answers.custommsgtype) {
                                case 'Normal':
                                    return this.prompt(inqquest.custommsgquestions).then((answers) => {
                                        if (answers.customchnlid.length > 0) {
                                            if (answers.msgcont.length > 0) {
                                                client.channels.cache.get(answers.customchnlid).send(answers.msgcont);
                                            }
                                        }
                                    })
                                    break;

                                case 'Embed':
                                    vorpal.log(clc.yellow('Working on the embed message type, not custom one'))
                                    break;
                            }
                        })
                        break;
                }
            })

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

    //#region Last executed command
    vorpal
    .command('last executed')
    .description('Logs the last executed command from Discord, includes user and times executed')
    .action(function(args, callback) {
        if(executedcmdslist[0].latestexc == true){
            this.log('The following command "' + clc.yellow(`${executedcmdslist[0].sprcmd}`) + '"')
            this.log('It has been executed ' + clc.cyan(`${executedcmdslist[0].exectimes} times`))
            this.log('Last user to execute the command ' + clc.cyan(`${executedcmdslist[0].lastusertoexec}`))
        } else if(executedcmdslist[1].latestexc == true){
            this.log('The following command "' + clc.yellow(`${executedcmdslist[1].sprcmd}`) + '"')
            this.log('It has been executed ' + clc.cyan(`${executedcmdslist[1].exectimes} times`))
            this.log('Last user to execute the command ' + clc.cyan(`${executedcmdslist[1].lastusertoexec}`))
        } else if(executedcmdslist[2].latestexc == true){
            this.log('The following command "' + clc.yellow(`${executedcmdslist[2].sprcmd}`) + '"')
            this.log('It has been executed ' + clc.cyan(`${executedcmdslist[2].exectimes} times`))
            this.log('Last user to execute the command ' + clc.cyan(`${executedcmdslist[2].lastusertoexec}`))
        } else{
            this.log(clc.red("Couldn't find recently executed commands"))
        }
        callback();
    })
    //#endregion

    //#region Shutdown confirmation hidden command, needs to be ported to new command handler lol
    //#endregion

    //#region Change default embed color
    vorpal
        .command('change embed color')
        .description('Change the default embed color if you dont want to type the hex value in the embed color question')
        .action(function(args, callback) {
            return this.prompt(inqquest.changeembedcolorquest).then((answers) => {
                if (answers.newdefembedcolor.startsWith("#") && answers.newdefembedcolor.length == 7) {
                    if(!defaultembedcolor[0].oldcolor.includes(answers.newdefembedcolor)){

                        defaultembedcolor[0].defaultcolor = answers.newdefembedcolor;
                        vorpal.log(clc.green(`The following hex color: ${answers.newdefembedcolor} has replaced ${defaultembedcolor[0].oldcolor}`))
                        defaultembedcolor[0].oldcolor = answers.newdefembedcolor;

                    }
                }
                else vorpal.log(clc.red('Oops try again but check if you typed it correctly'))
                callback();
            })
        })
    //#endregion

    //#endregion
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0])
    {
        case 'ping':
            const pingembedsomethingfirst = new Discord.MessageEmbed()
            .setTitle('Calculating the bot ping...');

            message.reply({
                embeds: [pingembedsomethingfirst]
            }).then(resultMessage => {
                const msgigping = resultMessage.createdTimestamp - message.createdTimestamp

                const pingembedsomethingsecond = new Discord.MessageEmbed()
                .setTitle('Pong!')
                .addFields
                (
                    { name: 'Bot Latency ', value: `${msgigping}ms`, inline: true},
                    { name: 'Bot Ping ', value: `${client.ws.ping}ms`, inline: true}
                ).setColor('#008000');

                resultMessage.edit({
                    embeds: [pingembedsomethingsecond]
                });
            });

            executedcmdslist[0].exectimes++;
            executedcmdslist[0].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = true;
            executedcmdslist[1].latestexc = false;
            executedcmdslist[2].latestexc = false;
        break;

        case 'changelog':
            const changelogembed = new Discord.MessageEmbed()
            .setTitle('Sanic Bot Changelog')
            .setColor('#0099ff')
            .addFields(
                {name: 'New Terminal Features', value: newterminalfeatures},
                {name: 'Terminal Bug Fixes', value: terminalbugfixes},
                {name: 'Terminal Issues', value: terminalissues},

                {name: '\u200B', value: '\u200B'},

                {name: 'New Features', value: newfeatures},
                {name: 'Bug Fixes', value: bugfixes},
                {name: 'Issues', value: issues},
                {name: 'To Do', value: todo}
            )
            .setFooter('Terminal Version: ' + terminalver + ' | Sanic Bot Version: ' + activityname)
            message.reply({
                embeds: [changelogembed]
            });

            executedcmdslist[1].exectimes++;
            executedcmdslist[1].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = false;
            executedcmdslist[1].latestexc = true;
            executedcmdslist[2].latestexc = false;
        break;
    }
})

client.login(token);