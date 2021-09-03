console.clear();

const Discord = require('discord.js');
const client = new Discord.Client();

//#region Config stuff and channel ids etc
const config = require('./Config/configuracion.json');
const inqquest = require('./Config/inquirerquestions');
const spprchnlids = require('./Config/channelids.json');
const annchnls = require('./Config/annchannelids.json');
const idkwhylol = require('./Config/changelog.json');
//#endregion

const clc = require('cli-color');

const vorpal = require('vorpal')();

process.title = 'Sanic Bot Terminal ' + idkwhylol.terminalver;

//#region Lists for making the commands actually work, probably has another workaround but I only have this way thanks to my little brain
var executedcmdslist = [
    { sprcmd: 'ping', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'changelog', exectimes: 0, lastusertoexec: 'user', latestexc: false},
    { sprcmd: 'shutdown', exectimes: 0, lastusertoexec: 'user', latestexc: false}
];

var usershutdownlistig = [
    { userwhosentshutdown: 'user', vorpalanswer: true | false}
];
//#endregion

client.on('ready', () => {
    vorpal.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)`));

    client.user.setPresence({
        activity: {
            name: config.estado,
            type: 0,
        },
    })

    //#region Vorpal
    
    //#region Vorpal config ig
    vorpal
        .delimiter(clc.cyan('>'))
        .show();

    const exit = vorpal.find('exit');
    if(exit) {
        exit.remove();
    }
    //#endregion

    //#region Shutdown
    vorpal
        .command('shutdown')
        .description('Shuts down the bot and exits the console process')
        .action(function(callback){
            this.log(clc.cyan('Shutting down the bot and exiting the console...'));
            client.destroy();
        })
    //#endregion

    //#region Controlling
    vorpal
        .command('controlling')
        .description('Tells you what bot you are controlling right now')
        .action(function(args, callback){
            this.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`))
            callback();
        })
    //#endregion

    //#region Status
    vorpal
        .command('status')
        .description('Changes the status of the bot')
        .option('-r, --restart')
        .option('-c, --change')
        .action(function(args, callback) {

            const self = this;

            if(args.options.restart){
                client.user.setPresence({
                    activity: {
                        name: config.estado,
                        type: 0,
                    },
                })
                self.log(clc.green('Status restarted!'))
            } else if (args.options.change) {
                return this.prompt({
                    type: 'input',
                    name: 'newprsnc',
                    message: 'What do you want to put in the status: ',
                }).then((answers) => {
                    client.user.setPresence({
                        activity: {
                            name: answers.newprsnc.toString(),
                            type: 0,
                        },
                    })
                    self.log(clc.green('The status changed to: ') + answers.newprsnc.toString())
                })
            } else {
                self.log(clc.red('You need to add an option in order to use this command ("-r or -c")'))
            }
            callback();
        })
    //#endregion

    //#region Send
    vorpal
        .command('send')
        .description('Sends a message to a supported channel (Using .json files to get the supported channel ids)')
        .option('-n, --normalmsg', 'Sends a normal message, no embed')
        .option('-e, --embedmsg', 'Sends a message embed, restricted to channels to announce stuff')
        .action(function(args, callback){

            const self = this;

            if(args.options.normalmsg) 
            {
                return this.prompt(inqquest.normalmsgquestions).then((answers) => {
                    if(answers.msgcont.length > 0)
                    {
                        switch (answers.selchnlid)
                        {
                            case 'General (Prueba bot)':
                                client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(answers.msgcont)
                            break;

                            case 'Prueba (Prueba bot)':
                                client.channels.cache.get(spprchnlids['Prueba (Prueba bot)']).send(answers.msgcont)
                            break;
                        }
                    }
                })
            } 

            else if (args.options.embedmsg)
            {
                self.log(clc.yellow('WIP'))
            }

            else 
            {
                self.log(clc.red('You need to add an option in order to use the command ("-n or -e")'))
            }
            callback();
        })
    //#endregion

    //#region Ping
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

    //#region Uptime
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
        .command('lastexecuted')
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

    //#region Shutdown confirmation command ig
    vorpal
        .command('shutdownconf')
        .hidden()
        .action(function(args, callback) {

            const self = this;

            return this.prompt([
                {
                    type: 'confirm',
                    name: 'shutdownconf',
                    message: 'The following user sent a shutdown petition ' + usershutdownlistig[0].userwhosentshutdown
                }
            ]).then((answers) => {
                if (answers.shutdownconf == true){
                    usershutdownlistig[0].vorpalanswer = true;
                } else {
                    usershutdownlistig[0].vorpalanswer = false;
                    callback();
                }
            })
        })
    //#endregion

    //#endregion
})

client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.substring(config.prefix.length).split(" ");

    switch(args[0])
    {
        case 'ping':
            const pingembedsomethingfirst = new Discord.MessageEmbed()
            .setTitle('Calculating the bot ping...');

            message.reply(pingembedsomethingfirst).then(resultMessage => {
                const msgigping = resultMessage.createdTimestamp - message.createdTimestamp

                const pingembedsomethingsecond = new Discord.MessageEmbed()
                .setTitle('Pong!')
                .addFields(
                    { name: 'Bot latency ', value: `${msgigping}ms`, inline: true},
                    { name: 'Bot ping ', value: `${client.ws.ping}ms`, inline: true}
                )
                .setColor('#008000');

                resultMessage.edit(pingembedsomethingsecond);
            })

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
                {name: 'New Terminal Features', value: idkwhylol.newterminalfeatures},
                {name: 'Terminal Bug Fixes', value: idkwhylol.terminalbugfixes},
                {name: 'Terminal Issues', value: idkwhylol.terminalissues},

                {name: '\u200B', value: '\u200B'},

                {name: 'New Features', value: idkwhylol.newfeatures},
                {name: 'Bug Fixes', value: idkwhylol.bugfixes},
                {name: 'Issues', value: idkwhylol.issues},
                {name: 'To Do', value: idkwhylol.todo}
            )
            .setFooter('Terminal Version: ' + idkwhylol.terminalver + ' | Sanic Bot Version: ' + idkwhylol.botver)
            message.reply(changelogembed);

            executedcmdslist[1].exectimes++;
            executedcmdslist[1].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = false;
            executedcmdslist[1].latestexc = true;
            executedcmdslist[2].latestexc = false;
        break;

        case 'shutdown':
            if (!args[1]){
                const shutdownconfsent = new Discord.MessageEmbed()
                .setDescription('A shutdown confirmation was sent to the terminal, waiting for the answer...');
                
                usershutdownlistig[0].userwhosentshutdown = message.author.tag;
                
                message.reply(shutdownconfsent).then(resultMessage => {
                    const shutdownconftrue = new Discord.MessageEmbed()
                    .setDescription('The shutdown was approved by the terminal, shutting down')
                    .setColor('#008000');
    
                    const shutdownconffalse = new Discord.MessageEmbed()
                    .setDescription('The shutdown was rejected by the terminal')
                    .setColor('#FF0000');
    
                    vorpal.exec('shutdownconf').then(() => {
                        if(usershutdownlistig[0].vorpalanswer == true){
                            resultMessage.edit(shutdownconftrue).then(() => {
                                client.destroy();
                                process.exit(0);
                            });
                        } else if (usershutdownlistig[0].vorpalanswer == false){
                            resultMessage.edit(shutdownconffalse).then(() => {
                                setTimeout(function(){
                                    vorpal.ui.submit('');
                                }, 2000)
                            })
                        }
                    })
                })    
            } else if (args[1] === "-f"){
                if (config.mainaccowner || config.altaccowner){
                    const shutdownforce = new Discord.MessageEmbed()
                    .setDescription('Forcing the bot shutdown, not asking for confirmation to the terminal... (20s)')
    
                    message.reply(shutdownforce).then((resultMessage2) => {
                        vorpal.log(clc.red('Shutdown scheduled in 20s'))
                        setTimeout(function(){
                            vorpal.exec('salir')
                        }, 20000)
                    })
                }
                //vorpal.log(clc.red('The following user is forcing the bot shutdown! ' + `${message.author.tag}`))
            }

            executedcmdslist[2].exectimes++;
            executedcmdslist[2].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = false;
            executedcmdslist[1].latestexc = false;
            executedcmdslist[2].latestexc = true;
        break;
    }
})

client.login(config.token);
