import TermConfigJSON from '../Config/TerminalConfig.json'
import { Logger } from '../Logger';
import { ReturnConfigFields, ReturnOption, ReturnOptState, ReturnOptValue } from '../Returner';

export async function InitFunctions() {
    for(let uh = 1; uh < TermConfigJSON.AmountOfOptions + 1; uh++)
    {
        var JSONFields = ReturnConfigFields(uh);
        var OptionName = ReturnOption(JSONFields);
        var OptionState = ReturnOptState(JSONFields);
        var OptionValue = ReturnOptValue(JSONFields);

        switch(OptionName) //hardcoded because if it detects another setting that contains the enabled/disabled state it will do the same exact thing or the setting function thingy
        {
            case "clear console on startup":
                switch(OptionState)
                {
                    case "enabled": //case sensitive detection gonna suck a fat dick
                        Logger("clear console on", "DEBUG");
                        break;
                    case "disabled":
                        Logger("clear console off", "DEBUG");
                        break;
                    default:
                        Logger("The fuck??, cant get that state", "ERROR");
                }
                break;
        }

        /*
        let TermConf:any = TermConfigJSON.Options;
        if(TermConf[uh].option! == Config[uh].option!) //????? another check just in case or something bruh
        {
            if(Config[uh].state! == "enabled") //will make some case sentive check soon, lazy to do rn
            {
                console.clear();
            }
        }*/
    }
}