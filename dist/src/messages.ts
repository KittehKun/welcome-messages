import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod"; //Imports interface to load Database from the Server
import { ILogger } from "@spt-aki/models/spt/utils/ILogger"; //Imports console logger
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor"; //Imports text color for logger
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"; //Imports Database from the Server

class Mod implements IPostDBLoadMod
{

    private messages = require("../config/messages.json");

    // Code added here will load BEFORE the server has started loading
    public postDBLoad(container: DependencyContainer): void {

        //Variables
        const maxNumberEn = this.messages.Messages.length;
        const randomNumber = Math.floor(Math.random() * maxNumberEn);
        const message = this.messages.Messages[randomNumber];

        //Resolve Functions
        const logger = container.resolve<ILogger>("WinstonLogger"); //Get the logger from the server container
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        
        //Functions
        logger.info("Loading: ~| Kitteh's Welcome Messages |~"); //Notify of mod load
        
        //Main Logic
        const tables = databaseServer.getTables(); //Get Database from the Server
        const LOCALES_EN = tables.locales.global.en.interface;

        const textBase = "Attention! This is a Beta version of Escape from Tarkov for testing purposes.";
        LOCALES_EN[textBase] = "Message of the Day!"; //Replaces title of Orange Box with motd
        const messageBodyBase = "NDA free warning";
        LOCALES_EN[messageBodyBase] = message; //Replaces the Orange Box's text with the mod;

    }
}

//Compile mod
module.exports = { mod: new Mod() }