//This mod will welcome back the player upon starting the SPT-AKI server
const modName = "KittehKun-Messages";
const config = require("../config/messages.json");

class WelcomeMessage{
	
	constructor(){
		this.mod = modName;
		Logger.info(`Loading: ${modName}`);
		HttpRouter.onStaticRoute["/client/server/list"]["message"] = WelcomeMessage.onMenuDisplay; //Route that shows the main menu to client
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
		console.log("\n\n=====================================================================");
		console.log("\n\n\n\t" + message + "\n\n\n");
		console.log("=====================================================================\n\n");
	}
	
	
	
}

module.exports.WelcomeMessage = WelcomeMessage;