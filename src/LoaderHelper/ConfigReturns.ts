//yooo is this the funny loader logic???
//#region stuff
import TermConfigJSON from '../Config/TerminalConfig.json';
import { Logger } from '../Logger';
import TermConfigList from '../TerminalHelper/ConfigList';
//#endregion
//also the rest of the functions used to have a commen explainin the thingy but they gone 

//idk if it works, ok it does, guess im going with this now
//check nº2 with the isList bool thingy, it works lets goooo
export function ReturnFields(index:number, isList?:boolean):any{
    if(isList != true)
    {
        let TermConf:any = TermConfigJSON.Options;
        return TermConf[index];    
    }
    else 
    {
        let TermConf:any = TermConfigList[index];
        return TermConf;
    }
}

/* first function of this file, sad to see you change bro
//called hopeless before, it returns the option name ig
export function ReturnOption(index:number):string{
    //so basically what does this do its just to get the option from the given index and returns it
    let TermConf:any = TermConfigJSON.Options;
    return TermConf[index].option;
}*/

//yeah i rewrote it lol
export function ReturnOption(AccessToFields:any):string{
    return AccessToFields.option!; //adding the ! just in case
}

export function ReturnOptState(AccessToFields:any):string{
    //probably this way was better than the one below
    /*let TermConf:any = TermConfigJSON.Options;
    return TermConf[index].state;*/

    return AccessToFields.state!; //adding the ! just in case
}

export function ReturnOptValue(AccessToFields:any):string{
    //saying the same for this one, probably this was a better way
    /*
    let TermConf:any = TermConfigJSON.Options;
    return TermConf[index].value;*/

    return AccessToFields.value!; //adding the ! just in case
}