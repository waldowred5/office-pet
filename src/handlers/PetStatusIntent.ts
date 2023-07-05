import {getIntentName, getRequestType} from "ask-sdk-core";

const PetStatusIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'PetStatusIntent';
  },
  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`I can't do that yet`)
      .reprompt(`I can't do that yet`)
      .getResponse();
  }
}

export default PetStatusIntent;
