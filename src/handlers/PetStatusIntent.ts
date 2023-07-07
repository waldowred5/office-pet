import {getIntentName, getRequestType} from "ask-sdk-core";
import {getPetStatus} from "../pet/getStatus";
import general from "../assets/general.json";
import templateString from "../utils/template-string";

const PetStatusIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'PetStatusIntent';
  },
  async handle(handlerInput) {
    const { pet } = handlerInput;

    if (!pet) {
      return handlerInput.responseBuilder
        .speak(general.noPet)
        .reprompt(general.noPet)
        .getResponse();
    }

    const phrase = await getPetStatus(pet);

    return handlerInput.responseBuilder
      .speak(phrase)
      .reprompt(templateString(general.promptForAction, {name: handlerInput.pet.name }))
      .getResponse();
  }
}

export default PetStatusIntent;
