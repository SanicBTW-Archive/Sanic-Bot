//#region Imports
import LoaderThingy from './LoaderHelper/LoaderList';
import { Logger } from './Logger';
import TermConfigJSON from './Config/TerminalConfig.json'
import TermConfigList from './TerminalHelper/ConfigList';
import { ReturnOption, ReturnOptState, ReturnOptValue, ReturnFields } from './LoaderHelper/ConfigReturns';
//#endregion

//clean the comments lol, i will clean up some comments after the next push lol
export async function InitLoad(){
    //this just calls every load function
    await LoadSettings().then(() => {
        if(LoaderThingy[0].SettingsLoaded == true){ Logger('Finished Loading Settings', 4); }
    })
    return LoaderThingy[0].EverythingLoaded = true;
}

async function LoadSettings(){
    //Logger(TermConfigJSON.AmountOfOptions, 3); //it has the control of everything, will give an error if it cant find the specified number slot or something
    
    //var what = DoTheLoadCount(); removed due to not working properly
    
    for(let funny = 1; funny < TermConfigJSON.AmountOfOptions + 1; funny++)
    {
        const LoadIndicator = `${funny}/${TermConfigJSON.AmountOfOptions}`; //amount of settings loaded and left to load ig

        //#region Starting up
        var MainJSON = ReturnFields(funny, false); //yoooooooooo it actually fucking works too lol
        var OptionJSON = ReturnOption(MainJSON);
        var StateJSON = ReturnOptState(MainJSON);
        var ValueJSON = ReturnOptValue(MainJSON);

        //i love how it works
        var MainList = ReturnFields(funny, true);
        var OptionList = ReturnOption(MainList);
        var StateList = ReturnOptState(MainList);
        var ValueList = ReturnOptValue(MainList);
        //#endregion

        //#region Loading stuff and more ig
        Logger("Loading Settings " + LoadIndicator, 0);
        OptionList = OptionJSON;
        StateList = StateJSON;
        ValueList = ValueJSON;
        //#endregion
    }
    return LoaderThingy[0].SettingsLoaded = true;
}
