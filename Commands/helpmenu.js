//Idk why I did this but it works I guess

//Hey for future me, if you figure out how to do args with readline add the reqargs into the constructor
const clc = require('cli-color');

class HelpMenuEntry {
    constructor(command, description){
        this.command = command;
        this.description = description;
        //this.reqargs = reqargs;

        /* I have to take a look into how to add args in readline so i can actually use this lol
        if(reqargs == "none" || reqargs == "None" || reqargs == null){
            console.log(clc.cyan(command) + " " + clc.white(description));
        } else {
            console.log(clc.cyan(command) + " " + clc.white(description) + "\nRequired args: " + clc.cyan(reqargs));
        }
        */
        //console.log(command + description);
        //console.log(clc.cyan(command) + clc.white(description));
        console.log(clc.cyan(command) + " " + clc.white(description));
    }
}

module.exports = { HelpMenuEntry }