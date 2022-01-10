//#region stuff
import TermConfigJSON from './Config/TerminalConfig.json';
import { Logger } from './Logger';
import Discord from 'discord.js';
import DiscordConfig from './Config/DiscordConfig.json';
//#endregion

export function ReturnConfigFields(index:number):any{
    let TermConf:any = TermConfigJSON.Options;
    return TermConf[index];    
}

export function ReturnOption(AccessToFields:any):string{
    try{
        if(AccessToFields.option != null) { return AccessToFields.option!}
    } catch(w){
        throw Logger("Couldn't get the option (name)", "ERROR");
    }
    return "";
}

export function ReturnOptState(AccessToFields:any):string{
    //it doesnt seem to access this part of the code as the ConfigFunctions file has control over the states and shit
    /*
    try{
        if(AccessToFields.state != null ) { return AccessToFields.state!}
    } catch(a){
        throw Logger("Couldn't get the option state", "ERROR");
    }*/
    return AccessToFields.state!;
}

export function ReturnOptValue(AccessToFields:any):string{
    return AccessToFields.value!;
}

//lost idea, guess ill come back to it later or something
/*
export function ReturnDiscordStatus(params:Discord.PresenceStatusData) {
    DiscordConfig.BotStatus
    return params;
}*/