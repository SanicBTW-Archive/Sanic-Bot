//#region Imports
import LoaderThingy from './LoaderHelper/LoaderList';
import { Logger } from './Logger';
import TermConfigJSON from './Config/TerminalConfig.json'
import TermConfigList from './TerminalHelper/ConfigList';
import { ReturnOption, ReturnOptState, ReturnOptValue, ReturnFields } from './Returner';
//#endregion

export async function InitLoad(){
    await LoadSettings().then(() => {
        if(LoaderThingy[0].SettingsLoaded == true){ Logger('Finished Loading Settings', 'SUCCESSFUL'); }
    })
    return LoaderThingy[0].EverythingLoaded = true;
}

async function LoadSettings(){
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
        Logger("Loading Settings " + LoadIndicator, "INFO");
        OptionList = OptionJSON;
        StateList = StateJSON;
        ValueList = ValueJSON;
        //#endregion
    }
    return LoaderThingy[0].SettingsLoaded = true;
}
