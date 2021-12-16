//"DataBase" is the object used to access SPT AKI's stuff such as locales
//In this instance, we are using accessing the locales folder of the DataBase to change the name

//This mod will welcome back the player upon starting the SPT-AKI server
const modName = "KittehKun-Messages";
const config_en = require("../config/messages.json");
const config_rus = require("../config/messages_rus.json");
const LOCALES_EN = DatabaseServer.tables.locales.global.en.interface; //Accesses the interface property of the locales.json file on the server [ENGLISH]
const LOCALES_RUS = DatabaseServer.tables.locales.global.ru.interface;

class WelcomeMessage{
	
	constructor(){
		this.mod = modName;
		Logger.info(`Loading: ${modName}`);
		HttpRouter.onStaticRoute["/client/server/list"]["message"] = WelcomeMessage.onMenuDisplay; //Route that shows the main menu to client
		WelcomeMessage.displayMessage();
	}
	
	
	//Method that will display a message each time the main menu is shown to the client
	static onMenuDisplay(){
		
		WelcomeMessage.displayMessage();
		
		return (HttpResponse.nullResponse())
	}
	
	//Method will display message in SPT-AKI console
	static displayMessage(){
		let maxNumberEn = config_en.Messages.length; //Variable to get the count of all messages
		let maxNumberRu = config_rus.Messages.length;
		let randomNumberEn = getRandomInt(maxNumberEn);
		let randomNumberRu = getRandomInt(maxNumberRu);
		let message_en = config_en.Messages[randomNumberEn];
		let message_ru = config_rus.Messages[randomNumberRu];
		
		//Method that returns a random integer depending on the maximum number inputed
		function getRandomInt(max){
			return Math.floor(Math.random() * max);
		}
		
		var textBase = "Attention! This is a Beta version of Escape from Tarkov for testing purposes."
        LOCALES_EN[textBase] = "Message of the Day!"; //Credit to @BΔLIST0N' for helping me with this line <3 | Acts as the title card for the orange box
		LOCALES_RUS[textBase] = "Message of the Day!";
		
		var messageBodyBase = "NDA free warning";
		LOCALES_EN[messageBodyBase] = message_en; //Acts as the message body for the orange box
		LOCALES_RUS[messageBodyBase] = message_ru;
		
	}
	
	
	
}

module.exports.WelcomeMessage = WelcomeMessage;