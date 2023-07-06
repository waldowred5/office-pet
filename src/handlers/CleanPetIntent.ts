import {getIntentName, getRequestType} from "ask-sdk-core";
import {clean} from "../pet/clean";

const CleanPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'CleanPetIntent';
  },
  async handle(handlerInput) {
    const { pet } = handlerInput;

    if (!pet) {
      return handlerInput.responseBuilder
          .speak(`You don't have a pet, go adopt one`)
          .reprompt(`You don't have a pet, go adopt one`)
          .getResponse();
    }

    handlerInput.pet = await clean(handlerInput.pet);

    return handlerInput.responseBuilder
      .speak(`You have successfully cleaned your pet. ${handlerInput.pet.name} is not stinky anymore!`)
      .reprompt(`You have successfully cleaned your pet. ${handlerInput.pet.name} is not stinky anymore!`)
      .getResponse();
  }
}

export default CleanPetIntent;
