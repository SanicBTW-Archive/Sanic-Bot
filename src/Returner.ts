//#region stuff
import TermConfigJSON from './Config/TerminalConfig.json';
import { Logger } from './Logger';
import Discord from 'discord.js';
import DiscordConfig from './Config/DiscordConfig.json';
import Commands from './Data/Commands.json';

enum FieldTypes //lol field types m
{
    "Config",
    "Commands"
}

type FieldType = keyof typeof FieldTypes;
//todo, improve this or something
//#endregion

export function ReturnFields(type:FieldType,index:number):any { //used for everything lol
    switch(type)
    {
        case "Config":
            let TermConf:any = TermConfigJSON.Options;
            return TermConf[index];
        case "Commands": //ig it works
            let FunnyCmds:any = Commands;
            return FunnyCmds[index];
        default:
            Logger("oops cant get that field type", "ERROR");
    }
}

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

//lost idea, guess ill come back to it later or something
/*
export function ReturnDiscordStatus(params:Discord.PresenceStatusData) {
    DiscordConfig.BotStatus
    return params;
}*/

export function ReturnCommandName(AccessToCMDSFields:any):string {
    return AccessToCMDSFields.name!;
}

export function ReturnCommandDescription(AccessToCMDSFields:any):string {
    return AccessToCMDSFields.description!;
}

export function ReturnAmountOfCommands():number {
    return Commands.AmountOfCMDS;
}