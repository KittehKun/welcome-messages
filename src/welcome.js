//"DataBase" is the object used to access SPT AKI's stuff such as locales
//In this instance, we are using accessing the locales folder of the DataBase to change the name

//This mod will welcome back the player upon starting the SPT-AKI server
const modName = "KittehKun-Messages";
const config = require("../config/messages.json");
const LOCALES = DatabaseServer.tables.locales.global.en.interface //Accesses the interface property of the locales.json file on the server

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
		let maxNumber = config.Messages.length; //Variable to get the count of all messages
		let randomNumber = getRandomInt(maxNumber);
		let message = config.Messages[randomNumber];
		
		//Method that returns a random integer depending on the maximum number inputed
		function getRandomInt(max){
			return Math.floor(Math.random() * max);
		}
		
		var textBase = "Attention! This is a Beta version of Escape from Tarkov for testing purposes."
        LOCALES[textBase] = "Message of the Day!"; //Credit to @BΔLIST0N' for helping me with this line <3 | Acts as the title card for the orange box
		
		var messageBodyBase = "NDA free warning";
		LOCALES[messageBodyBase] = message; //Acts as the message body for the orange box
		
	}
	
	
	
}

module.exports.WelcomeMessage = WelcomeMessage;