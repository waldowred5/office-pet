import {getIntentName, getRequestType} from "ask-sdk-core";

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

    return handlerInput.responseBuilder
      .speak(`I can't do that yet`)
      .getResponse();
  }
}

export default FeedPetIntent;
