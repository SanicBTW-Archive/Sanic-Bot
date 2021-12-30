import { Logger } from "../Logger";
import TerminalConfig from '../Config/TerminalConfig.json'

export function SettingsHelper(What:number) {
    switch(What)
    {
        case 1:
            return dothedebugthing(TerminalConfig.Options[1].option, TerminalConfig.Options[1].state, TerminalConfig.Options[1].value);
        case 2:
            return dothedebugthing(TerminalConfig.Options[2].option, TerminalConfig.Options[2].state, TerminalConfig.Options[2].value);
    }
}

//debug only lol
function dothedebugthing(arg1:any, arg2:any, arg3:any){
    Logger(arg1, 3);
    Logger(arg2, 3);
    Logger(arg3, 3);
}