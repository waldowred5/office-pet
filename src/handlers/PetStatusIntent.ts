import {getIntentName, getRequestType} from "ask-sdk-core";
import {getPetStatus} from "../pet/getStatus";
import general from "../assets/general.json";
import templateString from "../utils/templateString";
import getLivingStatus from "../pet/getLivingStatus";

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

    const livingStatus = getLivingStatus(handlerInput.pet);

    if (livingStatus.isDead) {
      return handlerInput.responseBuilder
        .speak(livingStatus.message)
        .reprompt(general.newPetNeeded)
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
