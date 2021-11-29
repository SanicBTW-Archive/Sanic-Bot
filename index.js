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
const { SettingsMenuEntry, optionlist } = require('./Commands/Settings');

const { Log } = require('./Helper/Log');
const { CheckFiles } = require('./Helper/CheckFiles');

const { token } = require('./Config/DiscToken.json');

const { prefix, activityname, thingypresencestatus,
    mainaccowner, oldmainaccowner } = require('./Config/DiscordSettings.json');

const { executedcmdslist, defaultembedcolor, channelidslist, formusicstuff, quotesoptions } = require('./Helper/Lists');

const { terminalver } = require('./Helper/changelog.json');
//#endregion    

new CheckFiles("TerminalSettings");
new CheckFiles("ChannelIDS");

//#region More Imports due to code order execution
//I have to load this after the check files stuff due to the code execution order
const TerminalSettings = require('./Config/TerminalSettings.json');
const { Load } = require('./Helper/Loader');
const { SendMenuHelp, SendHelper } = require('./Commands/Send');
const { AddHelper, RestoreHelper } = require('./Helper/ChannelIDS');
const { RegLastCMD, LastExecMenu } = require('./Commands/LastExec');

//#endregion

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

//#endregion

client.on('ready', () => {
    //#region Load Terminal settings/stuff
    new Load("Options");

    if (optionlist[0].state.includes("Enabled")) {
        console.clear();
    }

    if (optionlist[2].state.includes("Enabled")) {
        process.title = TerminalSettings.consoletitleoption.value + " " + terminalver;
    } else {
        process.title = TerminalSettings.consoletitleoption.value;
    }

    new Load("Channel IDS");

    client.user.setPresence({
        activities: [{
            name: activityname
        }], status: thingypresencestatus
    });
    //#endregion

    new Log(`Logged in as ${client.user.tag}`, 0);
    new Log("Currently using a custom command handler", 0);

    //Set the fucking curplayingmusic thingy to false, using the lists.js from the Helper folder
    formusicstuff[0].curplayingmusic = false;

    //#region Terminal Commands
    if (optionlist[3].state.includes("Enabled"))
    {
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
                            if (newprsncname.length > 0) {

                                if (prsncstatus == "online" || prsncstatus == "idle" || prsncstatus == "dnd") {
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
                    if (client.ws.ping > "150")
                        console.log('The current ping is: ' + clc.red(`${client.ws.ping}ms`))
                    else if (client.ws.ping > "100")
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

                            if (msgcont.length > 0) {
                                switch (selectedchnlid) {
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
                                if (selectedchnlid.toString().length == 18) {
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
                    new SettingsMenuEntry(optionlist[3].option, 'Literally toggles the console usage, warning if you disable this\nyou will need to enable it through the json file or through the bot', optionlist[3].state, null);
                    new SettingsMenuEntry(optionlist[4].option, 'Show debug logs when using the bot', optionlist[4].state, null);

                    rl.question('Do you wish to modify some setting? (y/n) ', (confirmation) => {
                        switch (confirmation) {
                            case 'y':
                                rl.question('What option do you want to modify? ', (modifyopt) => {
                                    switch (modifyopt) {
                                        //for the first option
                                        case optionlist[0].option:
                                            rl.question('Do you want to enable or disable this option? ', (newoptstate) => {
                                                switch (newoptstate) {
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
                                                if (newconsoletitle.length > 0 && newconsoletitle.length != null) {
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
                                                switch (newoptstate) {
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
                                                switch (newoptstate) {
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
                                                switch (newoptstate) {
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

                                        default:
                                            console.log(clc.red('Maybe you should provide an option to modify lol'));
                                            rl.prompt();
                                            break;
                                    }
                                })
                                break;

                            default:
                                rl.prompt();
                                break;
                        }
                    })
                    break;

                case 'restore settings':
                    rl.question('Are you sure that you want to restore the Terminal Settings? (y/n) ', (restoreconf) => {
                        switch (restoreconf) {
                            case 'y':
                                new Log("Restoring Terminal Settings...", 3);
                                optionlist[0].state = 'Disabled';
                                optionlist[1].value = 'Sanic Bot Terminal';
                                optionlist[2].state = 'Enabled';
                                optionlist[3].state = 'Enabled';
                                optionlist[4].state = 'Disabled';
                                new Log("Terminal Settings Restored! Restart the console to apply the changes", 1);
                                rl.prompt();
                                break;

                            default:
                                rl.prompt();
                                break;
                        }
                    })
                    break;

                case 'add channelid':
                    rl.question('Please enter the Channel Name: ', (chnlidname) => {
                        if (chnlidname.length > 0) {
                            rl.question('Please enter the Channel ID: ', (chnlid) => {
                                if (chnlid.length == 18) {
                                    rl.question('Where do you want to save this info? (0 to 20): ', (wheretosave) => {
                                        switch (wheretosave) {
                                            case "0":
                                                new AddHelper(channelidslist[0], chnlidname, chnlid, rl);
                                                break;

                                            case "1":
                                                new AddHelper(channelidslist[1], chnlidname, chnlid, rl);
                                                break;

                                            case "2":
                                                new AddHelper(channelidslist[2], chnlidname, chnlid, rl);
                                                break;

                                            case "3":
                                                new AddHelper(channelidslist[3], chnlidname, chnlid, rl);
                                                break;

                                            case "4":
                                                new AddHelper(channelidslist[4], chnlidname, chnlid, rl);
                                                break;

                                            case "5":
                                                new AddHelper(channelidslist[5], chnlidname, chnlid, rl);
                                                break;

                                            case "6":
                                                new AddHelper(channelidslist[6], chnlidname, chnlid, rl);
                                                break;

                                            case "7":
                                                new AddHelper(channelidslist[7], chnlidname, chnlid, rl);
                                                break;

                                            case "8":
                                                new AddHelper(channelidslist[8], chnlidname, chnlid, rl);
                                                break;

                                            case "9":
                                                new AddHelper(channelidslist[9], chnlidname, chnlid, rl);
                                                break;

                                            case "10":
                                                new AddHelper(channelidslist[10], chnlidname, chnlid, rl);
                                                break;

                                            case "11":
                                                new AddHelper(channelidslist[11], chnlidname, chnlid, rl);
                                                break;

                                            case "12":
                                                new AddHelper(channelidslist[12], chnlidname, chnlid, rl);
                                                break;

                                            case "13":
                                                new AddHelper(channelidslist[13], chnlidname, chnlid, rl);
                                                break;

                                            case "14":
                                                new AddHelper(channelidslist[14], chnlidname, chnlid, rl);
                                                break;

                                            case "15":
                                                new AddHelper(channelidslist[15], chnlidname, chnlid, rl);
                                                break;

                                            case "16":
                                                new AddHelper(channelidslist[16], chnlidname, chnlid, rl);
                                                break;

                                            case "17":
                                                new AddHelper(channelidslist[17], chnlidname, chnlid, rl);
                                                break;

                                            case "18":
                                                new AddHelper(channelidslist[18], chnlidname, chnlid, rl);
                                                break;

                                            case "19":
                                                new AddHelper(channelidslist[19], chnlidname, chnlid, rl);
                                                break;

                                            case "20":
                                                new AddHelper(channelidslist[20], chnlidname, chnlid, rl);
                                                break;
                                        } //End of the switch
                                    })
                                } else {
                                    new Log("This doesn't look like a Channel ID\n(Channel ID must be 18 characters long)", 3);
                                    rl.prompt();
                                }
                            })
                        } else {
                            new Log("Please provide a longer name", 3);
                            rl.prompt();
                        }
                    })

                    break;

                case 'restore channelids':
                    rl.question('Are you sure that you want to restore the Channel IDS json? (y/n) ', (restoreconf) => {
                        switch (restoreconf) {
                            case 'y':
                                new Log("Restoring the Channel IDS...", 3);

                                new RestoreHelper();

                                new Log("Channel IDS Restored! Restart the console to apply the changes", 1);
                                rl.prompt();
                                break;

                            default:
                                rl.prompt();
                                break;
                        }
                    })
                    break;

                case 'last executed':
                    new LastExecMenu();
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

            const useconsole = {
                "option": optionlist[3].option,
                "state": optionlist[3].state,
            }

            const debuglogs = {
                "option": optionlist[4].option,
                "state": optionlist[4].state
            }

            const alltogetherig = {
                clearconsoleoptions,
                consoletitleoption,
                displaytermveroption,
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

            try {
                new Log("Trying to save the Terminal Settings", 0);
                fs.writeFileSync(__dirname + '/Config/TerminalSettings.json', fixedoptionsig);
                new Log("Saved Terminal Settings", 1);
                new Log("Trying to save the Channel IDS", 0);
                fs.writeFileSync(__dirname + "/Helper/ChannelIDS.json", fixedchannelidsig);
                new Log("Saved Channel IDS", 1);
                new Log("Saved Everything", 1);
                new Log("Proceeding with the shutdown", 0);
            } catch (error) {
                console.error(error);
            }

            new Log("Shutting down Sanic Bot", 3);
            client.destroy();
            if(TerminalSettings.debuglogs.state == "Enabled"){
                new Log("Client Destroyed", 2);
            }
            new Log("Closing the console", 3);
            process.exit(0);
        });
    }
    //#endregion
});

client.on('messageCreate', async (message) => {
    //Workin on a custom command handler thingy ig, not the best one neither the worst
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.substring(prefix.length).split(" ");

    if(args[0] === "ping")
    {
        const calcping = new Discord.MessageEmbed()
        .setTitle('Calculando el ping del bot...');

        message.reply({
            embeds: [calcping]
        }).then(resultMessage => {
            const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;

            const pingresult = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
            ).setColor('#008000');

            resultMessage.edit({
                embeds: [pingresult]
            });
        });

        new RegLastCMD(executedcmdslist[0], message);
    }
    else if (args[0] === "play")
    {
        //why is this crashing?
        //also fun fact, this code is really bad and its based off a cheat sheet from a guide
        //some of the code was also based off some video i found about making a bot to play songs
        //also it has more code designed for older versions of discord.js and etc
        //guess ill have to fix this sooner or later
        const { channel } = message.member.voice;

        if (!channel) return message.reply('Necesitas estar en un canal de voz!');
        const permissions = channel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.reply('No tienes los permisos necesarios');
        if(!permissions.has('SPEAK')) return message.reply('No tienes los permisos necesarios');
        if(!args[1]) return message.reply('Necesitas poner un argumento más (Link de youtube o algo para buscar)');
        let VoiceConnection = Voice.joinVoiceChannel
        ({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video)
        {
            const streamurl = ytdl(video.url, { filter: 'audioonly'});

            if(formusicstuff[0].repeat == true) formusicstuff[0].repeaturl = video.url;
            const resource = Voice.createAudioResource(streamurl, {inlineVolume: true});
            resource.volume.setVolume(0.2);
            const player = Voice.createAudioPlayer();
            VoiceConnection.subscribe(player);
            player.play(resource);

            const funnyvidembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Ahora reproduciendo ***${video.title}***`)
            .setDescription(video.description)
            .setAuthor(video.author.name)
            .setURL(video.url)
            .setFooter(`Música solicitada por ${message.author.tag} | Cambiando este mensaje`);

            await message.channel.send({embeds: [funnyvidembed]});
            formusicstuff[0].curplayingmusic = true;
        } else {
            const funnynoresultsfound = new Discord.MessageEmbed()
            .setTitle('No se ha encontrado ningún resultado relacionado a: ' + message.toString().replace("s?play ", ""));
            message.channel.send({embeds: [funnynoresultsfound]});
        }
        new RegLastCMD(executedcmdslist[1], message);

    }
    else if (args[0] === "stop")
    {
        const whythefuckitisntworking = message.member.voice;
        const connection = Voice.getVoiceConnection(whythefuckitisntworking.guild.id);

        if(!whythefuckitisntworking.channel) return message.reply('Necesitas estar en un canal de voz para poder parar la música');
        //I'm sorry for this if condition
        if(formusicstuff[0].curplayingmusic == false) return message.reply('No estoy reproduciendo música actualmente');
        if(Voice.VoiceConnectionStatus.Ready || formusicstuff[0].curplayingmusic == true)
        {
            const funnystopmusic = new Discord.MessageEmbed()
            .setTitle('Parando la reproducción de la música actual :pensive:')
            .setFooter('Solicitado por: ' + message.author.tag);

            await message.channel.send({ embeds: [funnystopmusic]});
            connection.destroy();
            formusicstuff[0].curplayingmusic = false;
        }
        new RegLastCMD(executedcmdslist[2], message);
    }
    else if (args[0] === "ayuda")
    {
        //prob gonna do custom menu shit
        const helpembed = new Discord.MessageEmbed()
        .setTitle('Menú de ayuda')
        .setDescription('comandos rotos a veces supongo\n[] - Opcional, <> - Requerido')
        .addFields(
            { name: 'ping', value: 'pa ver si funciona o esta activo supongo' },
            { name: 'cambios', value: 'para ver los ultimos cambios/actualizaciones del bot' },
            { name: 'play <cosa que buscar/link>', value: 'para reproducir musica, a veces crashea el bot debido a que se salta 5 frames de la cancion' },
            { name: 'stop', value: 'desconectarse y parar de reproducir musica' },
            { name: 'apagar [-f]', value: 'manda peti a la consola para apagar el bot, -f fuerza el apagado'},
            { name: 'preguntar consola <pregunta>', value: 'pregunta a la consola lo que quieras'}
        )
        .setFooter('a');
        message.reply({
            embeds: [helpembed]
        });
        new RegLastCMD(executedcmdslist[3], message);
    }
    else if (args[0] === "apagar")
    {
        if(!args[1])
        {
            const confirmationsent = new Discord.MessageEmbed()
            .setDescription('Una confirmación para apagar el bot ue enviada a la terminal, esperando a la respuesta');

            message.reply({ embeds: [confirmationsent]}).then(resultMessage => {
                const shutdownconfirmed = new Discord.MessageEmbed()
                .setDescription('El apagado fue confirmado por la terminal')
                .setColor('#008000');

                const shutdowndenied = new Discord.MessageEmbed()
                .setDescription('El apagado ha sido rechazado por la terminal')
                .setColor('#FF0000');

                new Log('The following user wants to shutdown the bot: ' + message.author.tag, 0);
                rl.question('Do you want to shutdown the bot? (y/n) ', (confirmation) => {
                    switch(confirmation)
                    {
                        case 'y':
                            resultMessage.edit({ embeds: [shutdownconfirmed]}).then(() => {
                                if(optionlist[4].state == "Enabled" || TerminalSettings.debuglogs.state == "Enabled") new Log("Closing everything due to confirming shutdown", 2);
                                rl.close();
                            });
                            break;

                        default:
                            resultMessage.edit({ embeds: [shutdowndenied]}).then(() => rl.prompt());
                            break;
                    }
                })
            })
        }
        else if (args[1] === "-f")
        {
            if(message.author.id === mainaccowner)
            {
                new Log("The following user is forcing the bot shutdown: " + message.author.tag, 0);
                const shutdownforced = new Discord.MessageEmbed()
                .setDescription('Forzando el apagado del bot');

                message.reply({ embeds: [shutdownforced]}).then((resultMessage) => {
                    new Log("Shutting down the bot in 20s", 3);
                    setTimeout(function(){rl.close()}, 20000);
                })
            }
            else
            {
                new Log("The following user tried to force the bot shutdown: " + message.author.tag, 0);
                message.reply('No tienes permiso para apagar el bot');
            }
        }
        new RegLastCMD(executedcmdslist[4], message);
    }
    else if (args[0] === "preguntar" && args[1] === "consola")
    { //dumb shitty fix
        if(args[2])
        {
            rl.question('The following user ' + message.author.tag + " asked: " + message.content.replace("s?preguntarcons ", "") + " ", (respuesta) => {
                new SendHelper(message.channelId, "Enviado desde la consola: " + respuesta, client);
                rl.prompt();
            });
        }
        new RegLastCMD(executedcmdslist[5], message);
    }
    else if (args[0] === "purge")
    {
        if(!args[1]) return message.reply("Necesitas un número de mensajes que eliminar (Ejemplo: s?purge 1)");
        else 
        {
            if(message.author.id === mainaccowner)
            {
                message.channel.bulkDelete(args[1]);

                const deletedmsgs = new Discord.MessageEmbed()
                .setTitle(`Se han eliminado ${args[1]} mensajes`)
                .setFooter(`Ejecutado por ${message.author.tag}`);

                message.channel.send({embeds: [deletedmsgs]}).then((resultMessage) => {
                    setTimeout(() => {
                        resultMessage.delete();
                    }, 1000);
                })
            }
            else
            {
                message.reply('No pareces tener permisos para eliminar mensajes');
            }
        }
        new RegLastCMD(executedcmdslist[6], message);
    }
    else if (args[0] === "add" && args[1] === "channelid")
    { //dumb fix actually
        //should check the funny thing in the add helper instead but alr
        switch(args[2])
        {
            case "0":
                new AddHelper(channelidslist[0], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 0');
                break;

            case "1":
                new AddHelper(channelidslist[1], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 1');
                break;

            case "2":
                new AddHelper(channelidslist[2], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 2');
                break;

            case "3":
                new AddHelper(channelidslist[3], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 3');
                break;

            case "4":
                new AddHelper(channelidslist[4], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 4');
                break;

            case "5":
                new AddHelper(channelidslist[5], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 5');
                break;

            case "6":
                new AddHelper(channelidslist[6], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 6');
                break;

            case "7":
                new AddHelper(channelidslist[7], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 7');
                break;

            case "8":
                new AddHelper(channelidslist[8], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 8');
                break;

            case "9":
                new AddHelper(channelidslist[9], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 9');
                break;

            case "10":
                new AddHelper(channelidslist[10], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 10');
                break;

            case "11":
                new AddHelper(channelidslist[11], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 11');
                break;

            case "12":
                new AddHelper(channelidslist[12], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 12');
                break;

            case "13":
                new AddHelper(channelidslist[13], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 13');
                break;

            case "14":
                new AddHelper(channelidslist[14], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 14');
                break;

            case "15":
                new AddHelper(channelidslist[15], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 15');
                break;

            case "16":
                new AddHelper(channelidslist[16], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 16');
                break;

            case "17":
                new AddHelper(channelidslist[17], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 17');
                break;

            case "18":
                new AddHelper(channelidslist[18], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 18');
                break;

            case "19":
                new AddHelper(channelidslist[19], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 19');
                break;

            case "20":
                new AddHelper(channelidslist[20], message.channel.name, message.channel.id, rl);
                message.channel.send('Información guardada en el espacio 20');
                break;

            default:
                message.channel.send("Especifica un espacio donde guardar la información")
        }
        new RegLastCMD(executedcmdslist[7], message);
    }
    else if (args[0] === "repetir")
    {
        if(args[1] === "activar")
        {
            if(formusicstuff[0].repeat == true)
            {
                formusicstuff[0].repeat = false;
                message.channel.send("Repetición desactivada");
            }
            else if (formusicstuff[0].repeat == false)
            {
                formusicstuff[0].repeat = true;
                message.channel.send("Repetición activada");
            }
        }
        else if (args[1] == "ahora" && formusicstuff[0].repeat == true)
        {
            //just funny copy paste modified
            const { channel } = message.member.voice;
            if (!channel) return message.reply('Necesitas estar en un canal de voz');
            const permissions = channel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT')) return message.reply('No tienes los permisos necesarios');
            if(!permissions.has('SPEAK')) return message.reply('No tienes los permisos necesarios');
            if(formusicstuff[0].repeaturl == null) return message.reply('No hay nada que repetir');   
            let VoiceConnection = Voice.joinVoiceChannel
            ({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });

            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query);

                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await videoFinder(formusicstuff[0].repeaturl);
    
            if(video)
            {
                const streamurl = ytdl(video.url, { filter: 'audioonly'});
    
                const resource = Voice.createAudioResource(streamurl, {inlineVolume: true});
                resource.volume.setVolume(0.2);
                const player = Voice.createAudioPlayer();
                VoiceConnection.subscribe(player);
                player.play(resource);
                const funnyvidembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Ahora reproduciendo ***${video.title}***`)
                .setDescription(video.description)
                .setAuthor(video.author.name)
                .setURL(video.url)
                .setFooter(`Música solicitada por ${message.author.tag} | Cambiando este mensaje`);

                await message.channel.send({embeds: [funnyvidembed]});
                formusicstuff[0].curplayingmusic = true;
            } else {
                //is this really necessary?
                const funnynoresultsfound = new Discord.MessageEmbed()
                .setTitle('No se ha encontrado ningún resultado relacionado a: ' + message.toString().replace("s?play ", ""));
                message.channel.send({embeds: [funnynoresultsfound]});
            }
        }
        else if (args[1] == "ahora" && formusicstuff[0].repeat == false)
        {
            message.reply("La repetición esta desactivada");
        }
        new RegLastCMD(executedcmdslist[8], message);
    }
})

client.login(token);