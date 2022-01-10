//#region stuff
import TermConfigJSON from './Config/TerminalConfig.json';
import { Logger } from './Logger';
//#endregion

export function ReturnConfigFields(index:number):any{
    let TermConf:any = TermConfigJSON.Options;
    return TermConf[index];    
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