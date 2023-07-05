import {getIntentName, getRequestType} from "ask-sdk-core";
import {PetResponseInterceptor} from "../interceptors/PetInterceptor";
import {clean} from "../pet/clean";

const CleanPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'CleanPetIntent';
  },
  async handle(handlerInput) {
    const pet = handlerInput.pet;

    if (!pet) {
      return handlerInput.responseBuilder
          .speak(`You don't have a pet, go adopt one`)
          .reprompt(`You don't have a pet, go adopt one`)
          .getResponse();
    }

    handlerInput.pet = await clean(handlerInput.pet);
    await PetResponseInterceptor.process(handlerInput);

    return handlerInput.responseBuilder
      .speak(`You have successfully cleaned your pet. ${handlerInput.pet.name} is not stinky anymore!`)
      .reprompt(`You have successfully cleaned your pet. ${handlerInput.pet.name} is not stinky anymore!`)
      .getResponse();
  }
}

export default CleanPetIntent;
