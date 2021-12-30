import LoaderThingy from './LoaderHelper/LoaderList';
import { Logger } from './Logger';
import TerminalConfig from './Config/TerminalConfig.json'
import { SettingsHelper } from './LoaderHelper/SettingsHelper';

export async function InitLoad(){
    //this just calls every load function
    await LoadSettings().then(() => {
        if(LoaderThingy[0].SettingsLoaded == true){ Logger('Finished Loading Settings', 4); }
    })
}

async function LoadSettings(){
    //now its the time where it comes the stupid logic lol
    //note after doing the whole for thingy, i thought i was able to access the json option number field thingy but i cant lol 
    Logger(TerminalConfig.AmountOfOptions, 3);
    for(let funny = 1; funny < TerminalConfig.AmountOfOptions + 1; funny++)
    {
        SettingsHelper(funny);
    }
    return LoaderThingy[0].SettingsLoaded = true;
}