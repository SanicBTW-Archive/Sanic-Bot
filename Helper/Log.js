//to make stuff better or something ig
//this is just console.log but with specified colors and log levels n that
//will improve this later

const clc = require('cli-color');

class Log {
    constructor(message, loglvl) {
        this.message = message;
        this.loglvl = loglvl;

        const infocolor = clc.greenBright;
        const succcolor = clc.cyan;
        const debugcolor = clc.cyanBright;
        const warningcolor = clc.yellowBright;
        const errorcolor = clc.redBright.bold;

        var LogLevels = [
            { level: "Info"},
            { level: "Successful!"},
            { level: "Debug"},
            { level: "Warning"},
            { level: "Error"}
        ]

        switch(loglvl)
        {
            case 0: //Info
                console.log(infocolor(LogLevels[0].level) + ": " + message);
                break;
            case 1: //Successful, prob unnecesary af
                console.log(succcolor(LogLevels[1].level) + ": " + message);
                break;
            case 2: //Debug, 
                //I should make it that this only works when the debug log option is enabled instead of bloating the code with if debuglogs.state == "Enabled"
                console.log(debugcolor(LogLevels[2].level) + ": " + message);
                break;
            case 3: //Warning
                console.log(warningcolor(LogLevels[3].level) + ": " + message);
                break;
            case 4: //Error
                console.log(errorcolor(LogLevels[4].level) + ": " + message);
                break;

            default:
                console.log("You may need to set a log level to correctly use this");
                break;
        }
    }
}

module.exports = { Log };