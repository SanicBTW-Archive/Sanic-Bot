//#region stuff
import TermConfigJSON from './Config/TerminalConfig.json';
import { Logger } from './Logger';
import TermConfigList from './TerminalHelper/ConfigList';
//#endregion

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

export function ReturnOption(AccessToFields:any):string{
    return AccessToFields.option!;
}

export function ReturnOptState(AccessToFields:any):string{
    return AccessToFields.state!;
}

export function ReturnOptValue(AccessToFields:any):string{
    return AccessToFields.value!;
}