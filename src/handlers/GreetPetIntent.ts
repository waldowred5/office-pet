import {getIntentName, getRequestType} from "ask-sdk-core";

const GreetPetIntent = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && getIntentName(handlerInput.requestEnvelope) === 'GreetPetIntent';
  },
  async handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(`I can't do that yet`)
        .getResponse();
  }
}

export default GreetPetIntent;
