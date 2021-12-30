//#region Imports
import LoaderThingy from './LoaderHelper/LoaderList';
import { Logger } from './Logger';
import TermConfigJSON from './Config/TerminalConfig.json'
import TermConfigList from './TerminalHelper/ConfigList';
//#endregion

//clean the comments lol
export async function InitLoad(){
    //this just calls every load function
    await LoadSettings().then(() => {
        if(LoaderThingy[0].SettingsLoaded == true){ Logger('Finished Loading Settings', 4); }
    })
}

async function LoadSettings(){
    Logger(TermConfigJSON.AmountOfOptions, 3); //it has the control of everything
    for(let funny = 1; funny < TermConfigJSON.AmountOfOptions + 1; funny++)
    {
        /* failed attempts or something, will remove after push
        let what:Array<any> = [];
        what.push(funny.toString());
        Logger("Array stuff: " + what, 3);
        what.forEach(function(value) {
            TerminalConfig.Options[value];
        })
        SettingsHelper(funny);*/

        //the logger thingy will get deleted after this push
        let TermConf:any = TermConfigJSON.Options;
        //the ! is to tell typescript that im sure that it wont return null
        Logger("JSON Option " + TermConf[funny].option!, 3);
        Logger("JSON State " + TermConf[funny].state!, 3);
        Logger("JSON Value " + TermConf[funny].value!, 3);
        Logger("Loading settings", 0);
        TermConfigList[funny].option! = TermConf[funny].option!;
        TermConfigList[funny].state! = TermConf[funny].state!;
        TermConfigList[funny].value! = TermConf[funny].value!;
        Logger("List Option " + TermConfigList[funny].option!, 3);
        Logger("List State " + TermConfigList[funny].state!, 3);
        Logger("List Value " + TermConfigList[funny].value!, 3);
    }
    return LoaderThingy[0].SettingsLoaded = true;
}
