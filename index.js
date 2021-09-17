//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
//#endregion

//#region Config stuff and channel ids etc, i should really merge all together
const fs = require("fs");

const { token, prefix, activityname, status, 
mainaccowner, altaccowner} = require('./Config/settings.json');

const { executedcmdslist, shutdownlistig, defaultembedcolor} = require('./Config/lists');

const spprchnlids = require('./Config/channelids.json');

const annchnls = require('./Config/annchannelids.json');

const { HelpMenuEntry } = require('./Commands/helpmenu');

//Previously called idkwhylol
const {terminalver, newterminalfeatures, terminalbugfixes, terminalissues,
newfeatures, bugfixes, issues, todo, } = require('./Config/changelog.json');
//#endregion

//#region Terminal stuff including terminal colors and smth
const clc = require('cli-color');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

process.title = 'Sanic Bot Terminal ' + terminalver;
//#endregion

client.on('ready', () => {
    console.log(clc.green(`Logged in as ${client.user.tag} (I will probably add more stuff to login thingy)`));

    client.user.setPresence({
        activities: [{
            name: activityname
        }], status: status
    });

    //#region Terminal Commands
    rl.prompt();

    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'Controlling':
                console.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`));
            break;

            case 'Status Change':
                rl.question('Change the activity name to: ', (newprsncname) => {

                    rl.question('Change the status of the bot (online, idle, dnd): ', (prsncstatus) => {
                        if (newprsncname.length > 0){

                            if(prsncstatus == "online" || prsncstatus == "idle" || prsncstatus == "dnd"){
                                client.user.setPresence({
                                    activities: [{
                                        name: newprsncname
                                    }], status: prsncstatus
                                })
                                console.log(clc.green('The activity name changed to: ') + newprsncname);
                                console.log(clc.green('And the status changed to: ') + prsncstatus);
                                rl.prompt();
                            } else console.log(clc.red('You might want to provide a new status'));
                            rl.prompt();

                        } else console.log(clc.red('You might want to provide a name for the presence'));
                        rl.prompt();
                    })

                })
            break;

            case 'Status Restart':
                client.user.setPresence({
                    activities: [{
                        name: activityname
                    }], status: status
                });
                console.log(clc.green('Activity name and status went back to normal!'));
            break;

            case 'Exit':
                rl.close();
            break;

            case 'Ping':
                if(client.ws.ping > "150")
                    console.log('The current ping is: ' + clc.red(`${client.ws.ping}ms`))
                else if(client.ws.ping > "100")
                    console.log('The current ping is: ' + clc.yellow(`${client.ws.ping}ms`))
                else if (client.ws.ping < "100")
                    console.log('The current ping is: ' + clc.green(`${client.ws.ping}ms`)) 
            break;

            case 'Uptime':
                let totalSeconds = (client.uptime / 1000);
                let dias = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
    
                let horas = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
    
                let minutos = Math.floor(totalSeconds / 60);
                let segundos = Math.floor(totalSeconds % 60);
                
                console.log(`${dias} days ${horas} hours ${minutos} minutes ${segundos} seconds`);
            break;

            case 'Help':
                //idk why i did this but it looked cool ngl
                new HelpMenuEntry('Controlling', 'Tells what bot you are controlling');
                new HelpMenuEntry('Status Change', 'Changes the bot status');
                new HelpMenuEntry('Status Restart', 'Restarts the bot status');
                new HelpMenuEntry('Exit', 'Shutdown the bot and eit the console');
                new HelpMenuEntry('Ping', 'Prints the bot ping');
                new HelpMenuEntry('Uptime', 'Prints the bot uptime, separated by the days, hours, minutes and seconds');
                new HelpMenuEntry('Send', 'Sends a message to a channel, you can specify it or just use the preset ones in the .json file');
            break;

            case 'Send':
                console.log('1 - General (Prueba bot)\n2 - Prueba (Prueba bot)')
                rl.question('To which channel do you want to send the message? ', (selectedchnlid) => {
                    rl.question('What do you want to say? ', (msgcont) => {

                        if(msgcont.length > 0 ){
                            if (selectedchnlid == '1'){
                                client.channels.cache.get(spprchnlids['General (Prueba bot)']).send(msgcont);
                            } else if (selectedchnlid == '2'){
                                client.channels.cache.get(spprchnlids['Prueba (Prueba bot)']).send(msgcont);
                            } else if (selectedchnlid.length = 18){
                                client.channels.cache.get(selectedchnlid).send(msgcont);
                            }
                        }

                        rl.prompt();
                    })
                })
            break;

            

            default:
                //useless code ig
                switch(line.trim()){
                    case 'controlling':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Controlling'") + "?"));
                    break;

                    case 'status change':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Status Change'") + "?"));
                    break;

                    case 'status restart':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Status Restart'") + "?"));
                    break;

                    case 'exit':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Exit'") + "?"));
                    break;

                    case 'ping':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Ping'") + "?"));
                    break;

                    case 'uptime':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Uptime'") + "?"));
                    break;

                    case 'help':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Help'") + "?"));
                    break;

                    case 'send':
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`) + " maybe you meant " + clc.cyan("'Send'") + "?"));
                    break;

                    default:
                        console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`)));
                    break;
                }
            break;
        }
        rl.prompt();
    }).on('close', () => {
        console.log(clc.red('\nShutting down Sanic Bot'));
        client.destroy();
        console.log(clc.red('Closing the console...'));
        process.exit(0);
    });
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
            .setFooter('Terminal Version: ' + terminalver + ' | Sanic Bot Version: ' + activityname + '\nA Full changelog will be available soon')
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