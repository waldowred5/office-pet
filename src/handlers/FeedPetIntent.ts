import {getIntentName, getRequestType} from "ask-sdk-core";
import {PetResponseInterceptor} from "../interceptors/PetInterceptor";
import {feed} from "../pet/feed";

const FeedPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'FeedPetIntent';
  },
  async handle(handlerInput) {
    const pet = handlerInput.pet;

    if (!pet) {
      return handlerInput.responseBuilder
        .speak(`You don't have a pet, go adopt one`)
        .reprompt(`You don't have a pet, go adopt one`)
        .getResponse();
    }

    handlerInput.pet = await feed(pet);
    await PetResponseInterceptor.process(handlerInput);

    return handlerInput.responseBuilder
      .speak(`You have successfully fed your pet. ${handlerInput.pet.name} is not starving anymore!`)
      .reprompt(`You have successfully fed your pet. ${handlerInput.pet.name} is not starving anymore!`)
      .getResponse();
  }
}

export default FeedPetIntent;
