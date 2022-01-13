//#region stuff
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {token, app_id, guild_id} from './Config/Secrets.json';
import { Logger } from './Logger';
import { ReturnFields, ReturnAmountOfCommands , ReturnCommandName, ReturnCommandDescription } from './Returner';

const commands:any[]= [];

var TheThing = ReturnAmountOfCommands();

for(let haha = 1; haha < TheThing + 1; haha++)
{
    var Field = ReturnFields("Commands", haha);
    var CommandName = ReturnCommandName(Field);
    var CommandDesc = ReturnCommandDescription(Field);
    const struct = {
        name: CommandName,
        description: CommandDesc
    }
    commands.push(struct);
}
//#endregion

const rest = new REST({version: '9'}).setToken(token);

export async function Refresh() {
    try{
        Logger("Started refreshing application (/) commands.", "INFO");

        await rest.put(Routes.applicationGuildCommands(app_id, guild_id), {
            body: commands,
        });

        Logger("Reloaded application (/) commands", "SUCCESSFUL")
    } catch (error) {
        Logger(error, "ERROR");
    }
}