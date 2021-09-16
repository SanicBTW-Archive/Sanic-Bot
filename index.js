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

//#region Terminal stuff including terminal colors and smth
const clc = require('cli-color');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

const inquirer = require('inquirer');

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
            case 'controlling':
                console.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`));
            break;

            case 'status':
                rl.question('Do you want to change or restart the status? ', (statusaction) => {
                    switch (statusaction){
                        case 'restart':
                            client.user.setPresence({
                                activities: [{
                                    name: activityname
                                }], status: status
                            });
                            console.log(clc.green('Activity name and status went back to normal!'));
                            rl.prompt();
                        break;

                        case 'change':
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
                    }
                })
            break;

            case 'exit':
                rl.close();
            break;

            case 'ping':
                if(client.ws.ping > "150")
                    console.log('The current ping is: ' + clc.red(`${client.ws.ping}ms`))
                else if(client.ws.ping > "100")
                    console.log('The current ping is: ' + clc.yellow(`${client.ws.ping}ms`))
                else if (client.ws.ping < "100")
                    console.log('The current ping is: ' + clc.green(`${client.ws.ping}ms`)) 
            break;

            case 'uptime':
                let totalSeconds = (client.uptime / 1000);
                let dias = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
    
                let horas = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
    
                let minutos = Math.floor(totalSeconds / 60);
                let segundos = Math.floor(totalSeconds % 60);
                
                console.log(`${dias} days ${horas} hours ${minutos} minutes ${segundos} seconds`);
            break;

            default:
                console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`)));
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