//#region stuff
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {token, app_id, guild_id} from './Config/Secrets.json';
import { Logger } from './Logger';
import fs from 'fs';
import path from 'path'

const commands:any[]= [];

var the = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(the).filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
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