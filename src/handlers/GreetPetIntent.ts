import {getIntentName, getRequestType} from "ask-sdk-core";
import templateString from "../utils/template-string";
import {greet} from "../pet/greet";
import general from "../assets/general.json";

const GreetPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'GreetPetIntent';
  },
  async handle(handlerInput) {
    if (!handlerInput.pet) {
      return handlerInput.responseBuilder
        .speak(general.noPet)
        .reprompt(general.noPet)
        .getResponse();
    }

    const phrase = greet(handlerInput.pet);

    return handlerInput.responseBuilder
      .speak(phrase)
      .reprompt(templateString(general.promptForAction, {name: handlerInput.pet.name }))
      .getResponse();
  }
}

export default GreetPetIntent;
