//stolen from my typescript test project
//we have a problem, if i only want to show debug logs when the setting is enabled then ill have a problem when trying to hide them when the logger is already running (idk how to explain)

import clc from 'cli-color';

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

/**
 * 
 * @param message message to print
 * @param loglevel log level to use - 0 info, 1 warning, 2 error, 3 debug, 4 successful
 */
export function Logger(message:any, loglevel:number)
{
    switch(loglevel)
    {
        case 0:
            console.log(infoColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 1:
            console.log(warningColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 2:
            console.error(errorColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 3:
            console.log(debugColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
        case 4:
            console.log(succColor(`[ ${LogLevels[loglevel]} ] `) + message);
            break;
    }
}