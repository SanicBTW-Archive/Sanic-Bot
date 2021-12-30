import Config from "./ConfigList";
import TermConfigJSON from '../Config/TerminalConfig.json'


export async function InitFunctions(DoneLoading?:boolean) {
    if(DoneLoading == true) //stupid thingy, to doble check or something lol
    {
        //uses the same logic as the loader, i just couldnt think of another way lol
        for(let uh = 1; uh < TermConfigJSON.AmountOfOptions + 1; uh++)
        {
            let TermConf:any = TermConfigJSON.Options;
            if(TermConf[uh].option! == Config[uh].option!) //????? another check just in case or something bruh
            {
                if(Config[uh].state! == "enabled") //will make some case sentive check soon, lazy to do rn
                {
                    console.clear();
                }
            }
        }
    }
}