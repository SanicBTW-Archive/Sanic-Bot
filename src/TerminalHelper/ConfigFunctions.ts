import TermConfigJSON from '../Config/TerminalConfig.json'
import { Logger } from '../Logger';
import { ReturnFields, ReturnOption, ReturnOptState, ReturnOptValue } from '../Returner';

export async function InitFunctions() {
    for(let uh = 1; uh < TermConfigJSON.AmountOfOptions + 1; uh++)
    {
        var JSONFields = ReturnFields("Config",uh);
        var OptionName = ReturnOption(JSONFields);
        var OptionState = ReturnOptState(JSONFields);
        var OptionValue = ReturnOptValue(JSONFields);

        switch(OptionName) //hardcoded because if it detects another setting that contains the enabled/disabled state it will do the same exact thing or the setting function thingy
        {
            case "clear console on startup":
                switch(OptionState)
                {
                    case "enabled": //case sensitive detection gonna suck a fat dick
                        console.clear();
                        break;
                    case "disabled":
                        //do nothing lol
                        break;
                    default:
                        Logger("The fuck??, cant get that state", "ERROR");
                }
                break;
            case "console title":
                if(OptionValue != null) { process.title = OptionValue; }
                break;
        }
    }
}