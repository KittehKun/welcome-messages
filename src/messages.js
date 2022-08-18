"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogTextColor_1 = require("../../../../Aki_data/Server/lib/models/spt/logging/LogTextColor"); //Imports text color for logger
class Mod {
    constructor() {
        this.messages = require("../config/messages.json");
    }
    // Code added here will load BEFORE the server has started loading
    postDBLoad(container) {
        //Variables
        const maxNumberEn = this.messages.Messages.length;
        const randomNumber = Math.floor(Math.random() * maxNumberEn);
        const message = this.messages.Messages[randomNumber];
        //Resolve Functions
        const logger = container.resolve("WinstonLogger"); //Get the logger from the server container
        const databaseServer = container.resolve("DatabaseServer");
        //Functions
        logger.logWithColor("Loading: ~| Kitteh's Welcome Messages |~", LogTextColor_1.LogTextColor.white); //Notify of mod load
        logger.info("Loading: ~| Kitteh's Welcome Messages |~");
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
module.exports = { mod: new Mod() };
