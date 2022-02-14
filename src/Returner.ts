//#region stuff
import TermConfigJSON from './Config/TerminalConfig.json';
import { Logger } from './Logger';
import Discord from 'discord.js';
import DiscordConfig from './Config/DiscordConfig.json';
//import Commands from './Data/Commands.json';

//todo, improve this or something
enum FieldTypes //lol field types m
{
    "Config",
}

type FieldType = keyof typeof FieldTypes;
//#endregion

export function ReturnFields(type:FieldType,index:number):any { //used for everything lol
    switch(type)
    {
        case "Config":
            let TermConf:any = TermConfigJSON.Options;
            return TermConf[index];
        default:
            Logger("oops cant get that field type", "ERROR");
    }
}

//#region config returns ig
export function ReturnOption(AccessToConfFields:any):string{
    try{
        if(AccessToConfFields.option != null) { return AccessToConfFields.option!}
    } catch(w){
        throw Logger("Couldn't get the option (name)", "ERROR");
    }
    return "";
}

export function ReturnOptState(AccessToConfFields:any):string{
    //it doesnt seem to access this part of the code as the ConfigFunctions file has control over the states and shit
    /*
    try{
        if(AccessToFields.state != null ) { return AccessToFields.state!}
    } catch(a){
        throw Logger("Couldn't get the option state", "ERROR");
    }*/
    return AccessToConfFields.state!;
}

export function ReturnOptValue(AccessToConfFields:any):string{
    return AccessToConfFields.value!;
}
//#endregion

//#region discord stuff returns
export function ReturnDiscordStatus():Discord.PresenceStatusData {
    var lmao:any = DiscordConfig.BotStatus; //thanks any, i hate this sometimes
    return lmao;
}
//the commands stuff was removed due to me actually understanding how the slash command builder works now
//#endregion