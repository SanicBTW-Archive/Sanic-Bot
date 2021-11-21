//Redo the channelids system in a way that it isnt a lot of useless code lol

//#region Discord stuff
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Voice = require('@discordjs/voice');
//#endregion

//#region Config stuff, Terminal and Discord Bot
//#region Imports
//should order this or something
const fs = require("fs");
const clc = require('cli-color');
const readline = require('readline');

const { HelpMenuEntry } = require('./Commands/helpmenu');
const { SettingsMenuEntry, optionlist} = require('./Commands/Settings');

const { Log } = require('./Helper/Log');
const { CheckFiles } = require('./Helper/CheckFiles');

const {token} = require('./Config/DiscToken.json');

const {prefix, activityname, thingypresencestatus, 
mainaccowner, altaccowner} = require('./Config/DiscordSettings.json');
    
const { executedcmdslist, defaultembedcolor, channelidslist, formusicstuff, quotesoptions} = require('./Helper/Lists');
    
const {terminalver, newterminalfeatures, terminalbugfixes, terminalissues,
newfeatures, bugfixes, issues, todo, } = require('./Helper/changelog.json');    
//#endregion    

new CheckFiles("TerminalSettings");
new CheckFiles("ChannelIDS");
new CheckFiles("Quotes"); //Check Todo lol

//#region More Imports due to code order execution
//I have to load this after the check files stuff due to the code execution order
const TerminalSettings = require('./Config/TerminalSettings.json');
const { Load } = require('./Helper/Loader');
const { SendMenuHelp, SendHelper } = require('./Commands/Send');

//#endregion

//#endregion

client.on('ready', () => {
    //#region Load Terminal settings/stuff
    new Load("Options");
    
    if(optionlist[0].state.includes("Enabled")){
        console.clear();
    }
    
    if (optionlist[2].state.includes("Enabled")){
        process.title = TerminalSettings.consoletitleoption.value + " " + terminalver;
    } else {
        process.title = TerminalSettings.consoletitleoption.value;
    }

    new Load("Channel IDS");

    //I'm extremely sorry for this again, I'm really sorry for everything from the settings thingy
    if (optionlist[3].state.includes("Enabled")){
        new Load("Quotes");

        const updateStatus = () => {
            let counter = 0;
            client.user.setPresence({
                activities: [{
                    name: quotesoptions[counter].quote
                }], status: thingypresencestatus
            });
    
            if(++counter >= quotesoptions.length){
                counter = 0;
            }
    
            setTimeout(updateStatus, 1000 * 5)
        }
        updateStatus()
        
    } else {
        client.user.setPresence({
            activities: [{
                name: activityname
            }], status: thingypresencestatus
        });    
    }
    //#endregion
    
    new Log(`Logged in as ${client.user.tag}`, 0);

    //Set the fucking curplayingmusic thingy to false, using the lists.js from the Helper folder
    formusicstuff[0].curplayingmusic = false;

    //#region Terminal Commands
    if(optionlist[4].state.includes("Enabled")) 
    //the {} are placed in a weird way, i will probably fix this someday or rewrite the entire code
    //but im really lazy to and also with such a fucking rejection that i got i dont want to do anything
    {   
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        new Log("Type 'help' to show the list of available commands", 0);

        rl.prompt();

        rl.on('line', (line) => {
            switch (line.trim()) {
                case 'controlling':
                    console.log('Currently controlling: ' + clc.cyan(`${client.user.tag}`));
                break;

                case 'status change':
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

                case 'status restart':
                    client.user.setPresence({
                        activities: [{
                            name: activityname
                        }], status: thingypresencestatus
                    });
                    console.log(clc.green('Activity name and status went back to normal!'));
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
                    console.log('The current ping is: ' + clc.green(`${client.ws.ping}ms`)) 
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

                case 'help':
                    //idk why i did this but it looked cool ngl
                    new HelpMenuEntry('controlling', 'Tells what bot you are controlling');
                    new HelpMenuEntry('status change', 'Changes the bot status');
                    new HelpMenuEntry('status restart', 'Restarts the bot status');
                    new HelpMenuEntry('exit', 'Shutdown the bot and eit the console');
                    new HelpMenuEntry('ping', 'Prints the bot ping');
                    new HelpMenuEntry('uptime', 'Prints the bot uptime, separated by the days, hours, minutes and seconds');
                    new HelpMenuEntry('send', 'Sends a message to a channel, you can specify it or just use the preset ones in the .json file');
                    new HelpMenuEntry('settings', 'Displays a settings menu for the console');
                    new HelpMenuEntry('restore settings', 'The name says it all, restore settings to its default value');
                    new HelpMenuEntry('add channelid', 'You can add a channel id to a list that you can use to send messages to the specified channel id');
                    new HelpMenuEntry('restore channelids', 'Basically restores the channel ids');
                break;

                case 'send':
                    new SendMenuHelp();
                    rl.question('To which channel do you want to send the message? ', (selectedchnlid) => {

                        rl.question('What do you want to say? ', (msgcont) => {

                            if(msgcont.length > 0 ){
                                switch(selectedchnlid){
                                    //Weird code lol
                                    case "0":
                                        new SendHelper(channelidslist[0].chnlid.toString(), msgcont, client);
                                        break;
                                
                                    case "1":
                                        new SendHelper(channelidslist[1].chnlid.toString(), msgcont, client);
                                        break;

                                    case "2":
                                        new SendHelper(channelidslist[2].chnlid.toString(), msgcont, client);
                                        break;

                                    case "3":
                                        new SendHelper(channelidslist[3].chnlid.toString(), msgcont, client);
                                        break;
                                    
                                    case "4":
                                        new SendHelper(channelidslist[4].chnlid.toString(), msgcont, client);
                                        break;

                                    case "5":
                                        new SendHelper(channelidslist[5].chnlid.toString(), msgcont, client);
                                        break;

                                    case "6":
                                        new SendHelper(channelidslist[6].chnlid.toString(), msgcont, client);
                                        break;

                                    case "7":
                                        new SendHelper(channelidslist[7].chnlid.toString(), msgcont, client);
                                        break;

                                    case "8":
                                        new SendHelper(channelidslist[8].chnlid.toString(), msgcont, client);
                                        break;

                                    case "9":
                                        new SendHelper(channelidslist[9].chnlid.toString(), msgcont, client);
                                        break;

                                    case "10":
                                        new SendHelper(channelidslist[10].chnlid.toString(), msgcont, client);
                                        break;

                                    case "11":
                                        new SendHelper(channelidslist[11].chnlid.toString(), msgcont, client);
                                        break;

                                    case "12":
                                        new SendHelper(channelidslist[12].chnlid.toString(), msgcont, client);
                                        break;

                                    case "13":
                                        new SendHelper(channelidslist[13].chnlid.toString(), msgcont, client);
                                        break;

                                    case "14":
                                        new SendHelper(channelidslist[14].chnlid.toString(), msgcont, client);
                                        break;

                                    case "15":
                                        new SendHelper(channelidslist[15].chnlid.toString(), msgcont, client);
                                        break;

                                    case "16":
                                        new SendHelper(channelidslist[16].chnlid.toString(), msgcont, client);
                                        break;

                                    case "17":
                                        new SendHelper(channelidslist[17].chnlid.toString(), msgcont, client);
                                        break;

                                    case "18":
                                        new SendHelper(channelidslist[18].chnlid.toString(), msgcont, client);
                                        break;

                                    case "19":
                                        new SendHelper(channelidslist[19].chnlid.toString(), msgcont, client);
                                        break;

                                    case "20":
                                        new SendHelper(channelidslist[20].chnlid.toString(), msgcont, client);
                                        break;
                                } //end of switch
                                if(selectedchnlid.toString().length == 18){
                                    client.channels.cache.get(selectedchnlid).send(msgcont);
                                }
                            }
                            rl.prompt();
                        })
                    })
                break;

                case 'settings':
                    //gets the list value from the settingsmenu.js lol
                    //also i should try to improve this code or smth
                    new SettingsMenuEntry(optionlist[0].option, 'When started up the console will be cleared\nIf enabled the console will be wiped once the bot starts', optionlist[0].state, null);
                    new SettingsMenuEntry(optionlist[1].option, 'Change the console title\nIts really basic stuff right?', null, optionlist[1].value);
                    new SettingsMenuEntry(optionlist[2].option, 'Display the Terminal Version\nIf disabled it wont display the Terminal Version', optionlist[2].state, null);
                    new SettingsMenuEntry(optionlist[3].option, 'Auto changes the Bot status/presence', optionlist[3].state, null);
                    new SettingsMenuEntry(optionlist[4].option, 'Literally use this mode, warning if you disable this\nyou will need to enable it through the json file or through the bot', optionlist[4].state, null);
                    new SettingsMenuEntry(optionlist[5].option, 'Show debug logs when using the bot', optionlist[5].state, null);

                    rl.question('Do you wish to modify some setting? (y/n) ', (confirmation) => {
                        switch(confirmation) {
                            case 'y':
                                rl.question('What option do you want to modify? ', (modifyopt) => {
                                    switch(modifyopt){
                                        //for the first option
                                        case optionlist[0].option:
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch(newoptstate) {
                                                    case 'enable':
                                                        optionlist[0].state = "Enabled";
                                                        console.log(clc.green('Successfully enabled ' + clc.white(optionlist[0].option)));
                                                        rl.prompt();
                                                    break;

                                                    case 'disable':
                                                        optionlist[0].state = "Disabled";
                                                        console.log(clc.green('Successfully disabled ' + clc.white(optionlist[0].option)));
                                                        rl.prompt();
                                                    break;

                                                    default:
                                                        console.log(clc.red('Maybe you should provide a new state for the option'));
                                                        rl.prompt();
                                                    break;
                                                }
                                            })
                                        break;

                                        case optionlist[1].option:
                                            rl.question('Type a new title for the console ', (newconsoletitle) => {
                                                if(newconsoletitle.length > 0 && newconsoletitle.length != null){
                                                    optionlist[1].value = newconsoletitle;
                                                    console.log(clc.green('Successfully changed the console title to ' + clc.white(newconsoletitle)));
                                                    rl.prompt();
                                                } else {
                                                    console.log(clc.red('Type something longer'));
                                                    rl.prompt();
                                                }
                                            })
                                        break;

                                        case optionlist[2].option:
                                            //just a copy paste of the first option lol
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch(newoptstate) {
                                                    case 'enable':
                                                        optionlist[2].state = "Enabled";
                                                        console.log(clc.green('Successfully enabled ' + clc.white(optionlist[2].option)));
                                                        rl.prompt();
                                                    break;

                                                    case 'disable':
                                                        optionlist[2].state = "Disabled";
                                                        console.log(clc.green('Successfully disabled ' + clc.white(optionlist[2].option)));
                                                        rl.prompt();
                                                    break;

                                                    default:
                                                        console.log(clc.red('Maybe you should provide a new state for the option'));
                                                        rl.prompt();
                                                    break;
                                                }
                                            })
                                        break;

                                        case optionlist[3].option:
                                            //just a copy paste of the first option lol
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch(newoptstate) {
                                                    case 'enable':
                                                        optionlist[3].state = "Enabled";
                                                        console.log(clc.green('Successfully enabled ' + clc.white(optionlist[3].option)));
                                                        rl.prompt();
                                                    break;

                                                    case 'disable':
                                                        optionlist[3].state = "Disabled";
                                                        console.log(clc.green('Successfully disabled ' + clc.white(optionlist[3].option)));
                                                        rl.prompt();
                                                    break;

                                                    default:
                                                        console.log(clc.red('Maybe you should provide a new state for the option'));
                                                        rl.prompt();
                                                    break;
                                                }
                                            })
                                        break;

                                        case optionlist[4].option:
                                            //just a copy paste of the first option lol
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch(newoptstate) {
                                                    case 'enable':
                                                        optionlist[4].state = "Enabled";
                                                        console.log(clc.green('Successfully enabled ' + clc.white(optionlist[4].option)));
                                                        rl.prompt();
                                                    break;

                                                    case 'disable':
                                                        optionlist[4].state = "Disabled";
                                                        console.log(clc.green('Successfully disabled ' + clc.white(optionlist[4].option)));
                                                        rl.prompt();
                                                    break;

                                                    default:
                                                        console.log(clc.red('Maybe you should provide a new state for the option'));
                                                        rl.prompt();
                                                    break;
                                                }
                                            })
                                        break;

                                        case optionlist[5].option:
                                            //just a copy paste of the first option lol
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch(newoptstate) {
                                                    case 'enable':
                                                        optionlist[5].state = "Enabled";
                                                        console.log(clc.green('Successfully enabled ' + clc.white(optionlist[5].option)));
                                                        rl.prompt();
                                                    break;

                                                    case 'disable':
                                                        optionlist[5].state = "Disabled";
                                                        console.log(clc.green('Successfully disabled ' + clc.white(optionlist[5].option)));
                                                        rl.prompt();
                                                    break;

                                                    default:
                                                        console.log(clc.red('Maybe you should provide a new state for the option'));
                                                        rl.prompt();
                                                    break;
                                                }
                                            })
                                        break;

                                        default:
                                            console.log(clc.red('Maybe you should provide an option to modify lol'));
                                            rl.prompt();
                                        break;
                                    }
                                })
                            break;

                            //these two are useless ig
                            case 'n':
                                rl.prompt();
                            break;

                            default:
                                rl.prompt();
                            break;
                        }
                    })
                break;

                case 'restore settings':
                    rl.question('Are you sure that you want to restore the Terminal Settings? (y/n) ', (restoreconf) => {
                        switch(restoreconf){
                            case 'y':
                                new Log("Restoring Terminal Settings...", 3);
                                optionlist[0].state = 'Disabled';
                                optionlist[1].value = 'Sanic Bot Terminal';
                                optionlist[2].state = 'Enabled';
                                optionlist[3].state = 'Disabled';
                                optionlist[4].state = 'Enabled';
                                optionlist[5].state = 'Disable';
                                new Log("Terminal Settings Restored! Restart the console to apply the changes", 1);
                                rl.prompt();
                            break;

                            case 'n':
                                rl.prompt();
                            break;

                            default:
                                console.log(clc.red('Provide a valid answer'));
                                rl.prompt();
                            break;
                        }
                    })
                break;

            case 'add channelid':
                rl.question('Please enter the Channel Name: ', (chnlidname) => {
                    if(chnlidname.length > 0){
                        rl.question('Please enter the Channel ID: ', (chnlid) => {
                            if(chnlid.length = 18){
                                rl.question('Where do you want to save this info? (0 to 20): ', (wheretosave) => {
                                    switch(wheretosave){
                                        case "0":
                                            channelidslist[0].name = chnlidname.toString();
                                            channelidslist[0].chnlid = chnlid.toString();
                                            console.log(clc.green("Successfully saved the info to the index 0"));
                                            rl.prompt();
                                            break;

                                        case "1":
                                            channelidslist[1].name = chnlidname;
                                            channelidslist[1].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 1"));
                                            rl.prompt();
                                            break;

                                        case "2":
                                            channelidslist[2].name = chnlidname;
                                            channelidslist[2].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 2"));
                                            rl.prompt();
                                            break;

                                        case "3":
                                            channelidslist[3].name = chnlidname;
                                            channelidslist[3].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 3"));
                                            rl.prompt();
                                            break;

                                        case "4":
                                            channelidslist[4].name = chnlidname;
                                            channelidslist[4].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 4"));
                                            rl.prompt();
                                            break;

                                        case "5":
                                            channelidslist[5].name = chnlidname;
                                            channelidslist[5].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 5"));
                                            rl.prompt();
                                            break;

                                        case "6":
                                            channelidslist[6].name = chnlidname;
                                            channelidslist[6].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 6"));
                                            rl.prompt();
                                            break;

                                        case "7":
                                            channelidslist[7].name = chnlidname;
                                            channelidslist[7].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 7"));
                                            rl.prompt();
                                            break;

                                        case "8":
                                            channelidslist[8].name = chnlidname;
                                            channelidslist[8].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 8"));
                                            rl.prompt();
                                            break;

                                        case "9":
                                            channelidslist[9].name = chnlidname;
                                            channelidslist[9].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 9"));
                                            rl.prompt();
                                            break;
                                        
                                        case "10":
                                            channelidslist[10].name = chnlidname;
                                            channelidslist[10].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 10"));
                                            rl.prompt();
                                            break;

                                        case "11":
                                            channelidslist[11].name = chnlidname;
                                            channelidslist[11].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 11"));
                                            rl.prompt();
                                            break;

                                        case "12":
                                            channelidslist[12].name = chnlidname;
                                            channelidslist[12].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 12"));
                                            rl.prompt();
                                            break;

                                        case "13":
                                            channelidslist[13].name = chnlidname;
                                            channelidslist[13].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 13"));
                                            rl.prompt();
                                            break;

                                        case "14":
                                            channelidslist[14].name = chnlidname;
                                            channelidslist[14].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 14"));
                                            rl.prompt();
                                            break;

                                        case "15":
                                            channelidslist[15].name = chnlidname;
                                            channelidslist[15].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 15"));
                                            rl.prompt();
                                            break;

                                        case "16":
                                            channelidslist[16].name = chnlidname;
                                            channelidslist[16].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 16"));
                                            rl.prompt();
                                            break;

                                        case "17":
                                            channelidslist[17].name = chnlidname;
                                            channelidslist[17].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 1"));
                                            rl.prompt();
                                            break;

                                        case "18":
                                            channelidslist[18].name = chnlidname;
                                            channelidslist[18].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 18"));
                                            rl.prompt();
                                            break;

                                        case "19":
                                            channelidslist[19].name = chnlidname;
                                            channelidslist[19].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 19"));
                                            rl.prompt();
                                            break;

                                        case "20":
                                            channelidslist[20].name = chnlidname;
                                            channelidslist[20].chnlid = chnlid;
                                            console.log(clc.green("Successfully saved the info to the index 20"));
                                            rl.prompt();
                                            break;
                                    }
                                })
                            } else {
                                console.log(clc.red("This doesn't look like a Channel ID\n(Channel ID must be 18 characters long)"))
                            }
                        })
                    } else {
                        console.log(clc.red('Please provide a longer name'));
                        rl.prompt();
                    }
                })

            break;

            case 'restore channelids':
                rl.question('Are you sure that you want to restore the Channel IDS json? (y/n) ', (restoreconf) => {
                    switch(restoreconf){
                        case 'y':
                            new Log("Restoring the Channel IDS...", 3);

                            channelidslist[0].name = "";
                            channelidslist[0].chnlid = 0;
                    
                            channelidslist[1].name = "";
                            channelidslist[1].chnlid = 0;
                    
                            channelidslist[2].name = "";
                            channelidslist[2].chnlid = 0;
                    
                            channelidslist[3].name = "";
                            channelidslist[3].chnlid = 0;
                    
                            channelidslist[4].name = "";
                            channelidslist[4].chnlid = 0;
                    
                            channelidslist[5].name = "";
                            channelidslist[5].chnlid = 0;
                    
                            channelidslist[6].name = "";
                            channelidslist[6].chnlid = 0;
                    
                            channelidslist[7].name = "";
                            channelidslist[7].chnlid = 0;
                    
                            channelidslist[8].name = "";
                            channelidslist[8].chnlid = 0;
                    
                            channelidslist[9].name = "";
                            channelidslist[9].chnlid = 0;
                    
                            channelidslist[10].name = "";
                            channelidslist[10].chnlid = 0;

                            channelidslist[11].name = "";
                            channelidslist[11].chnlid = 0;

                            channelidslist[12].name = "";
                            channelidslist[12].chnlid = 0;

                            channelidslist[13].name = "";
                            channelidslist[13].chnlid = 0;

                            channelidslist[14].name = "";
                            channelidslist[14].chnlid = 0;

                            channelidslist[15].name = "";
                            channelidslist[15].chnlid = 0;

                            channelidslist[16].name = "";
                            channelidslist[16].chnlid = 0;
                    
                            channelidslist[17].name = "";
                            channelidslist[17].chnlid = 0;

                            channelidslist[18].name = "";
                            channelidslist[18].chnlid = 0;

                            channelidslist[19].name = "";
                            channelidslist[19].chnlid = 0;

                            channelidslist[20].name = "";
                            channelidslist[20].chnlid = 0;

                            new Log("Channel IDS Restored! Restart the console to apply the changes", 1);
                            rl.prompt();
                        break;

                        case 'n':
                            rl.prompt();
                        break;

                        default:
                            console.log(clc.red('Provide a valid answer'));
                            rl.prompt();
                        break;
                    }
                })
            break;

            default:
                console.log(clc.red("Oops couldn't find a command called " + clc.white(`${line.trim()}`)));
            break;
        }
        rl.prompt();
    }).on('close', () => {
        //#region TerminalConfig.json file fields
        const clearconsoleoptions = {
            "option": optionlist[0].option,
            "state": optionlist[0].state,
        };
        
        const consoletitleoption = {
            "option": optionlist[1].option,
            "value": optionlist[1].value,
        };
        
        const displaytermveroption = {
            "option": optionlist[2].option,
            "state": optionlist[2].state,
        };

        const autochangestatus = {
            "option": optionlist[3].option,
            "state": optionlist[3].state,
        }

        const useconsole = {
            "option": optionlist[4].option,
            "state": optionlist[4].state,
        }

        const debuglogs = {
            "option": optionlist[5].option,
            "state": optionlist[5].state
        }
        
        const alltogetherig = {
            clearconsoleoptions,
            consoletitleoption,
            displaytermveroption,
            autochangestatus,
            useconsole,
            debuglogs
        }
        
        const fixedoptionsig = JSON.stringify(alltogetherig, null, 4);
        //#endregion
        
        //#region New ChannelIDS.json file fields, reworking the field names cuz large
        //I'm really fucking sorry for all of this
        const fstchnlid = {
            "name": channelidslist[0].name,
            "chnlid": channelidslist[0].chnlid
        };
        const scndchnlid = {
            "name": channelidslist[1].name,
            "chnlid": channelidslist[1].chnlid
        };
        const thrdchnlid = {
            "name": channelidslist[2].name,
            "chnlid": channelidslist[2].chnlid
        };
        const fthchnlid = {
            "name": channelidslist[3].name,
            "chnlid": channelidslist[3].chnlid
        };
        const fifthchlid = {
            "name": channelidslist[4].name,
            "chnlid": channelidslist[4].chnlid
        };
        const sixthchnlid = {
            "name": channelidslist[5].name,
            "chnlid": channelidslist[5].chnlid
        };
        const svnthchnlid = {
            "name": channelidslist[6].name,
            "chnlid": channelidslist[6].chnlid
        };
        const eigthchnlid = {
            "name": channelidslist[7].name,
            "chnlid": channelidslist[7].chnlid
        };
        const nnthchnlid = {
            "name": channelidslist[8].name,
            "chnlid": channelidslist[8].chnlid
        };
        const tnthchnlid = {
            "name": channelidslist[9].name,
            "chnlid": channelidslist[9].chnlid
        };
        const elvnthchnlid = {
            "name": channelidslist[10].name,
            "chnlid": channelidslist[10].chnlid
        };

        const twlvchnlid = {
            "name": channelidslist[11].name,
            "chnlid": channelidslist[11].chnlid
        };
        
        const thrtnchnlid = {
            "name": channelidslist[12].name,
            "chnlid": channelidslist[12].chnlid
        };

        const frtnchnlid = {
            "name": channelidslist[13].name,
            "chnlid": channelidslist[13].chnlid
        };

        const ftennchnlid = {
            "name": channelidslist[14].name,
            "chnlid": channelidslist[14].chnlid
        };

        const sxtennchnlid = {
            "name": channelidslist[15].name,
            "chnlid": channelidslist[15].chnlid
        };

        const svtnchnlid = {
            "name": channelidslist[16].name,
            "chnlid": channelidslist[16].chnlid
        };

        const eitnchnlid = {
            "name": channelidslist[17].name,
            "chnlid": channelidslist[17].chnlid
        };

        const nntnchnlid = {
            "name": channelidslist[18].name,
            "chnlid": channelidslist[18].chnlid
        };

        const twntchnlid = {
            "name": channelidslist[19].name,
            "chnlid": channelidslist[19].chnlid
        };

        const twntochnlid = {
            "name": channelidslist[20].name,
            "chnlid": channelidslist[20].chnlid
        };

        //I'm also really fucking sorry for this too
        const allchannelidstogether = {
            //1, 0
            fstchnlid,
            //2, 1
            scndchnlid,
            //3, 2
            thrdchnlid,
            //4, 3
            fthchnlid,
            //5, 4
            fifthchlid,
            //6, 5
            sixthchnlid,
            //7, 6
            svnthchnlid,
            //8, seven
            eigthchnlid,
            //9, 8
            nnthchnlid,
            //10, 9
            tnthchnlid,
            //11, 10
            elvnthchnlid,
            //New slots
            //12, 11
            twlvchnlid,
            //13, 12
            thrtnchnlid,
            //14, 13
            frtnchnlid,
            //15, 14
            ftennchnlid,
            //16, 15
            sxtennchnlid,
            //17, 16
            svtnchnlid,
            //18, 17
            eitnchnlid,
            //19, 18
            nntnchnlid,
            //20, 19
            twntchnlid,
            //21, 20
            twntochnlid
        }

        const fixedchannelidsig = JSON.stringify(allchannelidstogether, null, 4);
        //#endregion
        
        //#region Example status options fields ig
        const quotesthingyfields = {
            "firstquote": quotesoptions[0].quote,
            "secondquote": quotesoptions[1].quote,
            "thirdquote": quotesoptions[2].quote,
            "fourthquote": quotesoptions[3].quote,
            "fifthquote": quotesoptions[4].quote
        };

        //I'm extremely sorry for these I'm really fucking dumb
        const fixedquotesig = JSON.stringify(quotesthingyfields, null, 4);
        //#endregion

        try {
            console.log(clc.white('\n-------------------')); //Idk why the fuck did i do this but looks cool ig lol
            console.log(clc.yellowBright('Trying to save the terminal settings...'));
            fs.writeFileSync(__dirname + '/Config/TerminalSettings.json', fixedoptionsig);
            console.log(clc.green('Saved terminal settings!'));
            console.log(clc.white('\n-------------------'));
            console.log(clc.yellowBright('Trying to save the channel ids...'));
            fs.writeFileSync(__dirname + "/Helper/ChannelIDS.json", fixedchannelidsig);
            console.log(clc.white('\n-------------------'));
            console.log(clc.yellowBright('Trying to save the quotes...'));
            fs.writeFileSync(__dirname + "/Helper/StatusOptions.json", fixedquotesig);
            console.log(clc.green('Saved all the necessary!\nProceeding with the shutdown'));

        } catch (error) {
            console.error(error);
        }

        console.log(clc.white('-------------------'))
        console.log(clc.red('Shutting down Sanic Bot'));
        client.destroy();
        console.log(clc.red('Closing the console...'));
        process.exit(0);
    });
}    
//#endregion
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0])
    {
        case 'ping':
            const pingembedsomethingfirst = new Discord.MessageEmbed()
            .setTitle('Calculando el ping del bot...');

            message.reply({
                embeds: [pingembedsomethingfirst]
            }).then(resultMessage => {
                const msgigping = resultMessage.createdTimestamp - message.createdTimestamp

                const pingembedsomethingsecond = new Discord.MessageEmbed()
                .setTitle('Pong!')
                .addFields
                (
                    { name: 'Latencia del bot ', value: `${msgigping}ms`, inline: true},
                    { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
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

        case 'cambios':
            const changelogembed = new Discord.MessageEmbed()
            .setTitle('Cambios de Sanic Bot')
            .setColor('#0099ff')
            .addFields(
                {name: 'Nuevas caracteristicas de la terminal', value: newterminalfeatures},
                {name: 'Arreglos de bugs en la terminal', value: terminalbugfixes},
                {name: 'Problemas de la terminal', value: terminalissues},

                {name: '\u200B', value: '\u200B'},

                {name: 'Nuevas caracteristicas', value: newfeatures},
                {name: 'Arreglos de bugs', value: bugfixes},
                {name: 'Problemas', value: issues},
                {name: 'Por hacer', value: todo}
            )
            .setFooter('Versión de la terminal: ' + terminalver + ' | Versión de Sanic Bot: ' + activityname)
            message.reply({
                embeds: [changelogembed]
            });

            executedcmdslist[1].exectimes++;
            executedcmdslist[1].lastusertoexec = message.author.tag;

            executedcmdslist[0].latestexc = false;
            executedcmdslist[1].latestexc = true;
            executedcmdslist[2].latestexc = false;
        break;

        case 'play':
            const { channel } = message.member.voice;

            if(!channel) return message.reply('Necesitas estar en un canal de voz!');
            const permissions = channel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT')) return message.reply('No tienes los permisos correctos');
            if(!permissions.has('SPEAK')) return message.reply('No tienes los permisos correctos');
            if(!args[1]) return message.reply('Necesitas añadir un link o poner una frase para buscar la música');

            let VoiceConnection = Voice.joinVoiceChannel({channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator});

            const videoFinder = async(query) => {
                const videoResult = await ytSearch(query);

                return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(args.join(' '));
            
            if(video) {
                const streamurl = ytdl(video.url, {filter: 'audioonly'});

                const resource = Voice.createAudioResource(streamurl, {inlineVolume: true});
                resource.volume.setVolume(0.2);
                const player = Voice.createAudioPlayer();
                VoiceConnection.subscribe(player);
                player.play(resource);

                const funnyvidembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Ahora reproduciendo ***${video.title}***`)
                .setDescription(video.description)
                .setImage(video.image)
                .setAuthor(video.author.name)
                .setURL(video.url);

                await message.channel.send({embeds: [funnyvidembed]});
                formusicstuff[0].curplayingmusic = true;

            } else {
                const funnynoresultsfound = new Discord.MessageEmbed()
                .setTitle('No se han encontrado resultados');

                message.channel.send({ embeds: [funnynoresultsfound]});
            }
        break;

        case 'stop':
            const whythefuckitisntworking = message.member.voice;
            const connection = Voice.getVoiceConnection(whythefuckitisntworking.guild.id);

            if(!whythefuckitisntworking.channel) return message.reply('Necesitas estar en un canal de voz para poder parar de reproducir música!');
            //I'm really fucking sorry for this if condition
            if(formusicstuff[0].curplayingmusic == false) return message.reply('No estoy reproduciendo música actualmente'); 
            if(Voice.VoiceConnectionStatus.Ready || formusicstuff[0].curplayingmusic == true){
                const funnystopmusicsad = new Discord.MessageEmbed()
                .setTitle('Parando de reproducir música :pensive:');

                await message.channel.send({ embeds: [funnystopmusicsad]});
                connection.destroy();
                formusicstuff[0].curplayingmusic = true;
            }
        break;
        
        //no se porque todo tiene que ser un embed pero esta bastante guapo ngl
        case 'ayuda':
            const helpembed = new Discord.MessageEmbed()
            .setTitle('Menú de ayuda')
            .setDescription('comandos rotos a veces supongo')
            .addFields(
                {name: 'ping', value: 'pa ver si funciona o esta activo supongo'},
                {name: 'cambios', value: 'para ver los ultimos cambios/actualizaciones del bot'},
                {name: 'play <cosa que buscar/link>', value: 'para reproducir musica, a veces crashea el bot debido a que se salta 5 frames de la cancion'},
                {name: 'stop', value: 'desconectarse y parar de reproducir musica'},
            )
            .setFooter('a');
            message.reply({
                embeds: [helpembed]
            });
        break;
    }
})

client.login(token);