//stolen from my typescript test project
//i have a problem, if i only want to show debug logs when the setting is enabled then ill have a problem when trying to hide them when the logger is already running (idk how to explain)

import clc from 'cli-color';
import { ReturnFields, ReturnOptState} from './Returner';

let TheLogColorThingyIdk = ReturnFields("Config",3); //forced to check the log colors index number
let LogColorsState = ReturnOptState(TheLogColorThingyIdk);

let DebugThingy = ReturnFields("Config",2);
let DebugState = ReturnOptState(DebugThingy);

var infoColor = clc.greenBright;
var warningColor = clc.yellowBright;
var errorColor = clc.redBright.bold;
var debugColor = clc.cyanBright;
var succColor = clc.cyan;

enum LogLevels
{
    "INFO",
    "WARNING",
    "ERROR",
    "DEBUG",
    "SUCCESSFUL"
}

type LogLevelStrings = keyof typeof LogLevels;

export function Logger(message:any, key:LogLevelStrings)
{
    const theThing = `[ ${key} ] `;
    /* for debug purposes
    const num = LogLevels[key];
    console.log("log level key " + key);
    console.log("log level val " + num);
    console.log("log level message " + message);*/

    switch(key)
    {
        case 'INFO':
            if(LogColorsState == "enabled") return console.log(infoColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
        case 'WARNING':
            if(LogColorsState == "enabled") return console.warn(warningColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.warn(theThing + message);
            break;
        case 'ERROR': //just in case we terminate the process to prevent errors
            if(LogColorsState == "enabled") throw errorColor(theThing) + message;
            else if(LogColorsState == "disabled") throw theThing + message;
            break;
        case 'DEBUG':
            if(DebugState == "enabled")
            {
                if(LogColorsState == "enabled") return console.log(debugColor(theThing) + message);
                else if(LogColorsState == "disabled") return console.log(theThing + message);    
            }
            else
            {
                throw Logger("Can't show Debug logs if the option is disabled", "ERROR");
            }
            break;
        case 'SUCCESSFUL':
            if(LogColorsState == "enabled") return console.log(succColor(theThing) + message);
            else if(LogColorsState == "disabled") return console.log(theThing + message);
            break;
    }
}