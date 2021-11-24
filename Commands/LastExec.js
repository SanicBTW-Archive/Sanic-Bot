const { executedcmdslist } = require('../Helper/Lists');
const { Log } = require('../Helper/Log');
const clc = require('cli-color');

class RegLastCMD {
    constructor(command, message){
        //Exectimes will always be increased by one
        this.command = command; //What command was executed
        //The command has to be from a list or it will be unable to access the necessary list entries

        this.message = message; //The message to acccess the author.tag

        command.exectimes++;
        command.lastusertoexec = message.author.tag

        //kind of stupid
        switch(command)
        {
            case executedcmdslist[0]:
                this.SetBoolsFor(executedcmdslist[0]);
                break;
            case executedcmdslist[1]:
                this.SetBoolsFor(executedcmdslist[1]);
                break;
            case executedcmdslist[2]:
                this.SetBoolsFor(executedcmdslist[2]);
                break;
            case executedcmdslist[3]:
                this.SetBoolsFor(executedcmdslist[3]);
                break;
            case executedcmdslist[4]:
                this.SetBoolsFor(executedcmdslist[4]);
                break;
            case executedcmdslist[5]:
                this.SetBoolsFor(executedcmdslist[5]);
                break;
        }
    }
    SetBoolsFor(command){
        this.command = command;

        //more stupid lol
        switch(command)
        {
            case null:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[0]:
                executedcmdslist[0].latestexc = true;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[1]:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = true;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[2]:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = true;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[3]:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = true;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[4]:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = true;
                executedcmdslist[5].latestexc = false;
                break;
            case executedcmdslist[5]:
                executedcmdslist[0].latestexc = false;
                executedcmdslist[1].latestexc = false;
                executedcmdslist[2].latestexc = false;
                executedcmdslist[3].latestexc = false;
                executedcmdslist[4].latestexc = false;
                executedcmdslist[5].latestexc = true;
                break;
        }
    }
}

class LastExecMenu {
    constructor() {
        if(executedcmdslist[0].latestexc == true){
            console.log('The following command "' + clc.yellow(`${executedcmdslist[0].sprcmd}`) + '"')
            console.log('It has been executed ' + clc.cyan(`${executedcmdslist[0].exectimes} times`))
            console.log('Last user to execute the command ' + clc.cyan(`${executedcmdslist[0].lastusertoexec}`))
        } else if (executedcmdslist[1].latestexc == true){
            console.log('The following command "' + clc.yellow(`${executedcmdslist[1].sprcmd}`) + '"')
            console.log('It has been executed ' + clc.cyan(`${executedcmdslist[1].exectimes} times`))
            console.log('Last user to execute the command ' + clc.cyan(`${executedcmdslist[1].lastusertoexec}`))
        }
    }
}

module.exports = { RegLastCMD, LastExecMenu }